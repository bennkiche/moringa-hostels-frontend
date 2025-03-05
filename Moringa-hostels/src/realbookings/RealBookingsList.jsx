import RealBookingsItems from "./RealBookingsItems";

function RealBookingsList({ bookings, setBookings }) {
  return (
    <div id="container">
      {bookings.length > 0 ? bookings.map(booking => (
        <RealBookingsItems 
          key={booking.id}
          id={booking.id}
          user_id={booking.user_id}
          accommodation_id={booking.accommodation_id}
          room_id={booking.room_id}
          start_date={booking.start_date}
          end_date={booking.end_date}
          status={booking.status}
          bookings={bookings} 
          setBookings={setBookings}
        />
      )) : <p>No bookings found.</p>}
    </div>
  );
}

export default RealBookingsList;
