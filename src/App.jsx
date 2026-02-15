import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import HotelDetails from "./pages/HotelDetails.jsx";
import Admin from "./pages/Admin.jsx";
import { HotelProvider } from "./context/HotelContext.jsx";

function App() {
  return (
    // Step 1: Wrap everything in the Provider
    <HotelProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            {/* Step 2: Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />

            {/* Step 3: Admin Secret Route */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </HotelProvider>
  );
}

export default App;
