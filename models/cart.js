const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ItemSchema = new Schema(
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1'],
        max: [30, 'Maximum number of products']
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  );
  module.exports = mongoose.model("item", ItemSchema);
  
  const CartSchema = new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
  
      items: [ItemSchema],
  
      subTotal: {
        default: 0,
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  );
  module.exports = mongoose.model("cart", CartSchema);