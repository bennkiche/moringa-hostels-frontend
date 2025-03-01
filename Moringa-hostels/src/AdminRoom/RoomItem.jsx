import { useState } from "react"

function RoomItem({room_type,room_no, availability, accommodation_id, description,image,price,room,setRoom}){
  const [update,setUpdate] =useState({
        room_type:"",
        room_no:0,
        availability:"",
        accommodation_id:0,
        price:0,
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
  function handleUpdate(e){
    e.preventDefault()
    fetch(` http://127.0.0.1:5000/rooms/${id}`, {
       method:"PATCH",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(update)
    })
    .then(resp => resp.json())
    .then((updated) => {
      let updatedPlane = room.map(craft => {
        if(craft.id === id){
          craft.room_type = updated.room_type
          craft.room_no = updated.room_no
          craft.availability = updated.availability
          craft.accommodation_id = updated.accommodation_id
          craft.description = updated.description
          craft.price = updated.price
          craft.image = updated.image
        } 
        return craft
      })
      setRoom(updatedPlane)
      setUpdate({
        'room_type':"",
        'room_no':0,
        'availability':"",
        'accommodation_id':0,
        'price':0,
        'description':"",
        'image':"",
      })
      alert('poof room updated successfully!!')
    })
    .catch(err => console.log(err))
  }

  function handleDelete(){
    fetch(`http://127.0.0.1:5000/rooms/${id}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      let remainder = room.filter(fins => fins.id !== id)
      setRoom(remainder)
      alert('The room has been deleted successfully')
    })
    .catch(err => console.log(err))
  }  
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