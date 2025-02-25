import React from "react";
import { Link } from "react-router-dom";
import "/src/index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Moringa Hostels" />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/accommodations">Accommodations</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <div className="nav-buttons">
        <button className="login-btn">Log In</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;