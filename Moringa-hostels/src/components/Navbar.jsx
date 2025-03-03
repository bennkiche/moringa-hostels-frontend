import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage or API
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <nav className="navbar">
      {/* Hamburger Menu */}
      <div className="menu-container">
        <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
          <Menu size={28} />
        </button>
        {isOpen && (
          <div className="menu-dropdown">
            <div className="menu-item user-info">
              {user ? (
                <div>
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                </div>
              ) : (
                <p>Not logged in</p>
              )}
            </div>
            <Link to="/profile" className="menu-item">Profile</Link>
            <Link to="/bookings" className="menu-item">My Bookings</Link>
            <Link to="/my-reviews" className="menu-item">My Reviews</Link>
          </div>
        )}
      </div>
      
      {/* Center Navigation Links */}
      <div className="nav-links">
        <Link to="/home" className="nav-item">Home</Link>
        <Link to="/accommodationUsers" className="nav-item">Accommodations</Link>
        <Link to="/reviews" className="nav-item">Reviews</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/contacts" className="nav-item">Contacts</Link>
      </div>
      
      {/* Right-Side Authentication Buttons */}
      <div className="auth-buttons">
        <Link to="/signup" className="signup-button">Sign Up</Link>
        <Link to="/login" className="login-button">Log In</Link>
      </div>
    </nav>
  );
}
