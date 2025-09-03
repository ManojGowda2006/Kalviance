import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Plus, Menu } from 'lucide-react';
import logo from "../assets/logo.png";

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/me`, { withCredentials: true });
        setCurrentUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        // Handle error, maybe redirect to login
      }
    };
    fetchUser();
  }, [API_URL]);

  const navLinks = [
    { name: 'Announcements', path: '/announcements' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Notes', path: '/notes' }
  ];

  return (
    <div className="bg-white font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
              <div className="ml-2 font-bold text-gray-800 text-lg">Squad Hub</div>
              <div className="ml-2 text-gray-500 text-sm hidden md:block">Squad 69 & 70</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              {navLinks.map(link => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({ isActive }) =>
                    `text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out ${isActive ? "text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <img src={currentUser?.profilePicture || 'https://placehold.co/40x40/d1d5db/333333?text=U'} alt="User" className="h-10 w-10 rounded-full cursor-pointer" />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span>
              </div>
              <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {isNavOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-indigo-600 transition duration-150 ease-in-out ${isActive ? "bg-indigo-100 text-indigo-700" : ""}`
                  }
                  onClick={() => setIsNavOpen(false)} // Close nav on click
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
      
      {/* Page Content Rendered Here */}
      <main className="flex-grow">
        <Outlet context={{ currentUser }} />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#5B4B85] via-[#7B6BA5] to-[#9B8BC5] text-gray-300 py-6 sm:py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm">© 2025 Kalviance</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
