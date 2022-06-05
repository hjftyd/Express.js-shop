const Cart = require('../models/cart');
const User = require('../models/user');
const Product = require('../models/product');
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError');


class cartController { 

    // User can add items to cart and change quantity
    async addItemToCart(req,res, next) {
        
        const token = req.headers.authorization.split(' ')[1]
        const decodedUsername = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({username: decodedUsername.username}) 
        const { userId, productId } = req.body;

        const quantity = Number.parseInt(req.body.quantity);
            try{
        let cart = await Cart.findOne({ userId: userId}); 

        const productDetails = await Product.findById(productId);
        // console.log("productDetails", productDetails)

        //- Check if cart exists and Check the quantity of item 
        if (cart){
            let indexFound = cart.items.findIndex(p => p.productId == productId);
            console.log('Index', indexFound)

            // Check if product exist, then add the previous quantity with the new quantity and update the total price
            if (indexFound != -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr);
            }
            
            // Check if quantity is greater than 0, then add item to items array
            else if (quantity > 0) {
                cart.items.push({ 
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity).toFixed(2),
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr);
            }
            
            // If quantity 0 throw the error
            else {
               return res.status(400).json({message: 'Quantity can not be less then 1'})
            } 
            await cart.save();
        }
        return res.status(200).json({cart, user, productDetails})
        }catch (err) {
            res.status(500).json(err)
        }
    }

    // Get user cart by id
    async getUserCart(req,res) {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUsername = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({username: decodedUsername.username}) 
            const cart = await Cart.findById(req.params.id)
            const products = await Product.find()
            res.status(200).json(cart, user, products)
        }catch(err) {
        res.status(500).json(err)
        }
    }

    // Empty user cart by id
    async emptyCart(req,res) {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUsername = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({username: decodedUsername.username})
            const cart = await Cart.findById(req.params.id);
            cart.items = [];
            cart.subTotal = 0
            await cart.save();
            res.status(200).json({message: "Cart Has been emptied", cart, user})
        }catch(err) {
            res.status(500).json(err)
        }
    }

}

module.exports = new cartController()