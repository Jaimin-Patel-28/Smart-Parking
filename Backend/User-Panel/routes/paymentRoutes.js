const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../../middleware/authMiddleware");

/**
 * Payment Routes
 * All routes require authentication
 */

// Create Razorpay order
router.post("/create-order", authMiddleware, paymentController.createOrder);

// Verify payment signature and credit wallet
router.post("/verify-payment", authMiddleware, paymentController.verifyPayment);

// Get payment status
router.get("/status/:orderId", authMiddleware, paymentController.getStatus);

// Refund payment
router.post("/refund", authMiddleware, paymentController.refund);

// Handle payment failure
router.post("/failed", authMiddleware, paymentController.handleFailure);

module.exports = router;
