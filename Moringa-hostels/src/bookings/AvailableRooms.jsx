import React, { useState, useEffect } from "react";
import BookingForm from "./BookingForm";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        setFilteredRooms(data); // Initially, all rooms are shown
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms.");
      });
  }, []);

  const filterRooms = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    setError("");
    const filtered = rooms.filter((room) => 
      !room.booked_dates || 
      new Date(room.booked_dates.end) < new Date(startDate) || 
      new Date(room.booked_dates.start) > new Date(endDate)
    );
    setFilteredRooms(filtered);
  };

  const cancelBooking = (roomId) => {
    fetch(`http://127.0.0.1:5000/bookings/cancel/${roomId}`, {
      method: "PATCH", // Updated to match backend logic
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error canceling booking");
        }
        return response.json();
      })
      .then(() => {
        setRooms(rooms.map((room) =>
          room.id === roomId ? { ...room, is_booked: false, booked_dates: null } : room
        ));
        filterRooms(); // Refresh the filtered list
      })
      .catch((err) => {
        console.error("Error canceling booking:", err);
        setError("Failed to cancel booking.");
      });
  };

  return (
    <div>
      <h2>All Rooms</h2>
      <div>
        <label>Start Date:</label>
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={filterRooms}>Search Available Rooms</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredRooms.length === 0 ? (
          <p>No rooms available for the selected dates.</p>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                width: "300px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={room.image || "https://via.placeholder.com/300"}
                alt={`Room ${room.room_no}`}
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
              />
              <h3>Room {room.room_no}</h3>
              <p><strong>Type:</strong> {room.room_type}</p>
              <p><strong>Description:</strong> {room.description || "No description available"}</p>
              <p><strong>Price:</strong> ${room.price} per month</p>
              <p><strong>Accommodation ID:</strong> {room.accommodation_id}</p>
              <p><strong>Status:</strong> {room.is_booked ? "Booked" : "Available"}</p>
              {room.is_booked && (
                <>
                  <p><strong>Booked Dates:</strong> {room.booked_dates?.start} - {room.booked_dates?.end}</p>
                  <button onClick={() => cancelBooking(room.id)}>Cancel Booking</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableRooms;
