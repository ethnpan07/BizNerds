import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import InfoDump from "./InfoDump";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/InfoDump" element={<InfoDump />} />
      </Routes>
    </Router>
  );
}

export default App;