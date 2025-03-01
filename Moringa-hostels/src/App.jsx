<<<<<<< HEAD
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
import Authentication from './authentications/Authentication'
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
        <Authentication />
        <Contact />
        <Footer />
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccommodationDetails from "./components/AccommodationDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
>>>>>>> ft-odhis
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> ft-odhis
