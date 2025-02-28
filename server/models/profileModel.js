const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true,
    ref: 'User' },
    
  addresses: {
    type: [String],
    required: true
  } 
});

module.exports = mongoose.model("Profile", profileSchema);
