const express = require("express");
const {getProducts, addProduct, updateProduct, deleteProduct} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", addProduct);
router.put("/products", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
