
const prisma = require('../prisma/prisma');


// POST /api/product
// admin only
const createProduct = async (req, res, next) => {

    try {
        const savedProduct = await prisma.products.create({
            data: req.body
        });

        res.status(201)
            .location(`/api/product/${savedProduct.id}`)
            .json(savedProduct);

    } catch (error) {
        next(error);
    }
}


// GET /api/product/:id
// public
const getProductById = async (req, res, next) => {
    
    // return product with count of total comments
    try {
         const product = await prisma.products.findUnique({
            where : {
                id : req.params.id,
            },

            // prisma Relation query - select specific relation field
            include: {
                comments : {
                    select: {
                        rating: true
                    }
                }
            }
         })

        console.log(product)

        if (!product) {
            res.status(404).json({error : 'Product not found'});
            return;
        }
        res.status(200).json(product);
 
        } catch (error) {
            next(error)
        }
}

// route : query
// GET /api/product/search/query?title=value
const searchProductByTitle = async (req, res, next) => {
    const searchValue = req.query.title;
    console.log(searchValue);

    try {
        const products = await prisma.products.findMany({
            where : {
                title : {
                    contains : searchValue,
                }
            },
            include: {
                comments : {
                    select: {
                        rating: true
                    }
                }
            }
        })

        console.log(products);

        if (!products) { 
            res.status(404).json({error: 'Product not found'});
            return;
        }

        res.status(200).json(products);

    } catch (error) {
        next(error);
    }
}



// GET ALL FAVORITE PRODUCT OF USER
// GET /api/product/favorite/:userId
const getUserFavoriteProduct = async (req, res, next) => {

    if (!req.params.userId) {
        res.status(404).json({error : 'UserId param not found'});
        return;
    }

    try {
        const products = await prisma.users.findMany({
            where : {
                favorByUserIds : req.params.userId,
            }
        })
        console.log(products);

        if (!products) { 
            res.status(404).json({error: 'Product not found'});
            return;
        }

        res.status(200).json(products);

    } catch (error) {
        next(error)
    }
}


// get all products
// GET /api/product/all
const getAllProduct = async (req, res, next) => {

    let products;

    try {

        products = await prisma.products.findMany();


        if (!products) {
            res.status(404).json({error : 'Products not found'});
            return;
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json(error);       
    }
}

// get Product By Category
// GET /api/product/category?category=value
const getProductsByCategory = async (req, res, next) => {

    const qCategory = req.query.category;

    if (!qCategory) {
        res.status(404).json({error : 'Category query not found'});
        return;
    }

    let products;

    try {

        products = await prisma.products.findMany({
            where : {
                categories: {
                    has : qCategory,
                }
            },

            // @prisma Relation query - select specific relation field
            include: {
                comments : {
                    select: {
                        rating: true
                    }
                }
            }
        })

        if (!products) {
            res.status(404).json({error : 'Products not found'});
            return;
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json(error);
    }
}

const updateProduct = async (req, res, next) => {
    
    try {

        const updatedProduct = await prisma.products.update({
            where : {
                id : req.params.id,
            },
            data: req.body,
        })

        if (!updatedProduct) {
            res.status(404).json({error: 'Product not found'});
            return;
        }
        
        res.status(200).json({...updatedProduct._doc, message:"update successful"});

    } catch (error) {
        next(error)
    }
}

// delete products and its related comments
// by cascading deletion in prisma
const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await prisma.products.delete({
            where : {
                id : req.params.id,
            },
        })

        if (!deletedProduct) {
            res.status(404).json({error: 'Product not found'});
            return;
        }

        // delete all related product comments
        const deletedComments = await prisma.comments.delete({
            where : {
                productId : req.params.id,
            },
        })

        res.status(200).json({...deletedProduct, message:"product deleted"});
 
     } catch (error) {
        next(error)
     }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductsByCategory,
    getProductById,
    deleteProduct,
    updateProduct,
    searchProductByTitle,
    getUserFavoriteProduct
}