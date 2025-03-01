import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingList from "./bookings/BookingList";
import BookingDetails from "./bookings/BookingDetails";
import AvailableRooms from "./bookings/Rooms";
import BookingForm from "./bookings/BookingForm";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/newbooking" element={<BookingForm />} />
        <Route path="/bookings/" element={<AvailableRooms />} />
        
      </Routes>
    </Router>
  );
};

export default App;
