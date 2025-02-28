const express = require("express");
const { getProfile, addAddress } = require("../controllers/profileController");

const router = express.Router();

router.get("/", getProfile);

router.post("/add-address", addAddress);

module.exports = router;