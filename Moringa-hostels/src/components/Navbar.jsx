import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for user on component load & whenever localStorage updates
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []); // Runs when user changes

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/home"); // Redirect to home page after logout
  };

  // Determine the correct accommodation route based on user role
  const accommodationRoute = user?.role === "admin" ? "/accommodationAdmin" : "/accommodationUsers";

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
            {user && (
              <>
                <Link to="/profile" className="menu-item">Profile</Link>
                <Link to="/Userbookings" className="menu-item">My Bookings</Link>
                <Link to="/my-reviews" className="menu-item">My Reviews</Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Center Navigation Links */}
      <div className="nav-links">
        <Link to="/home" className="nav-item">Home</Link>
        <Link to={accommodationRoute} className="nav-item">Accommodations</Link> {/* Dynamic accommodation route */}
        <Link to="/reviews" className="nav-item">Reviews</Link>
        <Link to="/available" className="nav-item">Available Rooms</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/contacts" className="nav-item">Contacts</Link>
      </div>

      {/* Authentication Buttons (Log In & Sign Up or Log Out) */}
      <div className="auth-buttons">
        {user ? (
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        ) : (
          <>
            <Link to="/signup" className="signup-button">Sign Up</Link>
            <Link to="/login" className="login-button">Log In</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;