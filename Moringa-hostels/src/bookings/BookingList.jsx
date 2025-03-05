import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/Userbookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching bookings");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched bookings:", data); 
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, [token]);

  const handleCancelBooking = (id) => {
    fetch(`http://127.0.0.1:5000/bookings/${id}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error canceling booking");
        }
        return response.json();
      })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id ? { ...booking, status: "canceled" } : booking
          )
        );
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      <div>
        {bookings.length === 0 ? (
          <p>No bookings found!</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={booking.room_image || "https://via.placeholder.com/300"}
                alt={`Room ${booking.room_id}`}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p><strong>Room:</strong> {booking.room_id}</p>
              <p><strong>Description:</strong> {booking.room_description || "No description available"}</p>
              <p><strong>Price:</strong> ${booking.room_price} per month</p>
              <p><strong>Status:</strong> {booking.status}</p>
              
              <p>
                <strong>Start Date:</strong>{" "}
                {booking.start_date ? new Date(booking.start_date).toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {booking.end_date ? new Date(booking.end_date).toLocaleString() : "N/A"}
              </p>

              <button onClick={() => navigate(`/bookings/${booking.id}`)}>
                View Details
              </button>

              {booking.status !== "canceled" && (
                <button onClick={() => handleCancelBooking(booking.id)}>
                  Cancel Booking
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;
