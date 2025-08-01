const Product = require("../models/Product");

const createproduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "At least one file is required" });
    }

    const {
      name,
      sku,
      category,
      price,
      originalPrice,
      discountPercent,
      stock,
      isOutOfStock,
      status,
      description,
      sizes,
      material,
      care,
      origin,
      fit,
    } = req.body;

    const imagePaths = req.files.map((file) => file.path);
    const sizesArray = Array.isArray(sizes)
      ? sizes
      : sizes?.split(",").map((s) => s.trim());

    const newProduct = await Product.create({
      name,
      sku,
      category,
      price,
      originalPrice,
      discountPercent,
      stock,
      isOutOfStock: stock == 0,
      status: status || "Active",
      description,
      sizes: sizesArray,
      material,
      care,
      origin,
      fit,
      images: imagePaths,
      sales: 0,
      averageRating: 0,
      reviewCount: 0,
    });

    return res.status(201).json({
      msg: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);

    if (error.code === 11000 && error.keyPattern?.sku) {
      return res.status(409).json({
        msg: `A product with the SKU "${error.keyValue.sku}" already exists.`,
      });
    }

    return res.status(500).json({
      msg: "Failed to create product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    // Extract Fields
    const {
      name,
      sku,
      category,
      price,
      originalPrice,
      discountPercent,
      stock,
      sales,
      isOutOfStock,
      status,
      description,
      sizes,
      material,
      care,
      origin,
      fit,
    } = req.body;

    // Get uploaded file paths
    const uploadedImages =
      req.files?.map((file) => file.path.replace(/\\/g, "/")) || [];

    const removedImages = JSON.parse(req.body.removedImages || "[]");

    const remainingImages = existingProduct.images.filter(
      (img) => !removedImages.includes(img)
    );

    const combinedImages = [...remainingImages, ...uploadedImages];


    const updatedFields = {
      name,
      sku,
      category,
      price,
      originalPrice,
      discountPercent,
      stock,
      sales,
      isOutOfStock,
      status,
      description,
      sizes: Array.isArray(sizes)
        ? sizes
        : sizes?.split(",").map((s) => s.trim()),
      material,
      care,
      origin,
      fit,
      images: combinedImages,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
      ruValidators: true,
    });

    return res
      .status(200)
      .json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    return res
      .status(500)
      .json({ msg: "Failed to update product", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createproduct,
  getAllProducts,
  updateProduct,
  getProductById,
};
