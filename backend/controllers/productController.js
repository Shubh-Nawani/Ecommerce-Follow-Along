const Product = require('../models/productModel')

const addProduct = async (req, res) => {
    try {
        const {name, price, description} = req.body

        const newProduct = new Product({
            name,
            price,
            description
        });

        await newProduct.save()
        return res.status(201).json({message: "Product Added Successfully!"})

    } catch (err) {
        return res.status(500).json({error: err.message})
    }

}

module.exports = {addProduct}