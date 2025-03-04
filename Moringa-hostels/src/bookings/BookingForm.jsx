import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";

const BookingForm = ({ closeForm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_no, room_type, accommodation_id, price } = location.state || {};
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (room_type) {
      console.log("Room Type:", room_type);
    }
  }, [room_type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
  
    if (!startDate || !endDate) {
      setError("Start and End dates are required");
      console.log("Validation failed: Missing start or end date");
      return;
    }
  
    const token = localStorage.getItem("access_token");
  
    const bookingData = {
      accommodation_id,
      room_id: room_no,
      start_date: startDate.replace("T", " "),
      end_date: endDate.replace("T", " "),
    };
  
    try {
      console.log("Sending booking request to API:", bookingData);
  
      const response = await fetch("http://127.0.0.1:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
  
      console.log("Response received:", response);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Server error response:", errorData);
        throw new Error(errorData.error || "Error booking room");
      }
  
      console.log("Booking successful!");
      alert("Booking successful!");
      closeForm();
    } catch (err) {
      console.error("Booking error:", err.message);
      setError(err.message);
    }
  };
  

  return (
    <div>
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
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="bookingLabel">End Date</label><br />
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
  );
};

export default BookingForm;