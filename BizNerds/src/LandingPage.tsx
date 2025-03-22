import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/InfoDump")}>Go to InfoDump Page</button>
    </div>
  );
}

export default LandingPage;