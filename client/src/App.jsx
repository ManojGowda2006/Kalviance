import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Announcement from './pages/Announcement'
import Achievement from './pages/Achievement'
const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/announcements' element={<Announcement />} />
        <Route path='/achievements' element={<Achievement />} />
       </Routes>
    </div>
  )
}

export default App
