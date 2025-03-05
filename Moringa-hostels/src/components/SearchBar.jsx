import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search Icon

const SearchBar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [accommodation, setAccommodation] = useState("");

  const handleSearch = () => {
    setIsOpen(false); // Close dropdown on search
    onSearch({ searchTerm, price, roomType, accommodation });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search Bar */}
      <div
        className="flex items-center bg-white shadow-md rounded-full p-3 cursor-pointer w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 text-gray-600">
          {searchTerm ? searchTerm : "Search hostels..."}
        </span>
        <FaSearch className="text-gray-500" />
      </div>

      {/* Dropdown (Opens when clicking search bar) */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-4">
          <input
            type="text"
            placeholder="Search by location or accommodation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            placeholder="Max Price"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="shared">Shared</option>
          </select>
          <input
            type="text"
            placeholder="Accommodation Name"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
