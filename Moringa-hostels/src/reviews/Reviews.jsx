import React, { useEffect, useState } from "react";
import "./reviews.css";
import ReviewList from "./ReviewList";
import Navbar from "../components/Navbar";

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/reviews") 
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch reviews");
                }
                return res.json();
            })
            .then((data) => {
                setReviews(Array.isArray(data) ? data : []);
            })
            .catch((err) => console.error("Error fetching reviews:", err));
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h1>All Reviews</h1>
                <ReviewList reviews={reviews} setReview={setReviews} />
            </div>
        </>
    );
}

export default Reviews;
