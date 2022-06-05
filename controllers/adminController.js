const Admin = require("../models/admin");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const ApiError = require('../error/ApiError');

// generate jwt token
const generateAdminToken = (id, username, role ) => {
    return jwt.sign(
        {id, username, role,},
        process.env.SECRET_KEY,
        {expiresIn: '31d'}
    )
}

class adminController{

    // Admin login
    async login(req, res, next){
        try {
                const {username, password} = req.body
                const admin = await Admin.findOne({username})
                if(!admin){
                    return next(ApiError.badRequest('Administrator not found!'))
                }
                const validPassword = bcrypt.compareSync(password, admin.password)
                if (!validPassword){
                    return next(ApiError.badRequest('Wrong password'))
                }
                const token = generateAdminToken(admin._id, admin.username, admin.role,)
                return res.json({token})
            }catch (e) {
                return next(ApiError.badRequest)
        }
    }

    // Add new admin
    async addAdmin(req, res, next){
        try{
            const {username, password, role} = req.body
            if (!username || !password) {
                return next(ApiError.badRequest('Incorrect Username or Password'))
            }
            const admins = await Admin.findOne({username})
            if (admins){
                return res.status(400).json({message: 'Administrator with the same name already exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const admin = new Admin({username, password: hashPassword, role})
            admin.save()
            return res.status(200).json({message: 'Administrator successfully registered'})
        }catch (e) {
            return next(ApiError.badRequest)
        }
    }

    // Delete user by id
    async delete(req, res, next){
        try{
            const user = await User.findById(req.params.id)
            await user.remove()
            res.status(200).json({message: 'User deleted'})
        }catch (e) {
            return next(ApiError.badRequest)
        }
    }

    // List of all users
    async users(req, res, next){
        try {
            const users = await User.find({})
            res.status(200).json(users)
        }catch (e) {
            return next(ApiError.badRequest)
        }
    }

    // Change user by id
    async userModify(req, res, next){
        try{
            const user = await User.findById(req.params.id)
            Object.assign(user, req.body)
            user.save()
            res.status(200).json(user)
        } catch (e) {
            return next(ApiError.badRequest)
        }
    }

    // Get user by id
    async userId(req,res, next){
        try{
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        }catch (e) {
            return next(ApiError.badRequest)
        }
    }
}

module.exports = new adminController()
