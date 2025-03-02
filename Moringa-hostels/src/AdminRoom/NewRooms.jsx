import { useState } from "react";

function NewRoom({ room, setRoom, token }) {
    const [newRoom, setNewRoom] = useState({
        room_type: "",
        room_no: 0,
        availability: "",
        accommodation_id: "",
        price: 0,
        description: "", 
        image: "",
    });

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setNewRoom({ 
            ...newRoom, 
           [name]: value
         });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to add a room!");
            return;
        }

        console.log(token)

        fetch("http://127.0.0.1:5000/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newRoom)
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Unauthorized - Invalid token");
            return resp.json();
        })
        .then(newRoomData => {
            setRoom([...room, newRoomData]);
            setNewRoom({
                room_type: "",
                room_no: 0,
                availability: "",
                accommodation_id: "",
                price: 0,
                description: "",
                image: "",
            });
            alert(`Room "${newRoomData.room_type}" created successfully!`);
        })
        .catch(error => console.error("Error:", error));
    }

    return (
        <div className="newness">
            <h2 className="newer">New Room</h2>
            <form id="new" onSubmit={handleSubmit}>
                <input className="new" type="text" name="room_type" placeholder="Room Type" value={newRoom.room_type} required onChange={handleChange}/>
                <input className="new" type="number" name="room_no" placeholder="Room Number" value={newRoom.room_no} required onChange={handleChange}/>
                <input className="new" type="text" name="description" placeholder="Description" value={newRoom.description} required onChange={handleChange}/>
                <input className="new" type="text" name="availability" placeholder="Availability" value={newRoom.availability} required onChange={handleChange}/>
                <input className="new" type="number" name="accommodation_id" placeholder="Accommodation ID" value={newRoom.accommodation_id} required onChange={handleChange}/>
                <input className="new" type="number" name="price" placeholder="Price" value={newRoom.price} required onChange={handleChange}/>
                <input className="new" type="text" name="image" placeholder="Image URL" value={newRoom.image} required onChange={handleChange}/>
                <button className="add" type="submit">Add Room</button>
            </form> 
        </div> 
    );
}

export default NewRoom