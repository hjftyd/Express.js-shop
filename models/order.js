const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  deliveryId: {
    type: Schema.Types.ObjectId,
    ref: 'delivery',
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  },
  total: {
    type: Number,
    unique: false,
    required: false,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: false,
    unique: false,
    default: 'Created',
  },
});

module.exports = mongoose.model('order', orderSchema);
