import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Tech Store</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-4xl font-extrabold">Welcome to Tech Store!</h2>
        <p className="mt-3 text-lg">Discover the latest gadgets at unbeatable prices.</p>
      </header>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Smartphone", price: "$699", img: "https://via.placeholder.com/300" },
            { name: "Laptop", price: "$999", img: "https://via.placeholder.com/300" },
            { name: "Smartwatch", price: "$199", img: "https://via.placeholder.com/300" },
          ].map((product, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
              <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              <h4 className="text-xl font-semibold mt-4">{product.name}</h4>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>&copy; 2025 Tech Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
