const Product = require("../models/product");
const ApiError = require('../error/ApiError');

class productController {
    async allProducts(req, res, next) {
        try {
            const product = await Product.find()
            res.status(200).json({message: "list of all products", product})
        }catch (err) {
            return next(ApiError.badRequest)
        }
    }

    async currentProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json({message: "kek", product})
        }catch (err) {
            return next(ApiError.badRequest)
        }
    }

    async modifyProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
            Object.assign(product, req.body);
            product.save()
            res.status(200).json(product)
        }catch (err) {
            return next(ApiError.badRequest)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
            await product.remove()
            res.status(200).json(product)
        }catch (err) {
            return next(ApiError.badRequest)
        }
    }

    async newProduct(req, res, next) {
        try {
            // const {name, description, size, color, price, quantity, tag, category, status} = req.body
            // const {image} = req.files
            // const fileName = uuid.v4() + ".jpg"
            // await image.mv(path.resolve(__dirname, '..', 'static', fileName))
            // const product = new Product({name, description, size, color, price, category, status, quantity, tag, image: fileName})
            // const savedProduct = await product.save()
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        } catch (err) {
            return next(ApiError.badRequest)
        }
    }

    async categoryProduct(req,res, next) {
        try {
            const categories = req.query.category;
            const products = await Product.find({"category": categories}) 
            res.status(200).json(products)
        }catch (err) {
            return next(ApiError.badRequest) 
        }
    }

}

module.exports = new productController()