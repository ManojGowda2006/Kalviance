import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Mail, User } from 'lucide-react';

const Profile = () => {
  const { currentUser } = useOutletContext();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
        // Redirect to login page after successful logout
        navigate('/');
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
       {/* Header Section */}
       <div className="bg-gradient-to-r from-[#5B4B85] via-[#7B6BA5] to-[#9B8BC5] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img 
              src={currentUser.profilePicture} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto ring-4 ring-white shadow-lg"
            />
            <h1 className="mt-6 text-4xl font-extrabold text-white">{currentUser.name}</h1>
            <p className="mt-2 text-lg text-gray-200">{currentUser.email}</p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
           <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Details</h2>
           <div className="space-y-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-3"/>
                <span className="text-gray-700">{currentUser.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-3"/>
                <span className="text-gray-700">{currentUser.email}</span>
              </div>
           </div>
            <div className="mt-8 border-t pt-6">
                <button
                    onClick={handleLogout}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out"
                >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
