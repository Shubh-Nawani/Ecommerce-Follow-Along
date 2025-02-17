const Product = require('../models/productModel')

const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

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

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product Updated Successfully!", product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};




module.exports = { addProduct, updateProduct, deleteProduct };
