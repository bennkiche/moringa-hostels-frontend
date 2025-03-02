import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg py-4 fixed w-full top-0 z-50 border-b">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center py-2">
          <a href="https://moringaschool.com">
            <img
              src="https://moringaschool.com/wp-content/themes/moringa/public/images/logo.png"
              alt="Moringa School logo"
              className="h-12 sm:h-12 w-auto"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-10 text-gray-800 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/accommodations" className="hover:text-blue-500 transition">
              Accommodations
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Buttons (Sign Up and Log In) */}
        <div className="hidden lg:flex space-x-4">
          <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
            Sign Up
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            Log In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="text-gray-700 text-2xl focus:outline-none">☰</button>
        </div>
      </div>

      {/* News Ticker (optional section, you can add it inside navbar or outside depending on your design preference) */}
      <div className="news-ticker bg-primary py-2">
        <div className="ms-container-p-0 text-center text-xs text-white font-light">
          <div
            className="splide ms-splide light-splide splide--loop splide--ltr splide--draggable is-active is-overflow is-initialized"
            data-count="1"
            data-arrows="false"
            data-type="loop"
            data-autoplay="true"
            data-dots="false"
            data-mobiledots="false"
            data-interval="10000"
            id="splide01"
            role="region"
            aria-roledescription="carousel"
          >
            <div className="splide_track splidetrack--loop splidetrack--ltr splide_track--draggable" id="splide01-track">
              <ul className="splide__list flex items-center" id="splide01-list" role="presentation">
                <li className="splide__slide is-active" role="group" aria-roledescription="slide">
                  <p className="text-center">
                    <b>New Course Alert!</b> Introducing UI/UX Design for Beginners –{" "}
                    <a href="/courses/ui-ux-foundations-for-product-design/" className="text-white">
                      Learn More
                    </a>
                  </p>
                </li>
                <li className="splide__slide is-next" role="group" aria-roledescription="slide">
                  <p className="text-center">
                    Stay <strong>up to date</strong> with our Community News!{" "}
                    <a href="/blog/" className="text-white">
                      Moringa Community
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
