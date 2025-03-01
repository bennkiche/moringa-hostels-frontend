import { useState } from 'react'
import AccommodationDetails from './UserAccommodation/AccommodationDetails'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Authentication from './authentications/Authentication'
import Accommodate from './AdminAccommodation/Accommodate'
import LandingPage from './components/LandingPage'
import SignupForm from './authentications/Signup'
import LoginForm from './authentications/Login'
import RoomUser from './UserRooms/RoomUser'
import About from "./components/About"
import Contact from './comps/Contact'
import Home from "./components/Home" 
import Room from './AdminRoom/Room'
import './App.css'
import "./index.css"

function App() {
  return (
     <Router>
      <Routes>
        <Route path='/accommodationUsers' element={<AccommodationDetails />} />
        <Route path='/accommodationAdmin' element={<Accommodate />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path='/roomUsers' element={<RoomUser />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/roomAdmins' element={<Room />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
