
const Product = require("../models/productModel.js")

const addProduct = async (req, res) => {
    try {
        const { productName, description, price, stock, category} = req.body
        const newProduct = new Product({
            productName,
            description,
            price, 
            stock,
            category
        })

        await newProduct.save()
        res.send("Product created successfully")
    } catch (err) {
        res.status(500).send("Internal Server Error!")
    }
}

module.exports = addProduct