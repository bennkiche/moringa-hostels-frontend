import { useState } from "react"

function NewAccommodate({accommodate,setAccommodate}){
    const [NewAccommodate,setNewAccommodate] = useState({
        name:"",
        image:"",
        description:""
    })
    function handleChange(e){
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value

        setNewAccommodate({
            ...NewAccommodate,
            [name]:value
        })
    }
    function handleSubmit(e){
       e.preventDefault()
       const token = localStorage.getItem("access_token")
       fetch("http://127.0.0.1:5000/accommodations", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(NewAccommodate)
       })
       .then(resp => resp.json())
       .then(poisson => {setAccommodate([...accommodate,poisson])
        setNewAccommodate({
            name:"",
            image:"",
            description:""
        })
        alert(`Poof ${NewAccommodate.name} created with success`)
       })
       .catch(error => console.log(error)) 
    }
    return(
        <div className="newness">
          <h2 className="newer">New Accommodation</h2>
            <form id="new" onSubmit={handleSubmit}>
                <input className="new" type="text" name="name" placeholder="Name" value={NewAccommodate.name} required onChange={handleChange}/>
                <input className="new" type="text" name="image" placeholder="image" value={NewAccommodate.image} required onChange={handleChange}/>
                <input className="new" type="text" name="description" placeholder="description" value={NewAccommodate.description} required onChange={handleChange}/>
                <button className="add" type="submit">Add</button>
            </form> 
        </div> 
    )
}

export default NewAccommodate;