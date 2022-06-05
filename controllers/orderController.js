const Cart = require("../models/cart");
const User = require("../models/user")
const Order = require("../models/order")
const Delivery = require("../models/delivery")
const ApiError = require('../error/ApiError');
const jwt = require("jsonwebtoken")

class orderController { 

    async createOrder(req, res) {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUsername = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({username: decodedUsername.username})
            const { userId, cartId, deliveryId } = req.body;
            const cart = await Cart.findById(cartId);
            const delivery = await Delivery.findById(deliveryId);
            const orderTotal = cart.subTotal + delivery.price
        
            const order = new Order({userId: userId, cartId: cartId, deliveryId: deliveryId, total: orderTotal})
            await order.save()
            res.status(200).json({message: 'Order created successfully!', order, cart, user, delivery})
        }catch (err) {
            res.status(500).json(err)
        }
    }

    async deleteOrder(req, res) {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUsername = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({username: decodedUsername.username})
            const order = await Order.findById(req.params.id)
            await order.remove()
            res.status(200).json({message: 'order has been canceled!', order, user})
        }catch (err) {
            res.status(500).json(err)
        }
    }





}

module.exports = new orderController()