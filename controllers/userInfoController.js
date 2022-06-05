const User = require("../models/user");
const UserInfo = require("../models/userInfo")
const jwt = require("jsonwebtoken")
const ApiError = require('../error/ApiError');




class userInfoController { 

    // Change user personal information
    async modifyUserInfo(req, res) {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUsername = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({username: decodedUsername.username}) 
            const userInfo = await UserInfo.findById(req.params.id)
            Object.assign(userInfo, req.body);
            userInfo.save()
            res.status(200).json({userInfo, user})
        }catch(err) {
            // return next(ApiError.badRequest)
            res.status(500).json(err)
        }
    }

    // Get user personal information
    async getUserInfo(req,res) {
        try{
            const userInfo = await UserInfo.findById(req.params.id)
            res.status(200).json(userInfo)
        }catch(err) {
        res.status(500).json(err)
        }
    }
}

module.exports = new userInfoController()