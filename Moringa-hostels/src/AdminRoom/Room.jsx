import React, { useEffect, useState } from "react";
import "../App.css"
import NewRoom from "./NewRooms";
import RoomList from "./RoomList";

function Room() { 
    const [room, setRoom] = useState([]);
    const token = localStorage.getItem("access_token");
    console.log("Retrieved Token:", token); 

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        fetch("https://moringa-hostels-backend.onrender.com/rooms", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Unauthorized or failed to fetch rooms");
            }
            return res.json();
        })
        .then((data) => {
            setRoom(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error("Error fetching rooms:", err));
    }, [token]);
  
  return(
    <>
    <h1 className="roomH">Rooms</h1>
     <NewRoom room={room} setRoom={setRoom} token={token}/>
     <RoomList room={room} setRoom={setRoom}/>
    </>
  )
}

export default Room;