import { useState } from "react";

function NewRoom({ room, setRoom, token }) {
    const [newRoom, setNewRoom] = useState({
        room_type: "",
        room_no: 0,
        availability: false,
        accommodation_id: "",
        price: 0,
        description: "", 
        image: "",
    });
    const [uploading, setUploading] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        
        if (name === "room_no" || name === "accommodation_id" || name === "price") {
            value = parseInt(value, 10) || 0; 
        }
        
        if (name === "availability") {
            value = e.target.value === "true";
        }

        setNewRoom((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_uploads"); 

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dvjkvk71s/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setNewRoom((prev) => ({ ...prev, image: data.secure_url }));
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setUploading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const minPrice = 5000;
        const maxPrice = 30000;
    
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
                availability: false,
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
                <input className="new" type="text" name="room_type" placeholder="Room Type" value={newRoom.room_type} required onChange={handleChange} /><br />
                
                <label>Room No: </label>
                <input className="new" type="number" name="room_no" placeholder="Room Number" value={newRoom.room_no} required onChange={handleChange} /><br />
                
                <label>Description: </label>
                <input className="new" type="text" name="description" placeholder="Description" value={newRoom.description} required onChange={handleChange} /><br />
                
                <label>Availability: </label>
                <select className="new" name="availability" value={newRoom.availability ? "true" : "false"} onChange={handleChange} required>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select><br />
                
                <label>Accommodation ID: </label>
                <input className="new" type="number" name="accommodation_id" placeholder="Accommodation ID" value={newRoom.accommodation_id} required onChange={handleChange} /><br />
                
                <label>Price: </label>
                <input className="new" type="number" name="price" placeholder="Price" value={newRoom.price} required onChange={handleChange} /><br />
                
                <label>Upload Image: </label>
                <input type="file" className="new" accept="image/*" onChange={handleImageUpload} required /><br />
                {uploading && <p>Uploading...</p>}
                {newRoom.image && <img src={newRoom.image} alt="Uploaded" className="w-32 h-32 mt-2" />}
                
                <button className="add" type="submit" disabled={uploading}>Add Room</button>
            </form>
        </div> 
    );
}

export default NewRoom;
