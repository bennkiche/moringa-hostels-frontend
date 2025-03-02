import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarUser = () => {
  // State to handle mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed w-full top-0 z-50 border-b">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center py-2">
          <Link to="/home">
            <img
              src="/src/assets/images/logo.png"
              alt="Moringa Hostels"
              className="h-8 sm:h-10"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-x-8 text-gray-800 font-medium">
          <li>
            <Link to="/home" className="hover:text-blue-500 transition">Home</Link>
          </li>
          <li>
            <Link to="/accommodationUsers" className="hover:text-blue-500 transition">Accommodations</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`absolute top-16 left-0 w-full bg-white shadow-lg transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"} md:hidden`}>
        <ul className="flex flex-col text-gray-800 text-center py-4">
          <li className="py-2">
            <Link to="/home" onClick={closeMobileMenu} className="hover:text-blue-500 transition">Home</Link>
          </li>
          <li className="py-2">
            <Link to="/accommodationUsers" onClick={closeMobileMenu} className="hover:text-blue-500 transition">Accommodations</Link>
          </li>
          <li className="py-2">
            <Link to="/about" onClick={closeMobileMenu} className="hover:text-blue-500 transition">About</Link>
          </li>
          <li className="py-2">
            <Link to="/contact" onClick={closeMobileMenu} className="hover:text-blue-500 transition">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarUser;
