import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccommodationDetails from "./components/AccommodationDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
