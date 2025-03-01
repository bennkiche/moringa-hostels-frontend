import { useState } from "react"

function RoomUserItem({room_no,room_type, id,image,description,availability, accommodation_id, price,rooms,setRooms}){
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
            <button className="mini">View Rooms</button>
        </div>
    )
}

export default RoomUserItem;