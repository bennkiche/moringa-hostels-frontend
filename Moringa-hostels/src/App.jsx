import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar /> {/* Place Navbar outside Routes if it's always visible */}
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
      <p>Hello Sharon</p>
    </Router>
  );
}

export default App;