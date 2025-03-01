import React, { useState } from "react";

const BookingForm = ({ roomId, closeForm }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Start and End dates are required");
      return;
    }

    const bookingData = {
      room_id: roomId,
      user_id: user.id, // Change this to the actual logged-in user
      start_date: startDate.replace("T", " "),
      end_date: endDate.replace("T", " "),
      status: "confirmed"
    };

    fetch("http://127.0.0.1:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    })
      .then((response) => response.json())
      .then(() => {
        alert("Booking successful!");
        closeForm(); 
      })
      .catch(async (error) => {
        const errorMessage = await error.json();
        setError(errorMessage.error || "Error booking room");
      });
  };

  return (
    <div>
      <h2>Book Room</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={closeForm}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
