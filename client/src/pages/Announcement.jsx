import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pin, Bell, Search, X, ChevronDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Helper to get a color based on category
const getCategoryStyle = (category) => {
    switch (category) {
        case 'Urgent': return {
            'borderColor': '#F56565', 'textColor': '#C53030', 'bgColor': '#FED7D7', 'tagColor': 'bg-red-500'
        };
        case 'Deadline': return {
            'borderColor': '#ECC94B', 'textColor': '#B7791F', 'bgColor': '#FEFCBF', 'tagColor': 'bg-yellow-500'
        };
        case 'Event': return {
            'borderColor': '#48BB78', 'textColor': '#2F855A', 'bgColor': '#C6F6D5', 'tagColor': 'bg-green-500'
        };
        case 'Update': return {
            'borderColor': '#4299E1', 'textColor': '#2B6CB0', 'bgColor': '#BEE3F8', 'tagColor': 'bg-blue-500'
        };
        case 'Resource': return {
            'borderColor': '#9F7AEA', 'textColor': '#6B46C1', 'bgColor': '#E9D8FD', 'tagColor': 'bg-purple-500'
        };
        case 'Opportunity': return {
            'borderColor': '#ED8936', 'textColor': '#C05621', 'bgColor': '#FEEBC8', 'tagColor': 'bg-orange-500'
        };
        default: return {
            'borderColor': '#A0AEC0', 'textColor': '#4A5568', 'bgColor': '#E2E8F0', 'tagColor': 'bg-gray-500'
        };
    }
};


const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search input
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "General",
        pinned: false,
    });
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/announcements`, {
                withCredentials: true
            });
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/announcements`, form, {
                withCredentials: true
            });
            if (res.status === 201) {
                alert("Announcement added successfully!");
                setIsModalOpen(false);
                setForm({ title: "", description: "", category: "General", pinned: false }); // Reset form
                fetchAnnouncements(); // Refresh the list
            }
        } catch (error) {
            console.error("Error adding announcement:", error);
            alert("Failed to add announcement. Check console for details.");
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);
    
    // Filter announcements based on the search query
    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
    const recentAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#5B4B85] via-[#7B6BA5] to-[#9B8BC5] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Bell className="h-10 w-10 text-white" />
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Announcements Hub</h1>
                    </div>
                    <p className="mt-2 text-lg text-gray-200 max-w-3xl mx-auto">
                        Stay updated with the latest news, events, and important deadlines from your community.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Controls and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search announcements..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full md:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        <span>Create Announcement</span>
                    </button>
                </div>

                {/* Pinned Announcements */}
                 {pinnedAnnouncements.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center mb-4">
                            <Pin className="h-6 w-6 text-indigo-600 mr-2" />
                            <h2 className="text-2xl font-bold text-gray-800">Pinned Announcements</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {pinnedAnnouncements.map(announcement => (
                                <AnnouncementCard key={announcement._id} announcement={announcement} />
                            ))}
                        </div>
                    </div>
                )}


                {/* Recent Announcements */}
                <div>
                     <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Announcements</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <p>Loading announcements...</p>
                        ) : recentAnnouncements.length > 0 ? (
                             recentAnnouncements.map(announcement => (
                                 <AnnouncementCard key={announcement._id} announcement={announcement} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">No announcements match your search.</p>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal for adding a new announcement */}
            {isModalOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 z-50">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6" />
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create a New Announcement</h2>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Final Project Submission" required onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Provide details about the announcement..." required onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option value="General">General</option>
                                    <option value="Event">Event</option>
                                    <option value="Deadline">Deadline</option>
                                    <option value="Important">Important</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Update">Update</option>
                                    <option value="Resource">Resource</option>
                                    <option value="Opportunity">Opportunity</option>
                                </select>
                            </div>
                             <div className="flex items-center">
                                <input id="pinned" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" checked={form.pinned} onChange={e => setForm({ ...form, pinned: e.target.checked })} />
                                <label htmlFor="pinned" className="ml-2 block text-sm text-gray-900">Pin this announcement</label>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">Publish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Announcement Card Component
const AnnouncementCard = ({ announcement }) => {
    const { borderColor, textColor, bgColor, tagColor } = getCategoryStyle(announcement.category);
    
    return (
        <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${borderColor} flex flex-col hover:shadow-lg transition-shadow duration-300`}>
            <div className="flex justify-between items-start mb-3">
                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${tagColor}`}>{announcement.category.toUpperCase()}</span>
                 {announcement.pinned && <Pin className="h-5 w-5 text-gray-400" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{announcement.title}</h3>
            <p className="text-gray-600 flex-grow mb-4">{announcement.description}</p>
            <div className="mt-auto flex items-center pt-4 border-t border-gray-100">
                <img src={announcement.createdBy?.profilePicture || 'https://placehold.co/40x40'} className="h-9 w-9 rounded-full object-cover" alt="profile" />
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{announcement.createdBy?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">
                        Posted {formatDistanceToNow(new Date(announcement.date), { addSuffix: true })}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Announcement;

