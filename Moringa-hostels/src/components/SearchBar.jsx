import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search Icon

const SearchBar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [students, setStudents] = useState(1);

  const handleSearch = () => {
    setIsOpen(false); // Close dropdown on search
    onSearch({ location, startDate, endDate, students });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search Bar */}
      <div
        className="flex items-center bg-white shadow-md rounded-full p-3 cursor-pointer w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 text-gray-600">
          {location ? location : "Search hostels..."}
        </span>
        <FaSearch className="text-gray-500" />
      </div>

      {/* Dropdown (Opens when clicking search bar) */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            min="1"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
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
