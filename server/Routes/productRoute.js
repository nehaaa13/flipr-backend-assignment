const express = require('express');
const router = express.Router();
const productModel = require('../Models/productModel'); // Your Product model path


//get Product
router.get('/products', async (req, res) => {
    try {
        const products = await productModel.find();
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

//update product

router.put("/updateproduct/:productId", async (req, res) => {
    const { productId } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        res.json({
            message: "Product updated successfully.",
            product: updatedProduct
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Error updating product.",
            error: error.message || error
        });
    }
});
module.exports = router;
