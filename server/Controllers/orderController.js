// orderController.js
const Order = require('../Models/orderModel');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');

// Get all orders with pagination and optional filtering by date range or order status
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate, orderStatus } = req.query;

    // Build filter object based on provided query params
    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate("customerId", "name email") // Populate customer details
      .populate("products.productId", "name price") // Populate product details
      .exec();

    // Get the total number of orders to calculate total pages
    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching orders." });
  }
};


// Get Orders by Customer ID
const getOrdersByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { page = 1, limit = 10 } = req.query;  // Pagination

        // Validate customerId
        if (!customerId) {
            return res.status(400).json({ success: false, message: "Customer ID is required." });
        }

        // Check if customer exists (optional)
        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found." });
        }

        // Fetch orders for the specified customer with pagination
        const orders = await Order.find({ customerId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('products.productId', 'name price')  // Populate product details
            .populate('customerId', 'name email');  // Populate customer details if needed

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this customer." });
        }

        // Calculate pagination details
        const totalOrders = await Order.countDocuments({ customerId });
        const totalPages = Math.ceil(totalOrders / limit);

        // Return the response
        res.status(200).json({
            success: true,
            orders,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalOrders,
            },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching orders." });
    }
};
module.exports = { getAllOrders, getOrdersByCustomerId };
