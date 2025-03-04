import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import "../App.css";
import RoomUserList from "./RoomUserList";

function RoomUser() { 
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();  // ✅ Redirect if accommodationId is missing

  const accommodationId = location.state?.accommodationId || null; // Extract accommodationId

  useEffect(() => {
    if (!accommodationId) {
      navigate("/homeAuth");  // ✅ Redirect to home if no accommodationId
      return;
    }

    console.log(`Fetching rooms for accommodationId: ${accommodationId}`);

    fetch(`http://127.0.0.1:5000/rooms?accommodation_id=${accommodationId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Rooms fetched:", data);  // ✅ Log backend response
        setRooms(data.rooms || []);
      })
      .catch(err => console.log(err));
  }, [accommodationId, navigate]);

  return (
    <>
      <h1 className="roomH">Hostel Rooms</h1>
      {rooms.length > 0 ? (
        <RoomUserList rooms={rooms} setRooms={setRooms} />
      ) : (
        <p>No rooms available.</p>
      )}
    </>
  );
}

export default RoomUser;
