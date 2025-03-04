import React, { useEffect, useState } from "react";
import './reviews.css'
import ReviewList from "./ReviewList";
import Navbar from "../components/Navbar";

function Reviews() {
    const [reviews, setReviews] = useState([]);  
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        fetch("http://127.0.0.1:5000/my-reviews", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Unauthorized or no reviews found");
            }
            return res.json();
        })
        .then((data) => {
            setReviews(Array.isArray(data) ? data : []);  
        })
        .catch((err) => console.error("Error fetching user reviews:", err));
    }, [token]);

    return (
        <>
            <Navbar />
            <div>
                <h1>My Reviews</h1>
                <ReviewList reviews={reviews} setReview={setReviews} />
            </div>
        </>
    );
}

export default Reviews;
