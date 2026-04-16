const express = require("express");
const router = express.Router();

const authLimiter = require("../../middleware/rateLimiter");
const authMiddleware = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

const {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  createAdmin
} = require("../controllers/authController");

router.post("/register", authLimiter, registerUser);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.post("/login", authLimiter, loginUser);

router.post("/refresh-token", refreshToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/create-admin", authMiddleware, isSuperAdmin, createAdmin);

module.exports = router;
