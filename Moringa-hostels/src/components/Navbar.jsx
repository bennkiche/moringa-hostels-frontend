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
          <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
          <li><Link to="/accommodations" className="hover:text-blue-500 transition">Accommodations</Link></li>
          <li><Link to="/about" className="hover:text-blue-500 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
            Sign Up
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            Log In
          </button>
        </div>
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-gray-700 text-2xl focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;