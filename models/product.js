const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  size: {
    type: Array,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    allowNull: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('products', productSchema);
