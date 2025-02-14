const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

module.exports = router;
