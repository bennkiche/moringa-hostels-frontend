import React, { useEffect, useState } from "react";
import "../App.css";
import NewAccommodate from "./NewAccommodate";
import AccommodateList from "./AccommodateList";
import NavbarUser from "../components/NavbarUser";

function Accommodate() { 
    const [accommodate, setAccommodate] = useState([]);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        fetch("http://127.0.0.1:5000/accommodations", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Unauthorized or failed to fetch accommodations");
            }
            return res.json();
        })
        .then((data) => {
            setAccommodate(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error("Error fetching accommodations:", err));
    }, [token]); // Depend on `token` so it updates if changed

    return (
        <>
            <NavbarUser />
            <h1 className="mainH">Accommodations</h1>
            <NewAccommodate accommodate={accommodate} setAccommodate={setAccommodate} />
            <AccommodateList accommodate={accommodate} setAccommodate={setAccommodate} />
        </>
    );
}

export default Accommodate;
