import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [students, setStudents] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, StartDate, EndDate, guests });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex space-x-2">
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={StartDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={EndDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        min="1"
        value={students}
        onChange={(e) => setStudents(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
