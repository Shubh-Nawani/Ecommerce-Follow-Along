const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        
    },

    price: {
        type: Number,
        required: true

    },

    stock: {
        type: Number
    },

    category: {
        type: String

    }
})

module.exports = mongoose.model("Product", productSchema)