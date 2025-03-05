import { useState } from "react"
import { Link } from "react-router-dom";

function RealBookingsItems({user_id, accommodation_id,  room_id, start_date, end_date, status, id, bookings, setBookings}){
    return(
        <div className="hostel-card">
            <div className="hostel-info">
                <h2 className="hostel-name">{user_id}</h2>
                <h2 className="hostel-description">{accommodation_id}</h2>
                <h2 className="hostel-description">{room_id}</h2>
                <h2 className="hostel-description">{start_date}</h2>
                <h2 className="hostel-description">{end_date}</h2>
                <h2 className="hostel-description">{status}</h2>
            </div>
        </div>

    )
}

export default RealBookingsItems;