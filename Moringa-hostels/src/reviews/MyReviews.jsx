import React, { useEffect, useState } from "react";
import ReviewList from "./ReviewList";

function MyReviews() {
    const [review, setReview] = useState([]);
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
            setReview(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error("Error fetching user reviews:", err));
    }, [token]);

    return (
        <div>
            <h1>My Reviews</h1>
            <ReviewList review={review} setReview={setReview} />
        </div>
    );
}

export default MyReviews;
