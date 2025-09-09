import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Announcement from './pages/Announcement'
import Achievement from './pages/Achievement'
import Notes from './pages/Notes'
import Layout from './components/Layout' 
import Profile from './pages/Profile' // Import the new Profile page

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/announcements' element={<Announcement />} />
          <Route path='/achievements' element={<Achievement />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/profile' element={<Profile />} /> 
        </Route>
       </Routes>
    </div>
  )
}

export default App