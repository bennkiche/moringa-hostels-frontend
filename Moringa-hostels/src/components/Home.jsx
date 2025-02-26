import React from "react";

const Home = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url(/assets/Images/moringa-hostel.jpg)" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Moringa Hostels</h1>
          <p className="text-lg md:text-xl mb-6">Your home away from home.</p>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
