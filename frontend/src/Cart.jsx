import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load cart from both backend and localStorage
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        // Try to get cart from backend first
        const response = await axios.get("/api/cart");
        const backendCart = response.data.cart;
        
        // Get cart from localStorage as fallback
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Use backend cart if available, otherwise use localStorage
        const finalCart = backendCart?.length ? backendCart : localCart;
        setCart(finalCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
        // Fallback to localStorage if backend fails
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Debounced cart update function
  const updateCart = async (updatedCart) => {
    try {
      setError(null);
      // Update local state and localStorage immediately
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      // Update backend
      await axios.put("/api/cart", { cart: updatedCart });
    } catch (error) {
      setError("Failed to update cart. Please try again.");
      console.error("Error updating cart:", error);
    }
  };

  const incrementQuantity = async (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    await updateCart(updatedCart);
  };

  const decrementQuantity = async (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      await updateCart(updatedCart);
    }
  };

  const removeItem = async (index) => {
    try {
      setError(null);
      const updatedCart = cart.filter((_, i) => i !== index);
      await updateCart(updatedCart);
      
      // If cart is empty, clear localStorage
      if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
      }
    } catch (error) {
      setError("Failed to remove item. Please try again.");
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      setError(null);
      
      navigate("/billingDetails");
    } catch (error) {
      setError("Unable to proceed to checkout. Please try again.");
      console.error("Error during checkout:", error);
    }
  };

  const goBackToShopping = () => {
    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Tech Store</h1>
        <button
          onClick={goBackToShopping}
          className="text-white hover:underline"
        >
          Continue Shopping
        </button>
      </nav>

      {/* Cart Section */}
      <div className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Your Cart</h3>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-lg">
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-4 mb-4">
                {cart.map((product, index) => (
                  <li key={product.id || index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
                    <div className="flex items-center">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                      )}
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>

                    <div className="flex items-center mt-2 sm:mt-0">
                      <div className="flex items-center border rounded mr-4">
                        <button
                          onClick={() => decrementQuantity(index)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2">{product.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(index)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="w-20 text-right font-medium">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeItem(index)}
                        className="ml-4 text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold">${calculateTotal()}</span>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handleCheckout}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <button
                onClick={goBackToShopping}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>&copy; 2025 Tech Store. All rights reserved.</p>
      </footer>
    </div>
  );
}