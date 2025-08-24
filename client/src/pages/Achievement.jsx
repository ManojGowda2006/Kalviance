import React, { useState, useEffect } from 'react';
import { Award, Activity, Grid, Plus, ChevronDown, MessageCircle, Heart, User2, X } from 'lucide-react';
import axios from 'axios'


const Achievement = () => {
  const [achievements, setAchievements] = useState([]); // your mock data
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const [form, setForm] = useState({title:"", description:"", category:"", achievedBy:"", date:"", image:""})
  const API_URL=import.meta.env.VITE_API_URL;

  // Helper function to map button text to tag label
  const getTagFromTab = (tabName) => {
    switch (tabName) {
      case 'Dojo Belts':
        return 'Dojo Belt';
      case 'Hackathons':
        return 'Hackathon';
      case 'Internships':
        return 'Internship';
      case 'Publications':
        return 'Publication';
      case 'Certifications':
        return 'Certification';
      case 'Open Source':
        return 'Open Source';
      default:
        return tabName;
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${API_URL}/achievements`, {
        withCredentials: true
      });
      setAchievements(response.data);
      console.log("Fetched achievements:", response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  }

  const filteredAchievements = activeTab === 'All'
    ? achievements
    : achievements.filter(achievement => achievement.tag.label === getTagFromTab(activeTab));

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log("Form submitted:", form);
      const res = await axios.post(`${API_URL}/achievements`, form,{
        withCredentials: true
      });
      if(res.status === 201){
        alert("Achievement added successfully!");
        setIsModalOpen(false);
      }

    }

    useEffect(() => {
      fetchAchievements();
    }, [])

  return (
    <div className={`bg-white font-sans min-h-screen flex flex-col ${isModalOpen ? "overflow-hidden" : ""}`}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="https://placehold.co/40x40/d1d5db/333333?text=Logo" alt="Squad Hub Logo" className="h-8 w-8 rounded-full" />
              <div className="ml-2 font-bold text-gray-800 text-lg">Squad Hub</div>
              <div className="ml-2 text-gray-500 text-sm hidden md:block">Squad 69 & 70</div>
            </div>

            <nav className="hidden md:flex space-x-8">
              {['Dashboard', 'Announcements', 'Achievements', 'Notes'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out ${item === 'Achievements' ? 'text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1' : ''}`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </button>
              <div className="relative">
                <img
                  src="https://placehold.co/40x40/d1d5db/333333?text=JP"
                  alt="User Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span>
              </div>
            </div>
          </div>
        </div>

              
      </header>

      {/* Main Content */}
      <main className={`flex-grow ${isModalOpen ? "blur-sm" : ""}`}>
        {/* Gradient section for the header and stats */}
        <div className="bg-gradient-to-r from-indigo-300 to-orange-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
          <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* Show only on desktop */}
            <Award className="h-10 w-10 text-yellow-500 hidden md:block" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Achievements Wall
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrate your wins and <span className="font-semibold text-gray-800">Share</span> your hackathon victories, dojo belts, internships, and more.
          </p>
        </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <Award className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">{achievements && achievements.length}</div>
                  <div className="text-sm text-gray-500">Total Achievements</div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <Activity className="h-8 w-8 text-red-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">{achievements && achievements.length}</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <Grid className="h-8 w-8 text-green-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-500">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievements list section on a plain background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {['All', 'Dojo Belts', 'Hackathons', 'Internships', 'Publications', 'Certifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-indigo-500 text-white shadow'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Recent First</option>
                <option>Oldest First</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div key={achievement._id} className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col `}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border `}>
                    {achievement.category}
                  </span>
                  {/* Placeholder for the tag icon */}
                  {achievement.category === 'Academic' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Academic" />}
                  {achievement.category === 'Sports' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Sports" />}
                  {achievement.category === 'Dojo' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Dojo" />}
                  {achievement.category === 'Hackathon' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Hackathon" />}
                  {achievement.category === 'Community' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Community" />}
                  {achievement.category === 'Internship' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Internship" />}
                  {achievement.category === 'open-source' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Open Source" />}
                  {achievement.category === 'Other' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Other" />}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2">{achievement.title}</h3>
                
                <div className="flex items-center mt-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                      {achievement.achievedBy.profilePicture && <img src={achievement.achievedBy.profilePicture} className="h-5 w-5 rounded-full object-cover" />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{achievement.achievedBy.name}</p>
                    <p className="text-xs text-gray-500">{achievement.achievedBy.email}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 flex-grow mb-4">{achievement.description}</p>
                
                <div className="mt-auto flex justify-between items-center text-gray-500 text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {achievement.comments}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {achievement.likes}
                    </span>
                  </div>
                  <span>{achievement.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out">
              Load More Achievements
            </button>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0  bg-opacity-40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 z-50">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Achievement</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Won Hackathon 2024"
                  required
                  onChange={(e) => setForm({...form, title: e.target.value})}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows="3"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Brief details about the achievement..."
                  required
                  onChange={(e) => setForm({...form, description: e.target.value})}
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  onChange={(e) => setForm({...form, category: e.target.value})}
                >
                  <option value="">Select category</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Dojo">Dojo</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Community">Community</option>
                  <option value="Internship">Internship</option>
                  <option value="open-source">open-source</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Achieved By */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Achieved By (email)</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. arjun.patel.s69@kalvium.community"
                  required
                  onChange={(e) => setForm({...form, achievedBy: e.target.value})}
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  onChange={(e) => setForm({...form, date: e.target.value})}
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                />
                <p className="text-xs text-gray-500 mt-1">You can upload multiple images.</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2025 Kalviance</p>
        </div>
      </footer>
    </div>
  );
};

export default Achievement;
