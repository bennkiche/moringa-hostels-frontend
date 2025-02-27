import React, { useEffect, useState } from "react";
import "../App.css"
import NewRoom from "./NewRooms";
import RoomList from "./RoomList";

 
function Room(){ 
  const [room,setRoom] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms")
    .then(res => res.json())
    .then(data => {
      setRoom(data)
    })
    .catch(err => console.log(err))
  },[])
  
  return(
    <>
    <h1 className="mainH">Rooms</h1>
     <NewRoom room={room} setRoom={setRoom}/>
     <RoomList room={room} setRoom={setRoom}/>
    </>
  )
}

export default Room;