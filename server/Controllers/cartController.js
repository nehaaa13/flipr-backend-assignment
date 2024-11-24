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

// Update Product Quantity in Cart
const updateProductInCart = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        // Check for missing parameters
        if (!customerId || !productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: customerId, productId, and quantity."
            });
        }

        // Validate that quantity is a non-negative integer
        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a non-negative integer."
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Invalid product ID - product not found."
            });
        }

        // Check if the customer’s cart exists
        let cart = await Cart.findOne({ customerId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found for this customer."
            });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in the cart."
            });
        }

        // Check available stock for the product
        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Only ${product.stock} items available.`,
            });
        }

        if (quantity === 0) {
            // Remove product from cart if quantity is set to zero
            cart.products.splice(productIndex, 1);
        } else {
            // Update the product quantity in the cart
            cart.products[productIndex].quantity = quantity;
        }

        // Save the updated cart
        await cart.save();

        // Return success message and updated cart details
        res.status(200).json({
            success: true,
            message: "Cart updated successfully.",
            cart
        });
    } catch (error) {
        console.error("Error in updateProductInCart:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the cart.",
            error: error.message // Optional for debugging
        });
    }
};

// Delete Product from Cart
const deleteProductFromCart = async (req, res) => {
    try {
        const { customerId, productId } = req.body;

        // Validate presence of customerId and productId
        if (!customerId || !productId) {
            return res.status(400).json({ success: false, message: "Missing required fields: customerId and productId." });
        }

        // Find the customer's cart
        const cart = await Cart.findOne({ customerId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found for this customer." });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in the cart." });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();

        // Return success message and updated cart details
        res.status(200).json({ success: true, message: "Product removed from cart successfully.", cart });
    } catch (error) {
        console.error("Error in deleteProductFromCart:", error);
        res.status(500).json({ success: false, message: "An error occurred while removing the product from the cart." });
    }
};

// Get Cart Details
const getCartDetails = async (req, res) => {
    try {
        const { customerId } = req.query;

        // Validate customerId
        if (!customerId) {
            return res.status(400).json({ success: false, message: "Customer ID is required." });
        }

        // Find the customer's cart
        const cart = await Cart.findOne({ customerId }).populate('products.productId', 'name description price');
        
        if (!cart || cart.products.length === 0) {
            return res.status(200).json({ success: true, message: "Cart is empty.", cart: [] });
        }

        // Calculate total amount
        let totalAmount = 0;
        const cartDetails = cart.products.map(item => {
            const { name, description, price } = item.productId;
            const quantity = item.quantity;
            const itemTotal = price * quantity;
            totalAmount += itemTotal;

            return {
                productId: item.productId._id,
                name,
                description,
                price,
                quantity,
                itemTotal
            };
        });

        // Return cart details with total amount
        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully.",
            cart: cartDetails,
            totalAmount
        });
    } catch (error) {
        console.error("Error in getCartDetails:", error);
        res.status(500).json({ success: false, message: "An error occurred while retrieving the cart." });
    }
};

module.exports = { addProductToCart, updateProductInCart, deleteProductFromCart, getCartDetails };
