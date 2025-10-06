const router = require('express').Router();
const { param } = require('express-validator');
const { getProductById, getAllProduct, createProduct, updateProduct, deleteProduct, searchProductByTitle,
    getUserFavoriteProduct, getProductsByCategory
} = require('../controllers/controller_prod');
const {checkToken, checkAdmin, checkIdentity} = require('../middleware/checkToken');
const { dataValidator } = require('../middleware/dataValidator');
const { productValidator } = require('../validator/validator');


// // CREATE PRODUCT - Admin Only
router.post('/',
    productValidator, dataValidator,
    checkToken, checkAdmin,
    createProduct);

// // GET ALL PRODUCTS - PUBLIC
router.get('/all', getAllProduct);



// Search Product by Title
router.get('/search/query', searchProductByTitle);

// get user favorite products
router.get('/favorite/:userId', getUserFavoriteProduct);


// // GET PRODUCTS BY CATEGORY - PUBLIC
router.get('/category', getProductsByCategory);

// // GET ONE PRODUCT BY ID - PUBLIC
router.get('/:id', [param('id', 'unvalid id').isMongoId()], dataValidator, getProductById);

// // UPDATE PRODUCT - Admin only
router.put('/:id', 
    [param('id', 'unvalid id').isMongoId()], productValidator, dataValidator,
    checkToken, checkAdmin, 
    updateProduct );

// // DELETE PRODUCT - Admin Only
router.delete('/:id', [param('id', 'unvalid id').isMongoId()], dataValidator, deleteProduct);


module.exports = router;