import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const { currentUser } = useOutletContext(); // Get user from Layout
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${API_URL}/notes`, { withCredentials: true });
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        }
    };

    useEffect(() => {
        if (currentUser) { // Only fetch notes if user is loaded
          fetchNotes();
        }
    }, [currentUser]); // Re-run when currentUser is available

    const handleCreateNote = async (e) => {
        e.preventDefault();
        if (!newNote.title || !newNote.content) {
            alert('Title and content are required.');
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/notes`, newNote, { withCredentials: true });
            if (res.status === 201) {
                alert("Note created successfully!");
                setIsModalOpen(false);
                setNewNote({ title: '', content: '' });
                fetchNotes(); // Refresh the notes list
            }
        } catch (error) {
            console.error("Error creating note:", error);
            alert("Failed to create note.");
        }
    };

    const handleDeleteNote = async (noteId) => {
        // Use a standard confirm dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this note?");
        if (isConfirmed) {
            try {
                const res = await axios.delete(`${API_URL}/notes/${noteId}`, { withCredentials: true });
                if (res.status === 200) {
                    alert("Note deleted successfully!");
                    fetchNotes(); // Refresh the notes list
                }
            } catch (error) {
                console.error("Error deleting note:", error);
                alert("Failed to delete note. You can only delete your own notes.");
            }
        }
    };

    return (
        <div className={`flex-grow ${isModalOpen ? "filter blur-sm" : ""}`}>
            {/* Top Section */}
            <div className="bg-gradient-to-r from-[#5B4B85] via-[#7B6BA5] to-[#9B8BC5] py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-4">
                        <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 hidden md:block" />
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">Shared Notes</h1>
                    </div>
                    <p className="mt-2 text-md sm:text-lg text-gray-200 max-w-2xl mx-auto px-2">
                        Jot down important exam notes, project ideas, or anything else you need to remember.
                    </p>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex justify-end mb-6 sm:mb-8">
                    <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out">
                        <Plus className="h-4 w-4 mr-2" />Add Note
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map(note => (
                        <div key={note._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{note.title}</h3>
                                {currentUser && currentUser._id === note.createdBy._id && (
                                    <button onClick={() => handleDeleteNote(note._id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center mt-2 mb-4">
                                <img src={note.createdBy?.profilePicture} className="h-8 w-8 rounded-full object-cover" alt="profile" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{note.createdBy?.name}</p>
                                    <p className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 flex-grow mb-4 whitespace-pre-wrap">{note.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-lg p-6 sm:p-8 z-50">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X className="h-5 w-5" /></button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Add a New Note</h2>
                        <form className="space-y-4" onSubmit={handleCreateNote}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. React Hooks Summary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea rows="5" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your notes go here..." required></textarea>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;

