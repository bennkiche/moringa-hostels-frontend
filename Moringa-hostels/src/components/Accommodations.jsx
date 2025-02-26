import React from "react";

const accommodations = [
  {
    id: 1,
    name: "Deluxe Single Room",
    image: "/assets/Images/single-room.jpg",
    price: "$250/month",
    description: "A private and cozy room with modern furnishings, high-speed Wi-Fi, and a study desk.",
  },
  {
    id: 2,
    name: "Shared Double Room",
    image: "/assets/Images/double-room.jpg",
    price: "$180/month per person",
    description: "An affordable shared room with ample space, personal wardrobes, and comfortable beds.",
  },
  {
    id: 3,
    name: "Studio Apartment",
    image: "/assets/Images/studio-apartment.jpg",
    price: "$400/month",
    description: "A fully furnished self-contained studio with a kitchen and a private bathroom.",
  },
];

const destinations = [
  {
    id: 1,
    name: "Moringa Campus",
    image: "/assets/Images/moringa-campus.jpg",
    description: "Located just minutes away from Moringa School, making it an ideal choice for students.",
  },
  {
    id: 2,
    name: "Nairobi CBD",
    image: "/assets/Images/nairobi-cbd.jpg",
    description: "A vibrant area with easy access to malls, restaurants, and entertainment spots.",
  },
];

const Accommodations = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Featured Accommodations */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Featured Accommodations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {accommodations.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-56 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">{room.name}</h3>
                <p className="text-gray-600 mt-2">{room.description}</p>
                <p className="text-blue-500 font-bold mt-4">{room.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Destinations */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mt-16 mb-10">Popular Destinations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {destinations.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={place.image} alt={place.name} className="w-full h-56 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">{place.name}</h3>
                <p className="text-gray-600 mt-2">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accommodations;
