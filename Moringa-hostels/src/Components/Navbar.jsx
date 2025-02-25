import React from "react";
import { Link } from "react-router-dom";
import "/src/index.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        {/* Logo */}
        <div className="logo">
          <img src="/logo.png" alt="Moringa Hostels" />
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/accommodations">Accommodations</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        {/* Buttons */}
        <div className="nav-buttons">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;