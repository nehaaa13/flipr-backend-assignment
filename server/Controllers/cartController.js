const Cart = require('../Models/cartModel');
const Product = require('../Models/productModel'); // Ensure correct path to Product model

// Add Product to Cart
const addProductToCart = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        // Check for missing parameters
        if (!customerId || !productId || !quantity) {
            return res.status(400).json({ success: false, message: "Missing required fields: customerId, productId, and quantity." });
        }

        // Validate quantity
        if (quantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive integer." });
        }

        console.log("Checking if product exists...");

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Invalid product ID." });
        }

        console.log("Finding cart or creating new cart for customer...");

        // Find or create the cart for the customer
        let cart = await Cart.findOne({ customerId });
        if (!cart) {
            cart = new Cart({ customerId, products: [] });
        }

        console.log("Checking if product is already in the cart...");

        // Check if product is already in the cart
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);

        if (existingProductIndex !== -1) {
            // Product already in cart, update the quantity
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.products.push({ productId, quantity });
        }

        console.log("Saving the updated cart...");

        // Save the updated cart
        await cart.save();

        console.log("Cart updated successfully.");

        // Return success message and updated cart details
        res.status(200).json({ success: true, message: "Product added to cart successfully.", cart });
    } catch (error) {
        console.error("Error in addProductToCart:", error);
        res.status(500).json({ success: false, message: "An error occurred while adding the product to the cart." });
    }
};

module.exports = { addProductToCart };
