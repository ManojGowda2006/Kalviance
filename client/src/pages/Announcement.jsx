import React, { useState } from 'react';
import logo from "../assets/logo.png";

// Inline SVG icons to avoid external dependencies
const LuBell = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>);
const LuSearch = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>);
const LuList = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>);
const LuGrid = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>);
const LuMail = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);
const LuMessageCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9.32 9.32 0 0 1 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 1.205.344 2.339.95 3.327L3 21l4.9-1z"/></svg>);
const LuCalendar = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>);
const LuFolder = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/></svg>);
const LuUsers = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const LuBarChart2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>);
const LuLink = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L13.54 10"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L10.46 14"/></svg>);
const LuHelpCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>);
const LuTrophy = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14v10l2-2.5 2 2.5V14"/><path d="M12 11.5c-3.1 0-5.5-2-5.5-2"/><path d="M12 11.5c3.1 0 5.5-2 5.5-2"/><path d="M12 11.5V14"/></svg>);
const LuFileText = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="M10 13h6"/><path d="M10 17h6"/><path d="M10 9h2"/></svg>);


const pinnedAnnouncements = [
  {
    id: 1,
    title: 'Final Project Submission Deadline',
    description: 'All Squad 69 & 70 students must submit their final projects by August 15th, 2023 at 11:59 PM.',
    daysLeft: 3,
    postedBy: 'Instructor Rahul',
    postedAgo: '2 days ago',
    isUrgent: true,
    type: 'deadline',
  },
];

const recentAnnouncements = [
  {
    id: 2,
    title: 'Mock Interview Sessions',
    description: 'Sign up for mock interview sessions with industry professionals on August 20th.',
    type: 'event',
    postedAgo: 'Yesterday',
  },
  {
    id: 3,
    title: 'New Dojo Challenges Available',
    description: 'Five new advanced challenges have been added to the Dojo. Earn your Black Belt!',
    type: 'update',
    postedAgo: '3 days ago',
  },
  {
    id: 4,
    title: 'React Advanced Workshop Materials',
    description: 'Materials from yesterday\'s React workshop are now available in the shared notes.',
    type: 'resource',
    postedAgo: '4 days ago',
  },
  {
    id: 5,
    title: 'Internship Opportunities at TechCorp',
    description: 'TechCorp is offering 5 internship positions exclusively for Kalvium students.',
    type: 'opportunity',
    postedAgo: '5 days ago',
  },
];

const quickAccessData = {
  achievements: [
    { name: 'Priya Sharma', achievement: 'Earned Black Belt in Dojo', time: '2 hours ago', avatar: 'https://placehold.co/40x40/E8EFFF/1E3A8A?text=PS' },
    { name: 'Rahul Gupta', achievement: 'Won 2nd place in Hackathon', time: 'Yesterday', avatar: 'https://placehold.co/40x40/E8EFFF/1E3A8A?text=RG' },
    { name: 'Meera Patel', achievement: 'Published blog on React Hooks', time: '2 days ago', avatar: 'https://placehold.co/40x40/E8EFFF/1E3A8A?text=MP' },
  ],
  notes: [
    { title: 'Advanced JavaScript Concepts', uploadedBy: 'Instructor Rahul', icon: '📄' },
    { title: 'React Router Cheat Sheet', uploadedBy: 'Priya S', icon: '📄' },
    { title: 'CSS Grid Reference Guide', uploadedBy: 'Arjun K', icon: '📄' },
    { title: 'Database Design Principles', uploadedBy: 'Vikram M', icon: '📄' },
  ],
  events: [
    { date: 'Aug 15', time: '11:59 PM', title: 'Final Project Deadline' },
    { date: 'Aug 20', time: '4:00 PM - 5:00 PM', title: 'Mock Interview Sessions' },
    { date: 'Aug 25', time: '6:00 PM - 7:30 PM', title: 'Industry Connect Webinar' },
  ]
};

// Component for the main dashboard content, so it can be swapped out
// while the sidebar remains fixed.
const DashboardContent = () => {
  const [squadFilter, setSquadFilter] = useState('All Squads');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [view, setView] = useState('grid'); // 'list' or 'grid'

  const filteredRecentAnnouncements = recentAnnouncements.filter(announcement => {
    if (typeFilter === 'All Types') {
      return true;
    }
    return announcement.type.toLowerCase() === typeFilter.toLowerCase();
  });

  return (
    <div className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white/90 p-4 rounded-xl shadow-sm mb-6 sticky top-0 z-10">
          <div className="hidden md:block text-gray-600 text-sm mb-2 sm:mb-0">
            Welcome to Squad Hub - Your central collaboration platform for Squad 69 & 70!
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-grow">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-[#6B5B95] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B5B95]"
              />
            </div>
            <a href="#" className="text-gray-400 hover:text-gray-600"><LuBell className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600"><LuMail className="h-6 w-6" /></a>
            <div className="relative">
              <img src="https://placehold.co/40x40/E8EFFF/1E3A8A?text=JP" alt="User Avatar" className="rounded-full" />
              <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border border-white"></span>
            </div>
          </div>
        </header>

        {/* Announcements Hub */}
        <div className="bg-white/90 p-6 rounded-xl shadow-sm border border-[#6B5B95] mb-6">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Announcements Hub</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="hidden lg:block">Filter by:</span>
                <select
                  value={squadFilter}
                  onChange={(e) => setSquadFilter(e.target.value)}
                  className="rounded-md border border-[#6B5B95] px-3 py-1.5 focus:ring-[#6B5B95] focus:border-[#6B5B95] text-sm"
                >
                  <option>All Squads</option>
                  <option>Squad 69</option>
                  <option>Squad 70</option>
                </select>
                <span className="hidden lg:block">Type:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-md border border-[#6B5B95] px-3 py-1.5 focus:ring-[#6B5B95] focus:border-[#6B5B95] text-sm"
                >
                  <option>All Types</option>
                  <option>Event</option>
                  <option>Update</option>
                  <option>Resource</option>
                  <option>Opportunity</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border border-[#6B5B95] rounded-md p-1 text-gray-500">
                <button onClick={() => setView('list')} className={`p-1 rounded-md ${view === 'list' ? 'bg-[#6B5B95]/20' : ''}`}><LuList className="h-5 w-5" /></button>
                <button onClick={() => setView('grid')} className={`p-1 rounded-md ${view === 'grid' ? 'bg-[#6B5B95]/20' : ''}`}><LuGrid className="h-5 w-5" /></button>
              </div>
              <button className="bg-[#6B5B95] hover:bg-[#5A4A84] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                Create Announcement
              </button>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Pinned Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedAnnouncements.map((announcement) => (
                <div key={announcement.id} className="bg-white/90 p-6 rounded-xl shadow-sm border border-[#6B5B95]">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 text-xs font-semibold">
                      {announcement.isUrgent && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-md">URGENT</span>
                      )}
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">
                        {announcement.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-red-500">
                      {announcement.daysLeft} days left
                    </div>
                  </div>
                  <h3 className="text-base font-bold mb-1 text-gray-800">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {announcement.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>
                      Posted {announcement.postedAgo} by {announcement.postedBy}
                    </span>
                    <button className="text-lg font-bold text-gray-500">...</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Announcements</h2>
            <div className={`gap-4 ${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'}`}>
              {filteredRecentAnnouncements.map((announcement) => {
                const typeColors = {
                  event: 'bg-[#6B5B95]/20 text-[#6B5B95]',
                  update: 'bg-green-200 text-green-700',
                  resource: 'bg-yellow-200 text-yellow-700',
                  opportunity: 'bg-[#6B5B95]/20 text-[#6B5B95]',
                };
                return (
                  <div key={announcement.id} className="bg-white/90 p-6 rounded-xl shadow-sm border border-[#6B5B95]">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${typeColors[announcement.type]}`}>
                        {announcement.type.toUpperCase()}
                      </span>
                      <button className="text-lg font-bold text-gray-500">...</button>
                    </div>
                    <h4 className="text-base font-bold text-gray-800 mb-2">
                      {announcement.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {announcement.description}
                    </p>
                    <div className="text-xs text-gray-400">
                      <span>Posted {announcement.postedAgo}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white/90 p-6 rounded-xl shadow-sm border border-[#6B5B95]">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Achievements */}
            <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-[#6B5B95]/20">
              <div className="flex justify-between items-center mb-3 border-b border-[#6B5B95]/20 pb-3">
                <h3 className="font-semibold text-gray-700">Recent Achievements</h3>
                <a href="#" className="text-sm text-yellow-500 hover:underline">View All</a>
              </div>
              <ul className="space-y-4">
                {quickAccessData.achievements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <img src={item.avatar} alt="Avatar" className="rounded-full w-8 h-8" />
                    <div>
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.achievement}</p>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Latest Notes */}
            <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-[#6B5B95]/20">
              <div className="flex justify-between items-center mb-3 border-b border-[#6B5B95]/20 pb-3">
                <h3 className="font-semibold text-gray-700">Latest Notes</h3>
                <a href="#" className="text-sm text-yellow-500 hover:underline">View All</a>
              </div>
              <ul className="space-y-4">
                {quickAccessData.notes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">{item.title}</span>
                      <p className="text-sm text-gray-600">Uploaded by {item.uploadedBy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Upcoming Events */}
            <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-[#6B5B95]/20">
              <div className="flex justify-between items-center mb-3 border-b border-[#6B5B95]/20 pb-3">
                <h3 className="font-semibold text-gray-700">Upcoming Events</h3>
                <a href="#" className="text-sm text-yellow-500 hover:underline">View Calendar</a>
              </div>
              <ul className="space-y-4">
                {quickAccessData.events.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-white p-2 rounded-lg text-sm font-bold w-12 h-12">
                      <span className="text-xs uppercase text-gray-500">{item.date.slice(0, 3)}</span>
                      <span className="text-lg text-gray-800">{item.date.slice(4)}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-800">{item.title}</span>
                      <span className="block text-sm text-gray-600">{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Secure Access Banner */}
        <div className="bg-[#6B5B95] text-white p-6 rounded-xl mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-1">Secure Access with Kalvium Community</h3>
            <p className="text-sm text-[#F7E4BC]">
              This platform is exclusively for Squad 69 & 70 members. Sign in with your @kalvium.community email for full access to all features.
            </p>
          </div>
          <button className="bg-white text-[#6B5B95] font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
            Login with Kalvium Email
          </button>
        </div>
      </div>
  );
};

// Main App component
const KalviumDashboard = () => {
  return (
    <div className="flex bg-gradient-to-br from-[#6B5B95] to-[#F7E4BC] min-h-screen font-sans antialiased">
      {/* Sidebar - Positioned fixed to be persistent across the app */}
      <aside className="fixed hidden md:flex flex-col w-64 h-full bg-[#6B5B95] border-r border-[#6B5B95] shadow-lg p-6 z-20 text-white">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="Squad Hub Logo"className="h-8 w-8 rounded-md" />
          <span className="text-xl font-bold text-white">Squad Hub</span>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-2">
              {/* Dashboard Link */}
              <a href="/dashboard" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuBarChart2 className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="mb-2">
              {/* My Profile Link */}
              <a href="/my-profile" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuLink className="h-5 w-5 mr-3" />
                <span>My Profile</span>
              </a>
            </li>
            <li className="mb-2">
              {/* Calendar Link */}
              <a href="/calendar" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuCalendar className="h-5 w-5 mr-3" />
                <span>Calendar</span>
              </a>
            </li>
            <li className="mb-2">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest my-4">Main Features</h3>
            </li>
            <li className="mb-2">
              {/* Announcements Link (currently active page) */}
              <a href="/announcements" className="flex items-center p-3 rounded-lg transition-colors bg-white/20 text-white font-semibold">
                <LuBell className="h-5 w-5 mr-3" />
                <span>Announcements</span>
              </a>
            </li>
            <li className="mb-2">
              {/* Achievements Wall Link */}
              <a href="/achievements" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuTrophy className="h-5 w-5 mr-3" />
                <span>Achievements Wall</span>
              </a>
            </li>
            <li className="mb-2">
              {/* Shared Notes Link */}
              <a href="/shared-notes" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuFileText className="h-5 w-5 mr-3" />
                <span>Shared Notes</span>
              </a>
            </li>
            <li className="mb-2">
              {/* Squad Members Link */}
              <a href="/squad-members" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuUsers className="h-5 w-5 mr-3" />
                <span>Squad Members</span>
              </a>
            </li>
            <li className="mb-2">
              {/* Resources Link */}
              <a href="/resources" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuFolder className="h-5 w-5 mr-3" />
                <span>Resources</span>
              </a>
            </li>
            <li className="mb-2">
              {/* Discussions Link */}
              <a href="/discussions" className="flex items-center p-3 rounded-lg transition-colors text-white/80 hover:bg-white/10">
                <LuMessageCircle className="h-5 w-5 mr-3" />
                <span>Discussions</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg mt-2 text-white">
          <img src="https://placehold.co/40x40/E8EFFF/1E3A8A?text=SD" alt="User Avatar" className="rounded-full" />
          <div>
            <span className="block font-semibold text-white">Sanjay Dookhoo</span>
            <span className="block text-xs text-white/80">Squad 69</span>
          </div>
        </div>
        <a href="#" className="flex items-center justify-center text-white font-semibold mt-3 p-3 rounded-lg border border-white hover:bg-white/10">
          <LuHelpCircle />
          <span>Get support</span>
        </a>
      </aside>

      {/* Main Content Area - Pushed to the right to clear the fixed sidebar */}
      <main className="flex-grow md:ml-64">
        <DashboardContent />
      </main>
    </div>
  );
};

export default KalviumDashboard;