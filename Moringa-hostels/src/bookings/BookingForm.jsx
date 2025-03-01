import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookingForm = ({ closeForm }) => {
  const location = useLocation();
  const { room_no, room_type, accommodation_id, price, description, image } = location.state || {};
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (room_type) {
      console.log("Room Type:", room_type);
    }
  }, [room_type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Start and End dates are required");
      return;
    }

    const bookingData = {
      room_no,
      room_type,
      accommodation_id,
      start_date: startDate.replace("T", " "),
      end_date: endDate.replace("T", " "),
      status: "confirmed"
    };

    fetch("http://127.0.0.1:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    })
      .then((response) => response.json())
      .then(() => {
        alert("Booking successful!");
        closeForm(); 
      })
      .catch(async (error) => {
        const errorMessage = await error.json();
        setError(errorMessage.error || "Error booking room");
      });
  };

  return (
    <div>
      <h2>Book Room</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Type</label>
          <input type="text" value={room_type || ""} readOnly />
        </div>
        <div>
          <label>Room Number</label>
          <input type="text" value={room_no || ""} readOnly />
        </div>
        <div>
          <label>Accommodation ID</label>
          <input type="text" value={accommodation_id || ""} readOnly />
        </div>
        <div>
          <label>Price (KSH)</label>
          <input type="text" value={price || ""} readOnly />
        </div>
        <div>
          <label>Start Date</label>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date</label>
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
};

export default BookingForm;
