import { useState } from "react"
import { Link } from "react-router-dom";

function AccommodateItem({name,image, id, description,setAccommodate,accommodate}){
  const [update,setUpdate] =useState({
    name:"",
    image:"",
    description:""
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
    const token = localStorage.getItem("access_token"); 

    if (!token) {
        alert("You must be logged in to update accommodations.");
        return;
    }

    fetch(`http://127.0.0.1:5000/accommodations/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(update)
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error("Failed to update. Unauthorized or invalid request.");
        }
        return resp.json();
    })
    .then((updated) => {
        let updatedAccommodations = accommodate.map(craft => 
            craft.id === id ? { ...craft, ...updated } : craft
        );
        setAccommodate(updatedAccommodations);
        setUpdate({ name: "", image: "", description: "" });
        alert(`${updated.name} has been updated successfully!`);
    })
    .catch(err => console.error("Error updating accommodation:", err));
}


  function handleDelete() {
    const token = localStorage.getItem("access_token"); 

    if (!token) {
        alert("You must be logged in to delete accommodations.");
        return;
    }

    fetch(`http://127.0.0.1:5000/accommodations/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to delete. Unauthorized or invalid request.");
        }
        return res.json();
    })
    .then(() => {
        let remainder = accommodate.filter(fins => fins.id !== id);
        setAccommodate(remainder);
        alert(`${name} has been deleted successfully! 👋🏽`);
    })
    .catch(err => console.error("Error deleting accommodation:", err));
}
 
    return(
        <div id="content">
            <h2 className="mini">Name</h2>
            <h2 className="cont"><strong>{name}</strong></h2>
            <h3 className="mini">Image_URL</h3>
            <img className="cont" src={image} alt={name} />
            <h3 className="mini">Description</h3>
            <h2 className="cont"><strong>{description}</strong></h2>
              <form id="new" onSubmit={handleUpdate}>
                <input className="input" type="text" name="name" placeholder="Name" value={update.name} required onChange={handleChange}/><br />
                <input className="input" type="text" name="image" placeholder="Image_URL" value={update.image} required onChange={handleChange}/><br />
                <input className="input" type="text" name="description" placeholder="Description" value={update.description} required onChange={handleChange}/><br />
                
                <button className="update" type="submit">Update</button>
              </form>
              <button className="delete" onClick={handleDelete}>Delete</button><br />

             <Link to='/roomAdmins'>
              <button className="mini">
                View rooms
              </button>
             </Link> 
        </div>
    )
}

export default AccommodateItem;