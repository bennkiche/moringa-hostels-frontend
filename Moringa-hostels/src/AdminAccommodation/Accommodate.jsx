import React, { useEffect, useState } from "react";
import "../App.css"
import NewAccommodate from "./NewAccommodate";
import AccommodateList from "./AccommodateList";
 
function Accommodate(){ 
  const [accommodate,setAccommodate] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/accommodations")
    .then(res => res.json())
    .then(data => {
      setAccommodate(data)
    })
    .catch(err => console.log(err))
  },[])
  
  return(
    <>
    <h1 className="mainH">Accommodations</h1>
     <NewAccommodate accommodate={accommodate} setAccommodate={setAccommodate}/>
     <AccommodateList accommodate={accommodate} setAccommodate={setAccommodate}/>
    </>
  )
}

export default Accommodate;