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
import Contact from './components/Contact'
import Home from "./components/Home" 
import Room from './AdminRoom/Room'
import HomeAuth from './components/HomeAuth'
import BookingList from "./bookings/BookingList";
import BookingDetails from "./bookings/BookingDetails";
import BookingForm from "./bookings/BookingForm";
import './App.css'
import "./index.css"
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Reviews from './reviews/Reviews'
import MyReviews from './reviews/MyReviews'
import Mpesa from './mpesa/Mpesa'
import AvailableRooms from './bookings/AvailableRooms'

function App() {
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path='/accommodationUsers' element={<AccommodationDetails />} />
        <Route path='/accommodationAdmin' element={<Accommodate />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/roomUsers/:accommodation_id" element={<RoomUser />} />
        <Route path='/roomUsers' element={<RoomUser />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mpesa" element={<Mpesa />} />
        <Route path='/roomAdmins' element={<Room />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path='/homeAuth' element={<HomeAuth />} />
        <Route path='/home' element={<Home />} />
        <Route path="/Userbookings" element={<BookingList />} />
        <Route path="/book-room" element={<BookingForm />} />
        <Route path="/available" element={<AvailableRooms />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}


export default App;
