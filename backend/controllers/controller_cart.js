
const prisma = require('../prisma/prisma');



const getCartByUserId = async (req, res, next) => {
    try {
        // Old
        //  const Carts = await Cart.find({ userId : req.params.id});

         const Carts = await prisma.carts.findMany({
            where: {
                userId: req.params.id
            }
        });


         if (!Carts) {
             res.status(404).json({error : 'Cart not found for this user'});
             return
         }

        res.status(200).json(Carts);
 
     } catch (error) {

        next(error);
     }
}

const getAllCart = async (req, res, next) => {
    try {  
        const carts = await prisma.carts.findMany();
        
        res.status(200).json(carts);

    } catch (error) {
        next(error);
    }
}

const createCartController = async (req, res, next) => {

    try {
        // const savedCart = await Cart.create(req.body);

        const savedCart = await prisma.carts.create({
            data: req.body
        });

        res.status(200)
            .location(`/api/cart/${savedCart.id}`)
            .json(savedCart);

    } catch (error) {
        next(error);
    }

}

const updateCartController = async (req, res, next) => {
    
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            {userId : req.params.id},
            { $set : req.body },
            { new : true }
        );
        
        console.log('update successful:')
        res.status(200).json({...updatedCart._doc, message:"update sucessful"});

    } catch (error) {
        next(error);
    }

}

const deleteCartByIdController = async (req, res) => {
    try {
         const deletedCart = await Cart.findByIdAndDelete(req.params.id);
         res.status(200).json(deletedCart);
 
     } catch (error) {
         res.status(500).json(error);       
     }
}


module.exports = {
    getCartByUserIdController: getCartByUserId,
    getAllCartController: getAllCart,
    createCartController, 
    updateCartController,
    deleteCartByIdController

}