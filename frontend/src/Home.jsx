import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 999.99, image: "/images/laptop.jpg" },
    { id: 2, name: "Smartphone", price: 499.99, image: "/images/smartphone.jpg" },
    { id: 3, name: "Headphones", price: 199.99, image: "/images/headphones.jpg" },
  ]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1; // Increment quantity if product already in cart
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // Add new product to cart
    }
    setCart(updatedCart);
  };

  const goToCart = () => {
    navigate("/cart"); // Navigate to the Cart page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Tech Store</h1>
        <button
          onClick={goToCart}
          className="text-white hover:underline"
        >
          Go to Cart ({cart.length})
        </button>
      </nav>

      {/* Products Section */}
      <div className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover rounded mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">{product.name}</h4>
              <p className="text-gray-600 text-lg mb-4">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
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
