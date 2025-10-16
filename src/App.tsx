import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./styles/tailwind.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
