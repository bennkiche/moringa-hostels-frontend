import { useState } from "react"
import { useNavigate } from "react-router-dom";

function RoomUserItem({room_no,room_type, id,image,description,availability, accommodation_id, price,rooms,setRooms}){
const navigate = useNavigate();

  const handleBookNow = () => {
    navigate.push({
      pathname: "/book-room",
      state: {
        room_no,
        room_type,
        accommodation_id,
        price,
        description,
        image,
      }
    });
  };

    return(
        <div id="content">
            <h2 className="cont"><strong>{room_type}</strong></h2>
            <h2 className="cont"><strong>{room_no}</strong></h2>
            <h2 className="cont"><strong>{availability}</strong></h2>
            <h2 className="mini">accommodation_id</h2>
            <h2 className="cont"><strong>{accommodation_id}</strong></h2>
            <h2 className="cont"><strong>{description}</strong></h2> 
            <h2 className="cont"><strong>ksh: {price}</strong></h2>
            <img src={image} alt={room_type} />
            <button className="mini" onClick={handleBookNow}>Book Now</button>
        </div>
    )
}

export default RoomUserItem;