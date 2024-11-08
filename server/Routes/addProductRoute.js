// Routes/productRoute.js
const express = require("express");
const { addProduct } = require("../Controllers/productController");

const router = express.Router();

// Route to add a product
router.post("/addproduct", addProduct);

module.exports = router;
