import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id, room_no, room_type, accommodation_id, price } = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const validateBooking = () => {
    const token = localStorage.getItem("access_token");

    return fetch("http://127.0.0.1:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        accommodation_id,
        room_id,
        start_date: startDate.replace("T", " "),
        end_date: endDate.replace("T", " "),
      }),
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          alert(result.error || "Booking validation failed.");
          return result.error; // Return error if validation fails
        }

        return null; // No errors, booking is valid
      })
      .catch((err) => {
        alert("An unexpected error occurred. Please try again.");
        return err.message;
      });
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please fill in both Start Date and End Date.");
      return;
    }

    validateBooking().then((validationError) => {
      if (validationError) {
        return; // Stop if there's an error
      }

      alert("✅ Booking is valid! Proceeding to Mpesa payment...");

      navigate("/mpesa", {
        state: {
          amount: price,
          accommodation_id,
          room_id,
          start_date: startDate.replace("T", " "),
          end_date: endDate.replace("T", " "),
        },
      });
    });
  };

  return (
    <div className="booking-form-container">
      <h2>Book Room</h2>
      <form onSubmit={handleConfirm}>
        <div>
          <label className="bookingLabel">Room Type</label><br />
          <input type="text" value={room_type || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Room Number</label><br />
          <input type="text" value={room_no || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Accommodation ID</label><br />
          <input type="text" value={accommodation_id || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Price (KSH)</label><br />
          <input type="text" value={price || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Start Date</label><br />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="bookingLabel">End Date</label><br />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
