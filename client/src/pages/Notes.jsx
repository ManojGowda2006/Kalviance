import React, { useState, useEffect } from 'react';
import { Book, Plus, X, Trash2, FileText, Download } from 'lucide-react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const CLOUDINARY_API = import.meta.env.VITE_CLOUDINARY_API;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileUrl: ""
  });
  
  // Get the current user from the Layout component
  const { currentUser } = useOutletContext();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes`, { withCredentials: true });
      // Sort by most recent notes first
      setNotes(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert("Please upload a PDF file.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures"); // Using the same preset, can be changed
    formData.append("folder", "Notes"); // Store in a "Notes" folder in Cloudinary

    try {
      const res = await axios.post(CLOUDINARY_API, formData);
      setForm((prev) => ({ ...prev, fileUrl: res.data.secure_url }));
    } catch (err) {
      console.error("File upload failed", err);
      alert("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fileUrl) {
      alert("Please upload a PDF file before saving.");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/notes`, form, { withCredentials: true });
      if (res.status === 201) {
        alert("Note added successfully!");
        setIsModalOpen(false);
        setForm({ title: "", description: "", fileUrl: "" });
        fetchNotes();
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Check console for details.");
    }
  };

  const handleDelete = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
        try {
            await axios.delete(`${API_URL}/notes/${noteId}`, { withCredentials: true });
            alert("Note deleted successfully!");
            fetchNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
            alert("Failed to delete note. You can only delete your own notes.");
        }
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <main className={`flex-grow ${isModalOpen ? "blur-sm pointer-events-none" : ""}`}>
        {/* Top Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-4">
              <Book className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 hidden md:block" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">Shared Notes</h1>
            </div>
            <p className="mt-2 text-md sm:text-lg text-gray-200 max-w-2xl mx-auto px-2">Find and share helpful notes for exams, projects, and more.</p>
          </div>
        </div>

        {/* Notes List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex justify-end mb-6">
                 <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out">
                    <Plus className="h-5 w-5 mr-2" />Add Note
                </button>
            </div>
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {notes.map(note => (
                <li key={note._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start sm:items-center space-x-4">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-indigo-500" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <h3 className="text-lg font-bold text-gray-900 break-words">{note.title}</h3>
                             <span className="text-xs text-gray-500 mt-1 sm:mt-0">{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                      <p className="text-sm text-gray-600 mt-1 mb-3">{note.description}</p>
                      <div className="flex items-center">
                        <img src={note.createdBy?.profilePicture} className="h-6 w-6 rounded-full object-cover" alt="profile" />
                        <div className="ml-2">
                          <p className="text-xs font-medium text-gray-800">{note.createdBy?.name}</p>
                          <p className="text-xs text-gray-500">{note.createdBy?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 ml-4">
                        <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors duration-200" title="Download Note">
                            <Download className="h-5 w-5" />
                        </a>
                        {currentUser?._id === note.createdBy?._id && (
                             <button onClick={() => handleDelete(note._id)} className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200" title="Delete Note">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-lg p-6 sm:p-8 z-50">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X className="h-5 w-5" /></button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Note</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div><label className="block text-sm font-medium text-gray-700">Title</label><input type="text" value={form.title} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Chapter 5: Data Structures" required onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Description</label><textarea rows="3" value={form.description} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="A short description of what these notes cover..." required onChange={e => setForm({ ...form, description: e.target.value })}></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700">Notes File (PDF Only)</label><input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} accept="application/pdf" required className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" /><p className="text-xs text-gray-500 mt-1">{loading ? "Uploading..." : "Please upload a PDF file."}</p></div>
              <div className="flex justify-end space-x-3 pt-2"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">Cancel</button><button type="submit" disabled={loading || !form.fileUrl} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;

