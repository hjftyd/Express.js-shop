const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  building: {
    type: Number,
    required: true,
  },
  apartment: {
    type: Number,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('personal', personalSchema);

const userSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  personals: [personalSchema],

  role: {
    type: String,
    default: 'USER',
  },
});

module.exports = mongoose.model('user', userSchema);
