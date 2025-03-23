import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const resp = await axios.post("/signup", { name, email, password });
      setMsg(resp.data.message || "Sign-up successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Sign-up failed. Please try again.");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // TODO: Implement Google sign-up logic
      console.log("Signing up with Google");
    } catch (err) {
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div>
          <h2 className="title">Create Account</h2>
          <p className="subtitle">Sign up to get started</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {msg && <div className="success-message">{msg}</div>}

        <form onSubmit={handleSignUp} className="form-group">
          <div>
            <label className="label-text">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="input-field"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label-text">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="google-button"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
          />
          Sign up with Google
        </button>

        <p className="signin-text">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/SignInPage")}
            className="signin-link"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
