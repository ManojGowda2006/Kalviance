import React, { useState, useEffect } from 'react';
import { Award, Activity, Grid, Plus, X, Heart } from 'lucide-react';
import axios from 'axios';

const CLOUDINARY_API = import.meta.env.VITE_CLOUDINARY_API;

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    achievedBy: "",
    date: "",
    image: ""
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const getTagFromTab = (tabName) => {
    switch (tabName) {
      case 'Dojo Belts': return 'Dojo';
      case 'Hackathons': return 'Hackathon';
      case 'Internships': return 'Internship';
      case 'Publications': return 'Publication';
      case 'Certifications': return 'Certification';
      case 'Open Source': return 'open-source';
      default: return tabName;
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${API_URL}/achievements`, { withCredentials: true });
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setAchievements([]);
    }
  };

  const filteredAchievements =
    activeTab === 'All'
      ? achievements
      : achievements.filter(a => a.category === getTagFromTab(activeTab));

  const handleImageUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");
    formData.append("folder", "ProfilePictures");

    try {
      const res = await axios.post(CLOUDINARY_API, formData);
      setForm((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/achievements`, form, { withCredentials: true });
      if (res.status === 201) {
        alert("Achievement added successfully!");
        setIsModalOpen(false);
        setForm({ title: "", description: "", category: "", achievedBy: "", date: "", image: "" });
        fetchAchievements();
      }
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Failed to add achievement. Check console for details.");
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Calculate statistics
  const totalAchievements = achievements.length;
  const achievementsThisMonth = achievements.filter(a => new Date(a.date).getMonth() === new Date().getMonth() && new Date(a.date).getFullYear() === new Date().getFullYear()).length;
  const totalCategories = [...new Set(achievements.map(a => a.category))].length;

  return (
    <>
      <main className={`flex-grow ${isModalOpen ? "blur-sm pointer-events-none" : ""}`}>
        {/* Top Section */}
        <div className="bg-gradient-to-r from-[#5B4B85] via-[#7B6BA5] to-[#9B8BC5] py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-4">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 hidden md:block" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">Achievements Wall</h1>
            </div>
            <p className="mt-2 text-md sm:text-lg text-gray-200 max-w-2xl mx-auto px-2">Celebrate your wins and <span className="font-semibold text-white">Share</span> your hackathon victories, dojo belts, internships, and more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200 text-center">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{totalAchievements}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total Achievements</div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200 text-center">
              <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{achievementsThisMonth}</div>
              <div className="text-xs sm:text-sm text-gray-500">This Month</div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200 text-center">
              <Grid className="h-8 w-8 sm:h-10 sm:w-10 text-green-500 mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{totalCategories}</div>
              <div className="text-xs sm:text-sm text-gray-500">Categories</div>
            </div>
          </div>
        </div>

        {/* Filters & Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {["All", "Dojo Belts", "Hackathons", "Internships", "Publications", "Certifications"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded-full transition-colors duration-200 ${activeTab === tab ? "bg-indigo-500 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{tab}</button>
              ))}
            </div>
            <button onClick={() => setIsModalOpen(true)} className="sm:inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out">
              <Plus className="h-4 w-4 mr-0 sm:mr-2" /><span className="hidden sm:block">Add Achievement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map(achievement => (
              <div key={achievement._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border self-start">{achievement.category}</span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 break-words">{achievement.title}</h3>
                <div className="flex items-center mt-2 mb-4">
                  {achievement.achievedBy?.profilePicture && <img src={achievement.achievedBy.profilePicture} className="h-8 w-8 rounded-full object-cover" alt="profile" />}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{achievement.achievedBy?.name || 'Unknown User'}</p>
                    <p className="text-xs text-gray-500">{achievement.achievedBy?.email}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 flex-grow mb-4 whitespace-pre-wrap">{achievement.description}</p>
                <div className="mt-auto flex justify-between items-center text-gray-500 text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center"><Heart className="h-4 w-4 mr-1" />{achievement.likes || 0}</span>
                  </div>
                   <span className="text-xs">{new Date(achievement.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-lg p-6 sm:p-8 z-50">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X className="h-5 w-5" /></button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Achievement</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div><label className="block text-sm font-medium text-gray-700">Title</label><input type="text" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Won Hackathon 2024" required onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Description</label><textarea rows="3" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Brief details about the achievement..." required onChange={e => setForm({ ...form, description: e.target.value })}></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700">Category</label><select className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required onChange={e => setForm({ ...form, category: e.target.value })}><option value="">Select category</option><option value="Academic">Academic</option><option value="Sports">Sports</option><option value="Dojo">Dojo</option><option value="Hackathon">Hackathon</option><option value="Community">Community</option><option value="Internship">Internship</option><option value="open-source">Open Source</option><option value="Other">Other</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700">Achieved By (email)</label><input type="text" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. user.name@kalvium.community" required onChange={e => setForm({ ...form, achievedBy: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Date</label><input type="date" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required onChange={e => setForm({ ...form, date: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Image (Optional)</label><input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} accept="image/*" className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" /><p className="text-xs text-gray-500 mt-1">{loading ? "Uploading..." : "Upload proof"}</p></div>
              <div className="flex justify-end space-x-3"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">Cancel</button><button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Achievement;

