import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = "user-id"; // Replace with actual user ID (e.g., from auth token or session)

  // Load cart from the backend when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cart/${userId}`);
        setCart(response.data.cart || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  // Save cart to the backend
  const saveCartToDatabase = async (cartItems) => {
    try {
      await axios.post("http://localhost:8000/api/cart/save-cart", {
        userId,
        cartItems,
      });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // Increment product quantity
  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    saveCartToDatabase(updatedCart);
  };

  // Decrement product quantity
  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      saveCartToDatabase(updatedCart);
    }
  };

  // Remove item from cart
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    saveCartToDatabase(updatedCart);
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    ).toFixed(2);
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/checkout", {
        userId,
        cartItems: cart,
      });
      console.log("Checkout successful:", response.data);
      // Optionally clear cart or redirect
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // Handle continue shopping
  const goBackToShopping = () => {
    // Redirect or navigate to the home page or products page
    window.location.href = "/home"; // Or use react-router's `navigate("/home")`
  };

  return loading ? (
    <div>Loading cart...</div>
  ) : (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
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
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-4 mb-4">
                {cart.map((product, index) => (
                  <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
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
                      {/* Quantity controls */}
                      <div className="flex items-center border rounded mr-4">
                        <button
                          onClick={() => decrementQuantity(index)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2">{product.quantity || 1}</span>
                        <button
                          onClick={() => incrementQuantity(index)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="w-20 text-right font-medium">
                        ${((product.price * (product.quantity || 1)).toFixed(2))}
                      </span>

                      {/* Remove button */}
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
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Checkout
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

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>&copy; 2025 Tech Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;
