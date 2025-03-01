import React, { useEffect, useState } from "react";
import "../App.css";
import AccommodationList from "./AccomodationList";
import Navbar from "../components/Navbar";
import NavbarUser from "../components/NavbarUser";
 
function AccommodationDetails(){ 
  const [accommodation,setAccommodation] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/accommodations")
    .then(res => res.json())
    .then(data => {
      setAccommodation(data)
    })
    .catch(err => console.log(err))
  },[])
  
  return(
    <>
    <NavbarUser />
    <h1 className="mainH">Accommodations</h1>
     <AccommodationList accommodation={accommodation} setAccommodation={setAccommodation}/>
    </>
  )
}

export default AccommodationDetails;