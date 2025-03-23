import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import InfoDump from "./InfoDump";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Profiler from "./Profiler";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/InfoDump" element={<InfoDump />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/Profiler" element={<Profiler />} />
      </Routes>
    </Router>
  );
}

export default App;