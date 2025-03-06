import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim()); // Pass search input
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search by name, price, or room type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
      />
      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
