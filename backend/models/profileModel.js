// /models/profileModel.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  addresses: [String], // Array of addresses
});

module.exports = mongoose.model("Profile", profileSchema);
