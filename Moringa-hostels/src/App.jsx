import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Accommodations from "./Components/Accommodations"; 
import ContactUs from "./Components/ContactUs"; 


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/contactus" element={<ContactUs />} /> 
      </Routes>
    </>
  );
}

export default App;