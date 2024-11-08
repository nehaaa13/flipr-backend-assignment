const express = require("express");
const router = express.Router();
const { deleteProduct } = require("../Controllers/productController");

// Delete product route
router.delete("/deleteproduct/:productId", deleteProduct);

module.exports = router;
