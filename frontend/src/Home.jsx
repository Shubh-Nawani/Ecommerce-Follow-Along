import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Trash2 } from "lucide-react";
import Nav from "./Nav"; // Import the Nav component

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  // Fetch products from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLogout = () => {
    // Handle logout logic
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)); // Functional state update
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = (product) => {
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item._id === product._id);
    
    let updatedCart;
    if (existingItemIndex !== -1) {
      // If product exists, increment its quantity
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // If it's a new product, add it with quantity 1
      const productWithQuantity = {
        ...product,
        quantity: 1
      };
      updatedCart = [...cart, productWithQuantity];
    }
    
    // Update state with the new cart
    setCart(updatedCart);
    alert(`${product.name} has been added to the cart!`); // Confirmation message
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav cart={cart} /> {/* Pass cart state to Nav component */}

      {/* Hero Section */}
      <header className="text-center py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-4xl font-extrabold">Welcome to Tech Store!</h2>
        <p className="mt-3 text-lg">Discover the latest gadgets at unbeatable prices.</p>
      </header>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="text-xl font-semibold mt-4">{product.name}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">${product.price}</p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleAddToCart(product)} // Add to cart functionality with alert
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products available</p>
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
