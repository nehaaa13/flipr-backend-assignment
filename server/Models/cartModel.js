const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Assumes a User model
    products: [
        {
            productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' }, // Assumes a Product model
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
