const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send(products);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({error: "Please provide all fields!"});
        };

        const newProduct = new Product({
            name,
            price,
            description
        });

        await newProduct.save();

        return res.status(201).json({ message: "Product Added Successfully!" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id, name, price, description } = req.body;

        if (!id || !name || !price) {
            return res.status(400).json({error: "Please check the constraints!"});
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        };

        return res.status(200).json({ message: "Product Updated Successfully!", product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({error: "Please provide ID!"});
        };

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
