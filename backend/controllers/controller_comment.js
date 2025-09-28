const Product = require('../models/Product');
const prisma = require('../prisma/prisma');

const createComment = async (req, res, next) => {
        console.log("receive new commnent");

        try {

            const savedComment = await prisma.comments.create({
                data: req.body
            });

            console.log(savedComment);

            res.status(200)
                .location(`/api/comment/${savedComment.id}`)
                .json(savedComment);

        } catch (err) {
            next(err);
        }
};

const getCommentByProductId = async (req, res, next) => {

    try {

        const foundComments = await prisma.comments.findMany({
            where: {
                //  productId from req.params is validated via middleware
                productId: req.params.productId
            },
            include: {
                // included related User
                author: {
                    select: {
                        username: true,
                    }
                }
            }
        });

        console.log(`send back user commnets in number ${foundComments.length}`);

        res.status(200).json(foundComments);

    } catch (err) {
        next(err);
    }
};

const deleteCommentById = async (req, res, next) => {

    try {
        const deleteComment = await prisma.comments.delete({
            where: {
                id: req.params.commentId
            }
        });

        res.status(200).json(deleteComment);

    } catch (err) {
        next(err);
    }
};

const deleteCommentByUserId = async (req, res, next) => {
    console.log(req.query.authorId);
    console.log(req.query.productId);

    try {
        const deleteComment = await prisma.comments.delete({
            where: {
                authorId: req.query.authorId,
                productId: req.query.productId,
            }
        });

        res.status(200).json(deleteComment);

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createComment,
    getCommentByProductId,
    deleteCommentById,
    deleteCommentByUserId,
}