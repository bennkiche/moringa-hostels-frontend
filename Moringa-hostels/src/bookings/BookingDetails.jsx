import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [booking, setBooking] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/bookings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching booking details");
        }
        return response.json();
      })
      .then((data) => {
        setBooking(data);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
        setError("Failed to load booking details");
      });
  }, [id]);

  const handleUpdate = () => {
    if (!startDate || !endDate) {
      setError("Start and End dates are required");
      return;
    }

    const updatedBooking = {
      start_date: startDate,
      end_date: endDate,
    };

    fetch(`http://127.0.0.1:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating booking");
        }
        navigate("/bookings"); 
      })
      .catch((error) => {
        setError("Error updating booking");
        console.error(error);
      });
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div>
      <h2>Booking Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>Room ID: {booking.room_id}</p>
        <p>Start Date: {new Date(booking.start_date).toLocaleString()}</p>
        <p>End Date: {new Date(booking.end_date).toLocaleString()}</p>
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update Booking</button>
    </div>
  );
};

export default BookingDetails;
