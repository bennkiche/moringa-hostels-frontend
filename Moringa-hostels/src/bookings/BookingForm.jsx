import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import './bookings.css'

const BookingForm = ({ closeForm }) => {
  const location = useLocation();
  const { room_no, room_type, accommodation_id, price } = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [existingBookings, setExistingBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (room_type) {
      console.log("Room Type:", room_type);
    }
  }, [room_type]);

  // Fetch existing bookings for this room
  useEffect(() => {
    if (room_no) {
      fetch(`http://127.0.0.1:5000/bookings/room/${room_no}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch existing bookings");
          }
          return response.json();
        })
        .then((data) => {
          setExistingBookings(data);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err.message);
        });
    }
  }, [room_no]);

  const validateDates = (start, end) => {
    if (!start || !end) return false;

    const startObj = new Date(start);
    const endObj = new Date(end);

    const timeDiff = endObj - startObj;
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    return dayDiff >= 30; // Booking must be at least 30 days
  };

  const isRoomAvailable = (start, end) => {
    const startObj = new Date(start);
    const endObj = new Date(end);

    return !existingBookings.some((booking) => {
      const bookedStart = new Date(booking.start_date);
      const bookedEnd = new Date(booking.end_date);

      return bookedEnd > startObj && bookedStart < endObj; // Overlapping check
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    if (!startDate || !endDate) {
      setError("Start and End dates are required");
      console.log("Validation failed: Missing start or end date");
      return;
    }

    if (!validateDates(startDate, endDate)) {
      setError("Booking must be at least 30 days.");
      console.log("Validation failed: Booking duration too short");
      return;
    }

    if (!isRoomAvailable(startDate, endDate)) {
      alert("This room is already booked for the selected dates!");
      setError("Room is already booked for selected dates!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to book a room.");
      console.log("Authorization failed: No token found");
      return;
    }

    const bookingData = {
      accommodation_id,
      room_id: room_no,
      start_date: startDate.replace("T", " "),
      end_date: endDate.replace("T", " "),
    };

    console.log("Sending booking request to API:", bookingData);

    fetch("http://127.0.0.1:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Error booking room");
          });
        }
        return response.json();
      })
      .then(() => {
        console.log("Booking successful!");
        alert("Booking successful!");
        closeForm();
      })
      .catch((err) => {
        console.error("Booking error:", err.message);
        setError(err.message);
      });
  };

  return (
    <div className="booking-form-container">
      <NavbarUser />
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
        <button type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
};

export default BookingForm;
