import React, { useEffect, useState } from "react";
import "../App.css";
import RoomUserList from "./RoomUserList";


 
function RoomUser(){ 
  const [rooms,setRooms] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms")
    .then(res => res.json())
    .then(data => {
      setRooms(data)
    })
    .catch(err => console.log(err))
  },[])
  
  return(
    <>
    <h1 className="mainH">Rooms</h1>
     <RoomUserList rooms={rooms} setRooms={setRooms}/>
    </>
  )
}

export default RoomUser;