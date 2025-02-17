// /routes/profileRoutes.js
const express = require("express");
const { getProfile, addAddress } = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected route to fetch profile data
router.get("/", getProfile);

// Protected route to add address
router.post("/add-address", addAddress);

module.exports = router;
