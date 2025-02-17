import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleCheckout = () => {
    // Handle checkout logic here
    alert("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Tech Store</h1>
      </nav>

      {/* Cart Section */}
      <div className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Your Cart</h3>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-4">
                {cart.map((product, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{product.name}</span>
                    <span>${product.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <button
                  onClick={handleCheckout}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Your cart is empty</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>&copy; 2025 Tech Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
