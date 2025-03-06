import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookings.css";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id, room_no, room_type, accommodation_id, price } = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert if dates are missing
    if (!startDate || !endDate) {
      alert("Please fill in both Start Date and End Date.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const bookingData = {
      accommodation_id,
      room_id,  // ✅ Ensure this is `room_id`
      start_date: startDate.replace("T", " "),
      end_date: endDate.replace("T", " "),
    };    

    console.log("Booking Data being sent:", bookingData);

    try {
      const response = await fetch("http://127.0.0.1:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Error booking room");
      }

      // Navigate to Mpesa payment if booking is successful
      navigate("/mpesa", { state: { amount: price } });

    } catch (err) {
      console.error("Booking Error:", err.message);

      // Alert if the room is already booked
      if (err.message.includes("Room is already booked")) {
        alert("This room is already booked for the selected dates. Please choose another room.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book Room</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="bookingLabel">Room Type</label><br />
          <input type="text" value={room_type || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Room Number</label><br />
          <input type="text" value={room_no || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Accommodation ID</label><br />
          <input type="text" value={accommodation_id || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Price (KSH)</label><br />
          <input type="text" value={price || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Start Date</label><br />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="bookingLabel">End Date</label><br />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
