import React, { useEffect, useState } from "react";
import "../App.css"
import NewRoom from "./NewRooms";
import RoomList from "./RoomList";
import NavbarUser from "../components/NavbarUser";

 
function Room() { 
    const [room, setRoom] = useState([]);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        fetch("http://127.0.0.1:5000/rooms", {
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
    <NavbarUser />
    <h1 className="roomH">Rooms</h1>
     <NewRoom room={room} setRoom={setRoom} token={token}/>
     <RoomList room={room} setRoom={setRoom}/>
    </>
  )
}

export default Room;