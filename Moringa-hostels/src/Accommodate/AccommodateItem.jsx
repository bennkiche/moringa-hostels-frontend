import { useState } from "react"

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
  function handleUpdate(e){
    e.preventDefault()
    fetch(` http://127.0.0.1:5000/accommodations/${id}`, {
       method:"PATCH",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(update)
    })
    .then(resp => resp.json())
    .then((updated) => {
      let updatedPlane = accommodate.map(craft => {
        if(craft.id === id){
          craft.name = updated.name
          craft.image = updated.image
          craft.description = updated.description
        } 
        return craft
      })
      setAccommodate(updatedPlane)
      setUpdate({
        'name':"",
        "image":"",
        "description":""
      })
      alert(`poof ${name} updated successfully!!`)
    })
    .catch(err => console.log(err))
  }

  function handleDelete(){
    fetch(`http://127.0.0.1:5000/accommodations/${id}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      let remainder = accommodate.filter(fins => fins.id !== id)
      setAccommodate(remainder)
      alert(`Poof! ${name} is gone!👋🏽`)
    })
    .catch(err => console.log(err))
  }  
    return(
        <div id="content">
            <h2 className="mini">Name</h2>
            <h2 className="cont"><strong>{name}</strong></h2>
            <h3 className="mini">Image_URL</h3>
            < img className="cont" src={image} alt={name} />
            <h3 className="mini">Description</h3>
            <h2 className="cont"><strong>{description}</strong></h2>
              <form id="new" onSubmit={handleUpdate}>
                <input className="input" type="text" name="name" placeholder="Name" value={update.name} required onChange={handleChange}/><br />
                <input className="input" type="text" name="image" placeholder="Image_URL" value={update.image} required onChange={handleChange}/><br />
                <input className="input" type="text" name="description" placeholder="Description" value={update.description} required onChange={handleChange}/><br />
                
                <button className="update" type="submit">Update</button>
              </form>
              <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default AccommodateItem;