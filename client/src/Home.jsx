import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Trash2 } from "lucide-react";
import Nav from "./Nav";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null); // Track which product is being added

  // Initialize cart from localStorage and backend
  useEffect(() => {
    const initializeCart = async () => {
      try {
        // Try to get cart from backend
        const response = await axios.get("http://localhost:8000/api/cart");
        const backendCart = response.data;
        
        // Get cart from localStorage as fallback
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Use backend cart if available, otherwise use localStorage
        setCart(backendCart?.length ? backendCart : localCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
        // Fallback to localStorage if backend fails
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
      }
    };

    initializeCart();
  }, []);

  // Fetch products with proper loading and error states
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update cart in both localStorage and backend
  const updateCart = async (newCart) => {
    try {
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      await axios.put("http://localhost:8000/api/cart", { cart: newCart });
    } catch (error) {
      console.error("Error updating cart:", error);
      // Keep the local update even if backend fails
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts((prevProducts) => 
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setAddingToCart(product._id);
      setError(null);

      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex(item => item._id === product._id);
      
      let updatedCart;
      if (existingItemIndex !== -1) {
        // If product exists, increment its quantity
        updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
        };
      } else {
        // If it's a new product, add it with quantity 1
        const productWithQuantity = {
          ...product,
          quantity: 1
        };
        updatedCart = [...cart, productWithQuantity];
      }
      
      // Update cart in both localStorage and backend
      await updateCart(updatedCart);

      // Show success message
      const quantity = existingItemIndex !== -1 ? 
        updatedCart[existingItemIndex].quantity : 1;
      showNotification(`Added ${product.name} (Quantity: ${quantity})`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart(null);
    }
  };

  // Simple notification system
  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav cart={cart} />

      {/* Hero Section */}
      <header className="text-center py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-4xl font-extrabold">Welcome to Tech Store!</h2>
        <p className="mt-3 text-lg">Discover the latest gadgets at unbeatable prices.</p>
      </header>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-6 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        </div>
      )}

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
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product._id}
                    className={`bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 ${
                      addingToCart === product._id ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {addingToCart === product._id ? 'Adding...' : 'Add to Cart'}
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
            <div className="col-span-full text-center text-gray-600">
              <p className="text-xl">No products available</p>
              <p className="mt-2">Check back later for new items!</p>
            </div>
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