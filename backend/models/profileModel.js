// /models/profileModel.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  addresses: [String], // Array of addresses
});

module.exports = mongoose.model("Profile", profileSchema);
