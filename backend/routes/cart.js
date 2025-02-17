// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Save or update cart for the user
router.post('/save-cart', async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    // Check if cart already exists for the user

      // Create a new cart
      cart = new Cart({
        userId,
        items: cartItems,
      });
      await cart.save();
    

    res.status(200).json({ message: 'Cart saved successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message});
  }
});

module.exports = router;
