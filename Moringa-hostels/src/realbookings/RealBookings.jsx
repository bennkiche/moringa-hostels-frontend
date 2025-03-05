import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RealBookingsList from "./RealBookingsList";

function RealBookings() { 
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user's info
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    fetch("http://127.0.0.1:5000/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      if (data.role !== "admin") {
        navigate("/home"); // Redirect non-admin users
      } else {
        fetchBookings(token);
      }
    })
    .catch(err => console.log(err));
  }, []);

  const fetchBookings = (token) => {
    fetch("http://127.0.0.1:5000/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.json())
    .then(data => setBookings(data))
    .catch(err => console.log(err));
  };

  return (
    <>
      <h1 className="mainH">Bookings</h1>
      <RealBookingsList bookings={bookings} setBookings={setBookings} />
    </>
  );
}

export default RealBookings;
