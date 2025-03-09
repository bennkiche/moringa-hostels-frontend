import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id, room_no, room_type, accommodation_id, price } = location.state || {};

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch booked dates for this room
    fetch(`http://127.0.0.1:5000/rooms/${room_id}/booked-dates`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.booked_dates) {
          const disabledRanges = data.booked_dates.map(({ start_date, end_date }) => ({
            start: new Date(start_date),
            end: new Date(end_date),
          }));
          setBookedDates(disabledRanges);
        }
      })
      .catch((err) => console.error("Error fetching booked dates:", err));
  }, [room_id, navigate]);

  const isDateDisabled = (date) => {
    return bookedDates.some(({ start, end }) => date >= start && date <= end);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both Start Date and End Date.");
      return;
    }

    const minDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    if (new Date(endDate) - new Date(startDate) < minDuration) {
      alert("Booking must be at least 30 days!");
      return;
    }

    alert("✅ Booking is valid! Proceeding to Mpesa payment...");

    navigate("/mpesa", {
      state: {
        amount: price,
        accommodation_id,
        room_id,
        start_date: startDate.toISOString().slice(0, 16).replace("T", " "),
        end_date: endDate.toISOString().slice(0, 16).replace("T", " "),
      },
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
          {/* <label className="bookingLabel">Accommodation ID</label><br /> */}
          <input type="hidden" value={accommodation_id || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Price (KSH)</label><br />
          <input type="text" value={price || ""} readOnly />
        </div>
        <div>
          <label className="bookingLabel">Start Date</label><br />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            filterDate={(date) => !isDateDisabled(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="bookingLabel">End Date</label><br />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000) : null}
            filterDate={(date) => !isDateDisabled(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
