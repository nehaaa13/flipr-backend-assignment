const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, minlength: 2, maxlength: 500 },
    price: { type: Number, required: true, minlength: 1, maxlength:10000000 },
    category: { type: String, required: true, minlength: 3, maxlength: 50 }
}, {
    timestamps: true,
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
