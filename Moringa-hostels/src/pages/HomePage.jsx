import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AccommodationList from "../components/AccommodationList";

const HomePage = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  // Fetch accommodations from the backend
  useEffect(() => {
    fetch("http://localhost:5000/accommodations")
      .then((res) => res.json())
      .then((data) => {
        setAccommodations(data);
        setFilteredAccommodations(data);
      })
      .catch((error) => console.error("Error fetching accommodations:", error));
  }, []);

  // Handle search functionality
  const handleSearch = ({ location, checkIn, checkOut, guests }) => {
    const filtered = accommodations.filter((acc) => 
      acc.location.toLowerCase().includes(location.toLowerCase()) &&
      acc.maxGuests >= guests
    );
    setFilteredAccommodations(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Find Your Perfect Stay</h1>
      <SearchBar onSearch={handleSearch} />
      <AccommodationList accommodations={filteredAccommodations} />
    </div>
  );
};

export default HomePage;
