const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: { type: Number, required: true, min: 1 },
      priceAtTime: { type: Number, required: true } // capture price at time of adding to cart
    }
  ],
  subtotal: { type: Number, required: true },
  shippingCharges: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true }
});
module.exports = mongoose.model("Cart", cartSchema);