import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import About from "./components/About"
import Accommodations from "./components/Accommodations";
import Contact from "./components/Contact";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/contact" element={<Contact />} />
        

      </Routes>
    </Router>
  );
}

export default App;