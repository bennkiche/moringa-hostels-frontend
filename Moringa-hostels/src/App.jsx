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
import HomeAuth from './components/HomeAuth'
import BookingList from "./bookings/BookingList";
import BookingDetails from "./bookings/BookingDetails";
import AvailableRooms from "./bookings/Rooms";
import BookingForm from "./bookings/BookingForm";
import './App.css'
import "./index.css"
import Navbar from './components/Navbar'
import NavbarUser from './components/NavbarUser'
import Profile from './components/Profile'

function App() {
  return (
     <Router>
      {/* <Navbar /> */}
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
        <Route path='/homeAuth' element={<HomeAuth />} />
        <Route path='/home' element={<Home />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/book-room" element={<BookingForm />} />
        <Route path="/bookings/" element={<AvailableRooms />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}


export default App;
