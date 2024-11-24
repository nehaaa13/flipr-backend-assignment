const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true },
        }
    ],
    orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    shippingAddress: { type: String, required: true },
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
