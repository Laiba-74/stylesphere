const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String, // snapshot
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  shippingInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: "USA" }
  },
  shippingMethod: {
    type: String,
    enum: ["Standard Shipping", "Express Shipping"],
    default: "Standard Shipping"
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  payment: {
    method: { type: String, default: "Card" },
    transactionId: { type: String },
    status: { type: String, enum: ["Paid", "Failed"], default: "Paid" }
  },
  subtotal: Number,
  tax: Number,
  totalAmount: Number,
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default: "Processing"
  },
  estimatedDelivery: String,
  trackingNumber: {
    type: String,
    default: null
  }
}, { timestamps: true });
module.exports = mongoose.model("Order", orderSchema);