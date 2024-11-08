const express = require("express");
const { updateProduct } = require("../Controllers/productController");
const router = express.Router();

router.put("/updateproduct/:productId", updateProduct);

module.exports = router;
