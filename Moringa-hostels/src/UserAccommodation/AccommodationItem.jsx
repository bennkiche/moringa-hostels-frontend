import { useState } from "react"

function AccommodationItem({name,image, id, description,setAccommodation,accommodation}){
    return(
        <div id="content">
            <h2 className="mini">Name</h2>
            <h2 className="cont"><strong>{name}</strong></h2>
            <h3 className="mini">Image_URL</h3>
            <img className="cont" src={image} alt={name} />
            <h3 className="mini">Description</h3>
            <h2 className="cont"><strong>{description}</strong></h2>
            <button className="mini">View Rooms</button>
        </div>
    )
}

export default AccommodationItem;