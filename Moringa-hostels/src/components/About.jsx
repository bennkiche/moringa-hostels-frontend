import React from "react";
import { Link } from "react-router-dom";
import Footer from "../comps/Footer";

const About = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center text-center text-white px-6 py-16"
      style={{ backgroundImage: "url('src/assets/images/New Moringa.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Moringa Hostels</h1>
        <p className="text-lg mb-4">
          Welcome to <strong>Moringa Hostels</strong>, a place where comfort meets convenience. 
          Our hostel is designed to provide students and professionals with a secure, 
          affordable, and vibrant living environment.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
