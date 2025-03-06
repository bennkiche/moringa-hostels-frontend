import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="relative w-full bg-sky-100">
      {/* <NavbarUser /> */}
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 min-h-screen"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1733266939892-d27b5370c4c3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Moringa Hostels
        </h1>
        <p className="text-lg md:text-xl mb-6">Your home away from home.</p>
      </div>

      {/* Information Section */}
      <div className="max-w-5xl mx-auto mt-8 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-700">
          Moringa Hostel provides a comfortable and convenient living space for
          students and professionals. Enjoy top-notch facilities, a great
          community, and a safe environment.
        </p>
      </div>

      {/* Image Cards Section */}
      <div className="max-w-6xl mx-auto py-12 grid gap-6 md:grid-cols-3 px-4">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="src/assets/images/Spacious rooms.avif"
            alt="Hostel Room"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Spacious Rooms</h3>
            <p className="text-gray-600">
              Enjoy comfortable, well-furnished rooms with modern amenities.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="src/assets/images/Common area.webp"
            alt="Common Area"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Relaxing Common Areas</h3>
            <p className="text-gray-600">
              Connect with fellow residents in our cozy and stylish lounges.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="src/assets/images/Dinning images.jpg"
            alt="Dining Area"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Quality Dining</h3>
            <p className="text-gray-600">
              Enjoy delicious and nutritious meals prepared with care.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Moringa Hostel. All Rights Reserved.</p>
      </footer>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;