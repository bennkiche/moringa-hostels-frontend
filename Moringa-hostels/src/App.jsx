import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css"; // Keep styling in index.css

function App() {
  return (
    <Router>
      <Navbar />
    </Router>
  );
}

export default App;