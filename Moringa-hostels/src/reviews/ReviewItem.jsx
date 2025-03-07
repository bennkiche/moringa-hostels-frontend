import { useState } from "react"

function ReviewItem({ review, setReview }) {
  function handleDelete() {
    const token = localStorage.getItem("access_token")

    if (!token) {
      alert("You must be logged in to delete a review.")
      return
    }

    fetch(`https://moringa-hostels-backend.onrender.com/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Unauthorized: You don't have permission to delete this review.")
      }
      return res.json()
    })
    .then(() => {
      setReview(prevReviews => prevReviews.filter(r => r.id !== review.id)) 
      alert("The review has been deleted successfully")
    })
    .catch(err => console.error("Error deleting review:", err))
  }

  return (
    <div className="review-container">
        <div className="review-header">
            <h2 className="review-username">User ID: {review.user_id}</h2>
        </div>
        
        <p className="review-content">{review.content}</p>

        <div className="review-footer">
            <h3 className="review-rating">⭐ Rating: {review.rating}</h3>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
    </div>

  )
}

export default ReviewItem
