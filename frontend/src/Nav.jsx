import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Nav({ cart, userName }) {  // Accept cart and userName as props
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data (for example, token, user info from local storage)
    localStorage.removeItem("authToken"); // Example: Removing the auth token
    localStorage.removeItem("user"); // Removing the user's name or info
    navigate("/"); // Redirect to the login page (or home)
  };

  return (
    <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Tech Store</h1>
      <div className="flex space-x-6">
        <Link to="/home" className="hover:text-gray-300">Home</Link>
        <Link to="/add-product" className="hover:text-gray-300">Add Product</Link>
        <Link to="/cart" className="hover:text-gray-300">
          Cart ({cart.length})
        </Link>
        
        {userName && (
          <span className="text-white">Welcome, {userName}</span> // Display userName if logged in
        )}

        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
