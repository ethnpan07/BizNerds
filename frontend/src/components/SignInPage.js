import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignInPage.css';

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const resp = await axios.post(
        "http://127.0.0.1:5000/login",
        { email, password },
        { withCredentials: true }
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Please sign in to your account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSignIn} className="form-group">
          <div>
            <label className="label-text">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={() => navigate("/SignUpPage")} className="signup-link">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
