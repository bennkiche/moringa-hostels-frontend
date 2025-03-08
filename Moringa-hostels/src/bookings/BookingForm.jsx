import { useState } from "react";

function NewRoom({ room, setRoom, token }) {
    const [newRoom, setNewRoom] = useState({
        room_type: "",
        room_no: 0,
        availability: true, // Set initial availability to true
        accommodation_id: "",
        price: 0,
        description: "", 
        image: "",
    });

    function handleChange(e) {
      let { name, value } = e.target;
  
      if (name === "room_no" || name === "accommodation_id" || name === "price") {
          value = parseInt(value, 10) || 0; 
      }
  
      if (name === "availability") {
          value = value === "true"; // Ensure it's a proper boolean
      }
  
      setNewRoom((prev) => ({
          ...prev,
          [name]: value
      }));
  }
  

    function handleSubmit(e) {
        e.preventDefault();
    
        const minPrice = 5000;
        const maxPrice = 30000;
    
        // Price validation
        if (newRoom.price < minPrice || newRoom.price > maxPrice) {
            alert(`Room price must be between ${minPrice} and ${maxPrice} price!`);
            return;
        }
    
        if (!token) {
            alert("You must be logged in to add a room!");
            return;
        }
    
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
                availability: true, // Reset availability to true
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
                <label>Room Type: </label>
                <input 
                    className="new" 
                    type="text" 
                    name="room_type" 
                    placeholder="Room Type" 
                    value={newRoom.room_type} 
                    required 
                    onChange={handleChange} 
                /><br />
                
                <label>Room No: </label>
                <input 
                    className="new" 
                    type="number" 
                    name="room_no" 
                    placeholder="Room Number" 
                    value={newRoom.room_no} 
                    required 
                    onChange={handleChange} 
                /><br />
                
                <label>Description: </label>
                <input 
                    className="new" 
                    type="text" 
                    name="description" 
                    placeholder="Description" 
                    value={newRoom.description} 
                    required 
                    onChange={handleChange} 
                /><br />
                
                <label>Availability: </label>
                <select 
                    className="new" 
                    name="availability" 
                    value={newRoom.availability ? "true" : "false"} 
                    onChange={handleChange} 
                    required
                >
                    <option value="true">Not Available</option>
                    <option value="false">Available</option>
                </select><br />
                
                <label>Accommodation ID: </label>
                <input 
                    className="new" 
                    type="number" 
                    name="accommodation_id" 
                    placeholder="Accommodation ID" 
                    value={newRoom.accommodation_id} 
                    required 
                    onChange={handleChange} 
                /><br />
                
                <label>Price: </label>
                <input 
                    className="new" 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={newRoom.price} 
                    required 
                    onChange={handleChange} 
                /><br />
                
                <label>Image URL: </label>
                <input 
                    className="new" 
                    type="text" 
                    name="image" 
                    placeholder="Image URL" 
                    value={newRoom.image} 
                    required 
                    onChange={handleChange} 
                /><br />
        
                <button className="add" type="submit">Add Room</button>
            </form> 
        </div> 
    );
}

export default NewRoom;
