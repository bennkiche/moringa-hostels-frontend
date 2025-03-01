import React from "react";
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import About from "./components/About"
import Accommodations from "./components/Accommodations";
import Contact from "./components/Contact";
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import "./index.css";



function App() {
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodations" element={<Accommodations/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Contact />
        <Footer />
      </Routes>
    </Router>
  );
}

export default App;