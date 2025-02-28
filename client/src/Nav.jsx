import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Home, PlusCircle, MapPin, LogOut, User } from "lucide-react";

export default function Nav({ cart, userName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsMenuOpen(false);
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/home", icon: <Home className="w-5 h-5" /> },
    { name: "Add Product", path: "/add-product", icon: <PlusCircle className="w-5 h-5" /> },
    { 
      name: `Cart (${cart.length})`, 
      path: "/cart", 
      icon: <ShoppingCart className="w-5 h-5" /> 
    },
    { name: "Address", path: "/address-form", icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center">
              <h1 className="text-2xl font-bold">Tech Store</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            {/* User Section */}
            <div className="flex items-center space-x-4 ml-4">
              {userName && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{userName}</span>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-2 text-white hover:bg-indigo-700 block px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Mobile User Section */}
          <div className="border-t border-indigo-700 pt-2 mt-2">
            {userName && (
              <div className="flex items-center space-x-2 px-3 py-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{userName}</span>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full text-left text-white hover:bg-red-600 px-3 py-2 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}