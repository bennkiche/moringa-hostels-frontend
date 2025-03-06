import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL params
import "./rooms.css";
import RoomUserList from "./RoomUserList";

function RoomUser() { 
  const { accommodation_id } = useParams(); // Get accommodation_id from URL
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/rooms?accommodation_id=${accommodation_id}`) // Fetch rooms for this accommodation only
      .then(res => res.json())
      .then(data => {
        setRooms(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log("Error fetching rooms:", err));
  }, [accommodation_id]); // Re-fetch if accommodation_id changes
  
  return (
    <>
      <h1 className="roomH">Hostel Rooms</h1>
      <RoomUserList rooms={rooms} setRooms={setRooms} />
    </>
  );
}

export default RoomUser;
