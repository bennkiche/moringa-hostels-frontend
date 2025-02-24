import React from "react"

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Find Your Perfect Stay</h1>
        <p>Discover amazing accommodations in stunning destinations.</p>
      </header>
      
      <section className="featured-accommodations">
        <h2>Featured Accommodations</h2>
        <div className="accommodation-list">
          <div className="accommodation-item">Luxury Beach Resort</div>
          <div className="accommodation-item">Cozy Mountain Cabin</div>
          <div className="accommodation-item">City Center Apartment</div>
        </div>
      </section>
      
      <section className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destination-list">
          <div className="destination-item">Paris, France</div>
          <div className="destination-item">Kyoto, Japan</div>
          <div className="destination-item">New York, USA</div>
        </div>
      </section>
    </div>
  );
};

export default Home;