const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, uppercase: true },
    category: {
      type: String,
      required: true,
      enum: ['Outerwear', 'Shirts', 'Bottoms', 'Dresses', 'Casual', 'Tops', 'Accessories']
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: null },
    discountPercent: { type: Number, default: 0 },
    stock: { type: Number, required: true, min: 0 },
    sales: { type: Number, default: 0 },
    isOutOfStock: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Active", "Out of Stock", "Low Stock"],
      default: "Active"
    },
    description: { type: String, required: true },
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    material: { type: String, trim: true },
    care: { type: String, trim: true },
    origin: { type: String, trim: true },
    fit: { type: String, trim: true },
    images: {
      type: [String],
      default: []
    },
    averageRating: {
      type: Number,
      default: 0
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
