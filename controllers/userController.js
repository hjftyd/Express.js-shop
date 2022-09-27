const User = require('../models/user');
const Admin = require('../models/admin');
const Cart = require('../models/cart');
const Order = require('../models/order');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Generate user token
const generateJwt = (id, roles, username, email) => {
  const payload = {
    id,
    roles,
    username,
    email,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '31d' });
};

class userController {
  // User registration
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Registration error', errors));
      }
      const { username, email, password } = req.body;

      const checkUserEmail = await User.findOne({ email });
      if (checkUserEmail) {
        return next(ApiError.badRequest('User with this email already exists'));
      }

      const checkUserName = await User.findOne({ username });
      if (checkUserName) {
        return next(ApiError.badRequest('User with the same name already exists'));
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, email, password: hashPassword });
      const cart = await Cart.create({ userId: user.id });
      user.save();
      return res.status(200).json({ message: 'User successfully registered' });
    } catch (e) {
      return next(ApiError.badRequest);
    }
  }

  // User login
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return next(ApiError.internal('User not found'));
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return next(ApiError.internal('Wrong password'));
      }
      const token = generateJwt(user._id, user.role, user.username, user.email);
      res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest);
    }
  }

  // User can change all of his personal information
  async modify(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedEmail = jwt.verify(token, process.env.SECRET_KEY);
      const emailFind = await User.findOne({ email: decodedEmail.email });
      const userChange = req.body;
      console.log(userChange.personals);
      console.log(userChange.password);
      if (await userChange.password) {
        userChange.password = bcrypt.hashSync(userChange.password, 7);
      }
      console.log(userChange.password);
      Object.assign(emailFind, userChange);
      emailFind.save();
      res.status(200).json(emailFind);
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // Delete user account
  async delete(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedEmail = jwt.verify(token, process.env.SECRET_KEY);
      const emailValidation = await User.findOne({ email: decodedEmail.email });
      await emailValidation.remove();
      res.status(200).json({ message: 'User has been deleted' });
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // User profile
  async profile(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
      const emailValidation = await User.findOne({ email: decodedInfo.email });
      const usernameValidation = await Admin.findOne({ username: decodedInfo.username });
      if (!emailValidation && !usernameValidation) {
        return next(ApiError.badRequest('Could not find user'));
      }
      res.status(200).json({ emailValidation, usernameValidation });
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // User can add personal information
  async addInformation(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedUsername = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ username: decodedUsername.username });
      let data = null;
      user.personals.push(req.body);
      data = await user.save();
      return res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new userController();
