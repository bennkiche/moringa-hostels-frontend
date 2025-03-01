import { useState } from "react"

function NewRoom({room,setRoom}){
    const [newRoom,setNewRoom] = useState({
        room_type:"",
        room_no:0,
        availability:"",
        accommodation_id:0,
        price:0,
        description:"",
        image:"",
    })
    function handleChange(e){
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value

        setNewRoom({
            ...newRoom,
            [name]:value
        })
    }
    function handleSubmit(e){
       e.preventDefault()
       fetch("http://127.0.0.1:5000/rooms", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newRoom)
       })
       .then(resp => resp.json())
       .then(poisson => {setRoom([...room,poisson])
        setNewRoom({
            room_type:"",
            room_no:0,
            availability:"",
            accommodation_id:0,
            price:0,
            description:"",
            image:"",
        })
        alert(`Poof ${newRoom.name} created with success`)
       })
       .catch(error => console.log(error)) 
    }
    return(
        <div className="newness">
          <h2 className="newer">New Room</h2>
            <form id="new" onSubmit={handleSubmit}>
                <input className="new" type="text" name="room_type" placeholder="room_type" value={newRoom.name} required onChange={handleChange}/>
                <input className="new" type="text" name="room_no" placeholder="room_no" value={newRoom.image} required onChange={handleChange}/>
                <input className="new" type="text" name="description" placeholder="description" value={newRoom.description} required onChange={handleChange}/>
                <input className="new" type="text" name="availability" placeholder="availability" value={newRoom.availability} required onChange={handleChange}/>
                <input className="new" type="text" name="accommodation_id" placeholder="accommodation_id" value={newRoom.accommodation_id} required onChange={handleChange}/>
                <input className="new" type="text" name="price" placeholder="price" value={newRoom.price} required onChange={handleChange}/>
                <input className="new" type="text" name="image" placeholder="image" value={newRoom.image} required onChange={handleChange}/>
                <button className="add" type="submit">Add</button>
            </form> 
        </div> 
    )
}

export default NewRoom;