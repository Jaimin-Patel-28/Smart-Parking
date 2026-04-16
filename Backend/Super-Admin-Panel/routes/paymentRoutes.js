const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../../middleware/authMiddleware");
const { isAdmin } = require("../../middleware/roleMiddleware");

/**
 * Admin Payment Routes
 * All routes require authentication and admin role
 */

// Get all payments
router.get("/", authMiddleware, isAdmin, paymentController.getPayments);

// Get payment statistics
router.get(
  "/stats/overview",
  authMiddleware,
  isAdmin,
  paymentController.getPaymentStats
);

// Get user payment history
router.get(
  "/user/:userId",
  authMiddleware,
  isAdmin,
  paymentController.getUserPaymentHistory
);

// Export payments as CSV
router.get(
  "/export/csv",
  authMiddleware,
  isAdmin,
  paymentController.exportPayments
);

// Get specific payment details
router.get(
  "/:paymentId",
  authMiddleware,
  isAdmin,
  paymentController.getPaymentDetail
);

module.exports = router;
