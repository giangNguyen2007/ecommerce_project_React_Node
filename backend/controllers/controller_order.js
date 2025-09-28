const Order = require('../models/Order');

const createOrder = async (req, res, next) => {

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200)
            .location(`/api/order/${savedOrder._id}`)
            .json(savedOrder);

    } catch (error) {
        next(error);
    }
};

const getOrdersByUserId = async (req, res, next) => {

    try {
        const orders = await Order.find({ userID: req.params.id });

        if (!orders) {
            res.status(404).json({ error: 'Orders not found for this user' });
            return;
        }

        res.status(200).json(orders);


    } catch (error) {
        next(error);
    }
};

const getAllOrders = async (req, res, next) => {

    const qCategory = req.query.category;
    let products;

    try {

        if (qCategory) {
            products = await Product.find({
                categories: { $in: [qCategory] }
            });

        } else {
            products = await Product.find();
        }

        res.status(200).json(products);

    } catch (error) {
        next(error);
    }
};

const updateOrderById = async (req, res, next) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        res.status(200).json({ ...updatedOrder._doc, message: "update sucessful" });

    } catch (error) {
        next(error);
    }
};

const deleteOrderById = async (req, res, next) => {

    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        res.status(200).json(deletedOrder);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByUserId,
    updateOrderById,
    deleteOrderById
}