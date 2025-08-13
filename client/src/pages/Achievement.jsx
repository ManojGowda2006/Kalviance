import React, { useState } from 'react';
import { Award, Activity, Grid, Plus, ChevronDown, MessageCircle, Heart, Search, User2 } from 'lucide-react';

const Achievement = () => {
  // Mock data for the achievement cards
  const achievements = [
    {
      id: 1,
      tag: { label: 'Dojo Belt', color: 'bg-yellow-200 text-yellow-800 border-yellow-300', strapColor: 'border-t-4 border-yellow-500' },
      title: 'Black Belt in Data Structures',
      user: { name: 'Arjun Patel', squad: 'Squad 69' },
      description: 'Completed advanced algorithms track with 95% accuracy. Solved 150+ complex problems!',
      time: '2 days ago',
      comments: 24,
      likes: 8
    },
    {
      id: 2,
      tag: { label: 'Hackathon', color: 'bg-green-100 text-green-800 border-green-300', strapColor: 'border-t-4 border-green-500' },
      title: 'Won TechFest 2024',
      user: { name: 'Priya Sharma', squad: 'Squad 70' },
      description: '1st place in AI/ML category with our healthcare solution. Team of 4 from Squad 70.',
      time: '5 days ago',
      comments: 45,
      likes: 12
    },
    {
      id: 3,
      tag: { label: 'Internship', color: 'bg-indigo-100 text-indigo-800 border-indigo-300', strapColor: 'border-t-4 border-indigo-500' },
      title: 'Google Summer of Code',
      user: { name: 'Rahul Kumar', squad: 'Squad 69' },
      description: 'Selected for GSoC 2024! Working on open-source ML tools with TensorFlow team.',
      time: '1 week ago',
      comments: 67,
      likes: 18
    },
    {
      id: 4,
      tag: { label: 'Publication', color: 'bg-purple-100 text-purple-800 border-purple-300', strapColor: 'border-t-4 border-purple-500' },
      title: 'Research Paper Published',
      user: { name: 'Ananya Singh', squad: 'Squad 70' },
      description: 'Co-authored paper on "AI in Education" published in IEEE conference proceedings.',
      time: '2 weeks ago',
      comments: 32,
      likes: 9
    },
    {
      id: 5,
      tag: { label: 'Certification', color: 'bg-red-100 text-red-800 border-red-300', strapColor: 'border-t-4 border-red-500' },
      title: 'AWS Solutions Architect',
      user: { name: 'Vikram Joshi', squad: 'Squad 69' },
      description: 'Passed AWS SAA-C03 exam with 895/1000 score. Cloud architecture mastery achieved!',
      time: '3 weeks ago',
      comments: 28,
      likes: 6
    },
    {
      id: 6,
      tag: { label: 'Open Source', color: 'bg-cyan-100 text-cyan-800 border-cyan-300', strapColor: 'border-t-4 border-cyan-500' },
      title: 'React Contributor',
      user: { name: 'Sneha Reddy', squad: 'Squad 70' },
      description: 'Made significant contributions to React.js core library. 5 PRs merged successfully!',
      time: '1 month ago',
      comments: 41,
      likes: 15
    },
  ];

  const [activeTab, setActiveTab] = useState('All');

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

  // Filter the achievements based on the active tab
  const filteredAchievements = activeTab === 'All'
    ? achievements
    : achievements.filter(achievement => achievement.tag.label === getTagFromTab(activeTab));

  return (
    // Main container with a white background for the rest of the page
    <div className="bg-white font-sans min-h-screen flex flex-col">
      {/* Header with the same background as the top of the body */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Squad Info */}
            <div className="flex items-center">
              <img src="https://placehold.co/40x40/d1d5db/333333?text=Logo" alt="Squad Hub Logo" className="h-8 w-8 rounded-full" />
              <div className="ml-2 font-bold text-gray-800 text-lg">Squad Hub</div>
              <div className="ml-2 text-gray-500 text-sm hidden md:block">Squad 69 & 70</div>
            </div>

            {/* Desktop Navigation */}
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

            {/* Right-side actions */}
            <div className="flex items-center space-x-4">
              <button className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out">
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
      <main className="flex-grow">
        {/* Gradient section for the header and stats */}
        <div className="bg-gradient-to-r from-indigo-300 to-orange-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="h-10 w-10 text-yellow-500" />
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Achievements Wall</h1>
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
                  <div className="text-3xl font-bold text-gray-900">142</div>
                  <div className="text-sm text-gray-500">Total Achievements</div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <Activity className="h-8 w-8 text-red-500 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">23</div>
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
              <div key={achievement.id} className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col ${achievement.tag.strapColor}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${achievement.tag.color}`}>
                    {achievement.tag.label}
                  </span>
                  {/* Placeholder for the tag icon */}
                  {achievement.tag.label === 'Dojo Belt' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Dojo Belt" />}
                  {achievement.tag.label === 'Hackathon' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Hackathon" />}
                  {achievement.tag.label === 'Internship' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Internship" />}
                  {achievement.tag.label === 'Publication' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Publication" />}
                  {achievement.tag.label === 'Certification' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Certification" />}
                  {achievement.tag.label === 'Open Source' && <img src="https://placehold.co/24x24/d1d5db/333333?text=Icon" alt="Open Source" />}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2">{achievement.title}</h3>
                
                <div className="flex items-center mt-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                      <User2 className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{achievement.user.name}</p>
                    <p className="text-xs text-gray-500">{achievement.user.squad}</p>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <img src="https://placehold.co/40x40/d1d5db/333333?text=Logo" alt="Squad Hub Logo" className="h-8 w-8 rounded-full" />
            <div className="mt-2 sm:mt-0 sm:ml-2 font-bold text-gray-100 text-lg">Squad Hub</div>
          </div>
          <p className="text-sm">Empowering Squad 69 & 70 to achieve greatness together</p>
          <p className="mt-4 text-xs text-gray-500">
            © 2024 Kolvium Community
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Built with ❤️ for our squads
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Achievement;
