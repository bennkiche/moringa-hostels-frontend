import React, { useEffect, useState } from "react";
import "./accommodations.css";
import NavbarUser from "../components/NavbarUser";
import AccommodationList from "./AccommodationList";

function AccommodationDetails() { 
  const [accommodation, setAccommodation] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/accommodations")
      .then(res => res.json())
      .then(data => {
        setAccommodation(Array.isArray(data) ? data : []);
      })
      .catch(err => console.log("Error fetching accommodations:", err));
  }, []);

  return (
    <>
      {/* <NavbarUser /> */}
      <h1 className="mainH">Accommodations</h1>
      <AccommodationList accommodation={accommodation} setAccommodation={setAccommodation} />
    </>
  );
}

export default AccommodationDetails;
