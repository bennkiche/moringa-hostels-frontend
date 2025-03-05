import React, { useState, useEffect } from "react";

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
        setFilteredRooms(data);
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

    if (new Date(startDate) >= new Date(endDate)) {
      setError("Start date must be before end date.");
      return;
    }

    setError("");

    const filtered = rooms.filter((room) => {
      if (!room.booked_dates) return true; // Room is available if it has no bookings

      const bookedStart = new Date(room.booked_dates.start);
      const bookedEnd = new Date(room.booked_dates.end);
      const selectedStart = new Date(startDate);
      const selectedEnd = new Date(endDate);

      // Room is available if the selected range **does NOT overlap** with the booked range
      return selectedEnd <= bookedStart || selectedStart >= bookedEnd;
    });

    setFilteredRooms(filtered);
    
    console.log(room.booked_dates)

    console.log("button pressed")
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
