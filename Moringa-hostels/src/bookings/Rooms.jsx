import React, { useState, useEffect } from "react";
import BookingForm from "./BookingForm";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState("");

  const fetchAvailableRooms = () => {
    if (!startDate || !endDate) {
      setError("Please select start and end dates.");
      return;
    }

    fetch(`http://127.0.0.1:5000/rooms/available?start_date=${startDate}&end_date=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setError("Failed to load available rooms.");
      });
  };

  return (
    <div>
      <h2>Available Rooms</h2>

      <div>
        <label>Start Date:</label>
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        
        <label>End Date:</label>
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        
        <button onClick={fetchAvailableRooms}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {rooms.map((room) => (
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
              src={room.image_url || "https://via.placeholder.com/300"}
              alt={`Room ${room.room_number}`}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>Room {room.room_number}</h3>
            <p><strong>Type:</strong> {room.room_type}</p>
            <p><strong>Description:</strong> {room.description || "No description available"}</p>
            <p><strong>Price:</strong> ${room.price} per month</p>
            <p><strong>Accommodation ID:</strong> {room.accommodation_id}</p>

            <button onClick={() => setSelectedRoom(room)}>Book</button>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <BookingForm
          roomId={selectedRoom.id}
          closeForm={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
};

export default AvailableRooms;
