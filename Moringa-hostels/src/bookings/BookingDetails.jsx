import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [booking, setBooking] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token"); // Ensure token is defined

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/bookings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include authentication token
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching booking details");
        }
        return response.json();
      })
      .then((data) => {
        setBooking(data);
        setStartDate(data.start_date.slice(0, 16)); // Format correctly
        setEndDate(data.end_date.slice(0, 16)); 
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
        setError("Failed to load booking details");
      });
  }, [id, token]);

  const handleUpdate = () => {
    if (!startDate || !endDate) {
      setError("Start and End dates are required");
      return;
    }

    // Prevent updating if booking is canceled
    if (booking.status === "canceled") {
      setError("You cannot update a canceled booking.");
      return;
    }

    const updatedBooking = {
      start_date: startDate.replace("T", " "), // Convert to "YYYY-MM-DD HH:MM"
      end_date: endDate.replace("T", " "),
    };

    fetch(`http://127.0.0.1:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include authentication
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating booking");
        }
        return response.json();
      })
      .then(() => {
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
        <p><strong>Room ID:</strong> {booking.room_id}</p>
        <p><strong>Start Date:</strong> {new Date(booking.start_date).toLocaleString()}</p>
        <p><strong>End Date:</strong> {new Date(booking.end_date).toLocaleString()}</p>
        <p><strong>Status:</strong> {booking.status}</p> {/* Display status */}
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={booking.status === "canceled"} // Disable input if canceled
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={booking.status === "canceled"} // Disable input if canceled
        />
      </div>
      <button onClick={handleUpdate} disabled={booking.status === "canceled"}>
        Update Booking
      </button>
    </div>
  );
};

export default BookingDetails;
