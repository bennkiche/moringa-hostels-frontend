import { useState } from "react"

function RoomItem({room_type,room_no, availability, accommodation_id, description,id,image,price,room,setRoom}){
  const [update,setUpdate] =useState({
        room_type:"",
        room_no:"",
        availability:"",
        accommodation_id:"",
        price:"",
        description:"",
        image:""
  })
  function handleChange(e){
      e.preventDefault()
      let name = e.target.name
      let value = e.target.value

      setUpdate({
        ...update,
        [name]:value
      }) 
  } 
  function handleUpdate(e) {
    e.preventDefault();
    
    const minPrice = 5000;
    const maxPrice = 30000;
  
    // Price validation before sending the request
    if (update.price < minPrice || update.price > maxPrice) {
      alert(`Room price must be between ${minPrice} and ${maxPrice}!`);
      return;
    }
  
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      alert("You must be logged in to update a room.");
      return;
    }
  
    fetch(`https://moringa-hostels-backend.onrender.com/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        room_type: update.room_type,
        room_no: Number(update.room_no),
        availability: update.availability,
        accommodation_id: Number(update.accommodation_id),
        price: Number(update.price),
        description: update.description,
        image: update.image
      })
    })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }
      return resp.json();
    })
    .then((updated) => {
      let updatedRooms = room.map(craft =>
        craft.id === id ? { ...craft, ...updated } : craft
      );
      setRoom(updatedRooms);
      setUpdate({
        room_type: "",
        room_no: "",
        availability: "",
        accommodation_id: "",
        price: "",
        description: "",
        image: "",
      });
      alert("Room updated successfully!");
    })
    .catch(err => console.error("Error updating room:", err));
  }
  

  function handleDelete(){
    const token = localStorage.getItem("access_token")

    if (!token) {
      alert("You must be logged in to delete a room.");
      return;
    }

    fetch(`https://moringa-hostels-backend.onrender.com/rooms/${id}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
    if (!res.ok) {
      throw new Error("Unauthorized: You don't have permission to delete this room.");
    }
    return res.json();
  })
  .then(() => {
    let remainder = room.filter(fins => fins.id !== id);
    setRoom(remainder);
    alert('The room has been deleted successfully');
  })
  .catch(err => console.error("Error deleting room:", err));
}
    return(
        <div id="content">
            <img src={image} alt={room_type} />
            <h2 className="cont"><strong>{room_type}</strong></h2>
            <h2 className="cont"><strong>{room_no}</strong></h2>
            <h2 className="cont"><strong>{description}</strong></h2> 
            <h2 className="cont"><strong>{availability}</strong></h2>
            <h2 className="mini">accommodation_id</h2>
            <h2 className="cont"><strong>{accommodation_id}</strong></h2>
            <h2 className="cont"><strong>ksh: {price}</strong></h2>
              <form id="new" onSubmit={handleUpdate}>
                <input className="input" type="text" name="room_type" placeholder="room_type" value={update.room_type} required onChange={handleChange}/><br />
                <input className="input" type="number" name="room_no" placeholder="room_no" value={update.room_no} required onChange={handleChange}/><br />
                <input className="input" type="text" name="availability" placeholder="availability" value={update.availability} required onChange={handleChange}/><br />
                <input className="input" type="number" name="accommodation_id" placeholder="accommodation_id" value={update.accommodation_id} required onChange={handleChange}/><br />
                <input className="input" type="text" name="description" placeholder="Description" value={update.description} required onChange={handleChange}/><br />
                <input className="input" type="number" name="price" placeholder="Price" value={update.price} required onChange={handleChange}/><br />
                <input className="input" type="text" name="image" placeholder="image" value={update.image} required onChange={handleChange}/>
                <button className="update" type="submit">Update</button>
              </form>
              <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default RoomItem;