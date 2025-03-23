import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import InfoDump from "./InfoDump";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/InfoDump" element={<InfoDump />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;