const productModel = require("../Models/productModel");

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Validate input data
        if (!name || !description || !price || !category) {
            return res.status(400).json("All fields are required.");
        }

        if (typeof price !== "number" || price <= 0) {
            return res.status(400).json("Price should be a positive number.");
        }

        // Create a new product instance
        const newProduct = new productModel({
            name,
            description,
            price,
            category
        });

        // Save the product to the database
        await newProduct.save();

        // Return success message with the product ID
        res.status(200).json({ message: "Product added successfully!", productId: newProduct._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add product." });
    }
};

//Update Product

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        Object.keys(updates).forEach((key) => {
            product[key] = updates[key];
        });

        await product.save();
        res.json({ message: "Product updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating product.", error });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        // Check if the product exists
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Delete the product
        await productModel.findByIdAndDelete(productId);

        // Send success response
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product.", error: error.message });
    }
};


module.exports = { addProduct, updateProduct, deleteProduct };
