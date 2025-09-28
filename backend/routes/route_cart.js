const router = require('express').Router();
exports.router = router;
const { createCartController, updateCartController, getAllCartController, deleteCartByIdController, getCartByUserIdController } = require('../controllers/controller_cart');
const {checkToken, checkAdmin, checkIdentity} = require('../middleware/checkToken');
const { dataValidator } = require('../middleware/dataValidator');
const { cartValidator } = require('../validator/validator');

// GET ALL  BY ADMIN
router.get('/', checkToken, checkAdmin, getAllCartController);

// GET CART BY USER ID
router.get('/find/:id', getCartByUserIdController);

// CREATE USER CART 
// :id => user ID
router.post('/:id', cartValidator, dataValidator, checkToken, checkIdentity, createCartController );

// Update User Cart
//
router.put('/:id', cartValidator, dataValidator, checkToken, checkIdentity, updateCartController);


// DELETE by CART ID
router.delete('/:id', checkToken, checkIdentity, deleteCartByIdController);


module.exports = router;