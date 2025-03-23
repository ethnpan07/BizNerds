import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { theme } from "./theme";
=======
>>>>>>> origin/cooking-branch

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: Implement your registration logic here
    try {
      // Your sign-up logic
      console.log("Signing up with:", name, email, password);
    } catch (err) {
      setError("Failed to sign up. Please try again.");
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
<<<<<<< HEAD
    <div className={`min-h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(27,135,45,0.2)_100%)] flex items-center justify-center p-4 ${theme.typography.fontFamily}`}>
=======
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(27,135,45,0.2)_100%)] flex items-center justify-center p-4">
>>>>>>> origin/cooking-branch
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[rgb(27,135,45)]">Create Account</h2>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[rgb(27,135,45)] hover:bg-[rgb(22,110,37)] text-white"
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              Sign up with Google
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/SignInPage")}
            className="font-medium text-[rgb(27,135,45)] hover:text-[rgb(22,110,37)]"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
