// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { register, login, getCurrentUser, checkusertoken, updateUserProfile, 
    // forgotPassword, resetPassword 
} = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

// @route   POST /api/auth/register
router.post("/register", register);

// @route   POST /api/auth/login
router.post("/login", login);

// @route   GET /api/auth/user/:id
router.get("/user/:id", verifyToken, getCurrentUser);

router.get("/user", verifyToken, checkusertoken);

router.put("/update/:id", verifyToken, upload.single("avatar"), updateUserProfile);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

module.exports = router; 
