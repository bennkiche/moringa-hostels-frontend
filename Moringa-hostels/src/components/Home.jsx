import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (filters) => {
    const { searchTerm, price, roomType, accommodation } = filters;
    const queryParams = new URLSearchParams();

    if (searchTerm) queryParams.append("location", searchTerm);
    if (price) queryParams.append("price", price);
    if (roomType) queryParams.append("room_type", roomType);
    if (accommodation) queryParams.append("accommodation", accommodation);

    try {
      const response = await fetch(
        `http://localhost:5000/api/accommodations?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch accommodations");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  return (
    <div className="relative w-full bg-sky-100">
      {/* Navbar */}
      {/* <Navbar /> */}
      
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

        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {searchResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {searchResults.map((accommodation) => (
              <div
                key={accommodation.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={accommodation.image_url}
                  alt={accommodation.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{accommodation.name}</h3>
                  <p className="text-gray-600">{accommodation.location}</p>
                  <p className="text-gray-700 font-semibold">
                    ${accommodation.price} per night
                  </p>
                  <p className="text-sm text-gray-500">{accommodation.room_type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">No accommodations found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
