const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');

// POST /cart/add - Add product to cart
router.post('/add', cartController.addProductToCart);
router.put('/update', cartController.updateProductInCart);
router.delete('/delete', cartController.deleteProductFromCart);
router.get('/', cartController.getCartDetails);

module.exports = router;
