import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn, UserPlus } from "lucide-react";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => setIsSignup(!isSignup);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const endpoint = isSignup ? "http://localhost:8000/api/users/signup" : "http://localhost:8000/api/users/login";
      await axios.post(endpoint, formData, { withCredentials: true });

      // Redirect to home page after success
      navigate("/home");
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            {isSignup ? "Sign up to get started" : "Sign in to continue"}
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 px-4 text-white font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignup ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle Between Signup & Signin */}
        <div className="text-center mt-4 text-sm">
          <span className="text-gray-600">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button onClick={toggleForm} className="font-medium text-indigo-600 hover:underline">
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
