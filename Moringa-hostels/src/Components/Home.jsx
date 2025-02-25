import React from "react";
import { Link } from "react-router-dom"; 


const Home = () => {
  
  const featuredAccommodations = [
    {
      id: 1,
      name: "Imani Apartment in Ngong",
      location: "Nairobi, Kenya",
      price: "7500/semester",
      image: "https://via.placeholder.com/300x20",
    },
    {
      id: 2,
      name: "Cozy Studio Ngong road",
      location: "Nairobi, Kenya",
      price: "8000/semester",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Spacious Villa in Lenana",
      location: "Nairobi, Kenya",
      price: "11000/semester",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  
  const popularDestinations = [
    {
      id: 1,
      name: "Nairobi",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Mombasa",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Kisumu",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="home-container">
      
      <header className="hero-section">
        <h1>Moringa-hostels</h1>
        <p>Discover amazing accommodations in stunning destinations.</p>
        <Link to="/search" className="cta-button">
          Search Accommodations
        </Link>
      </header>

      <section className="featured-accommodations">
        <h2>Featured Accommodations</h2>
        <div className="accommodation-list">
          {featuredAccommodations.map((accommodation) => (
            <div key={accommodation.id} className="accommodation-item">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="accommodation-image"
              />
              <h3>{accommodation.name}</h3>
              <p>{accommodation.location}</p>
              <p>{accommodation.price}</p>
              <Link to={`/accommodation/${accommodation.id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      
      <section className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destination-list">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="destination-item">
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
              />
              <h3>{destination.name}</h3>
              <Link to={`/search?location=${destination.name}`} className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;