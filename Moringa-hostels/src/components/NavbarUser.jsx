import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const NavbarUser = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage or API if needed
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login"); 
    };

    return (
        <nav className="bg-white shadow-lg py-4 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="https://pbs.twimg.com/profile_images/1489569110040141826/ZzZgytR8_400x400.png" alt="Moringa Hostels" className="h-12 w-auto" />
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex gap-x-10 text-gray-800 font-semibold">
                    <li><Link to="/home" className="hover:text-blue-500 transition">Home</Link></li>
                    <li><Link to="/accommodationUsers" className="hover:text-blue-500 transition">Accommodations</Link></li>
                    <li><Link to="/about" className="hover:text-blue-500 transition">About</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-500 transition">Contact</Link></li>

                    {token && (
                      <li>
                          <button 
                              onClick={handleLogout} 
                              className="hover:text-red-500 transition font-semibold"
                          >
                              Log Out
                          </button>
                      </li>
                      )}
                </ul>

                <div className="md:hidden">
                    <button className="text-gray-700 text-2xl focus:outline-none">☰</button>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser