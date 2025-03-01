import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="src/assets/images/logo.png" alt="Moringa Hostels" className="h-12" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-800 font-semibold">
          <li><Link to="/home" className="hover:text-blue-500 transition">Home</Link></li>
          <li><Link to="/accommodationUsers" className="hover:text-blue-500 transition">Accommodations</Link></li>
          <li><Link to="/about" className="hover:text-blue-500 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/signup">
            <button className="border-2 border-blue-500 text-blue-500 px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
              Sign Up
            </button>
          </Link>
          
          <Link to="/login">
            <button className="border-2 border-blue-500 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out">
              Log In
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <button className="text-gray-700 text-2xl focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;