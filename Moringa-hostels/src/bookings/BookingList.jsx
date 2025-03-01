import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleCancelBooking = (id) => {
    fetch(`http://127.0.0.1:5000/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error canceling booking");
        }
        setBookings(bookings.filter((booking) => booking.id !== id));
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
            <div key={booking.id}>
              <p>Room: {booking.room_id}</p>
              <p>Start Date: {new Date(booking.start_date).toLocaleString()}</p>
              <p>End Date: {new Date(booking.end_date).toLocaleString()}</p>
              <button onClick={() => navigate(`/bookings/${booking.id}`)}>View Details</button>
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;
