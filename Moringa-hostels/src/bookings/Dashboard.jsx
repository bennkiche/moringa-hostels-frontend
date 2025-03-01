// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get user profile info
//     fetch('http://localhost:3000/api/user/profile', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         setUserInfo(data);
//       })
//       .catch(error => {
//         console.error('Error fetching user info:', error);
//       });

//     // Get user bookings
//     fetch('http://localhost:3000/api/user/bookings', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching bookings:', error);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {userInfo.name}</h1>
//       <h2>Your Profile</h2>
//       <p>Email: {userInfo.email}</p>
//       <p>Phone: {userInfo.phone}</p>
//       <p>Location: {userInfo.location}</p>

//       <h2>Your Bookings</h2>
//       {bookings.length > 0 ? (
//         <ul>
//           {bookings.map((booking, index) => (
//             <li key={index}>
//               <p>Hostel: {booking.hostelName}</p>
//               <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
//               <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//               <p>Status: {booking.status}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No bookings found</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
