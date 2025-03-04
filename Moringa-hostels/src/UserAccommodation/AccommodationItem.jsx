import { useState } from "react"
import { Link } from "react-router-dom";

function AccommodationItem({name, image,  description, id, setAccommodation, accommodation}){
    return(
        <div className="hostel-card">
    <img className="hostel-image" src={image} alt={name} />
    <div className="hostel-info">
        <h2 className="hostel-name">{name}</h2>
        <p className="hostel-description">{description}</p>
        <div className="hostel-buttons">
            <Link to="/roomUsers">
                <button className="roomView-btn">View Rooms</button>
            </Link>
        </div>
    </div>
</div>

    )
}

export default AccommodationItem;