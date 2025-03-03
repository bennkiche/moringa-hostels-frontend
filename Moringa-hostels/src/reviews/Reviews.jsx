import React, { useEffect, useState } from "react";
import "./Reviews.css";
import ReviewList from "./ReviewList";
import NewReview from "./NewReviews";
import Navbar from "../components/Navbar"

function Reviews() { 
    const [review, setReview] = useState([]);
    const [userId, setUserId] = useState(null); // ✅ State for user ID
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        // ✅ Fetch user details to get the `userId`
        fetch("http://127.0.0.1:5000/users", { // Assuming an endpoint to get user details
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch user details");
            return res.json();
        })
        .then(userData => setUserId(userData.id)) // ✅ Set userId
        .catch(err => console.error("Error fetching user:", err));

        // ✅ Fetch reviews
        fetch("http://127.0.0.1:5000/reviews", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized or failed to fetch reviews");
            return res.json();
        })
        .then(data => {
            setReview(Array.isArray(data) ? data : []); // ✅ Fix `setRoom` → `setReview`
        })
        .catch(err => console.error("Error fetching reviews:", err));
    }, [token]);

    return (
        <>
            <Navbar />
            <h1 className="roomH">Rooms</h1>
            {userId && <NewReview review={review} setReview={setReview} token={token} userId={userId} />} 
            <ReviewList reviews={review} setReview={setReview} />
        </>
    );
}

export default Reviews;
