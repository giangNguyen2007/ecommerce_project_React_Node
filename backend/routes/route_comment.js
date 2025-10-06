const router = require('express').Router();
exports.router = router;
const {checkToken, checkAdmin, checkIdentity} = require('../middleware/checkToken');
const CryptoJS = require('crypto-js');
const prisma = require('../prisma/prisma');
const { createComment, getCommentByProductId, deleteCommentByUserId, deleteCommentById } = require('../controllers/controller_comment');
const { deleteCartByIdController } = require('../controllers/controller_cart');
const { dataValidator } = require('../middleware/dataValidator');
const { param } = require('express-validator');

// Create comments
router.post('/', createComment);

// get comments by productId
router.get('/:productId', [param('productId', 'unvalid id').isMongoId()], dataValidator, getCommentByProductId);

// delete comment by commentId
router.delete('/:commentId', [param('commentId', 'unvalid id').isMongoId()], dataValidator, deleteCommentById);

// delete comment by userId && productId
router.delete('/query', deleteCommentByUserId);

module.exports = router;


