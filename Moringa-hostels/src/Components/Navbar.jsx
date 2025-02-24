import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/accommodations">Accommodations</Link></li>
        
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;