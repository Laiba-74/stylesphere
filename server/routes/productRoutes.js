const express = require("express");
const router = express.Router();
const multer = require("multer")
const { createproduct, getAllProducts, updateProduct, getProductById } = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

// Create Product
router.post("/create", upload.array("files", 5), createproduct);
// Get All Product
router.get('/get', getAllProducts);
// Update Product
router.put("/edit/:id", upload.array("images", 5), updateProduct)

router.get("/:id", upload.array("images", 5), getProductById)
module.exports = router;
