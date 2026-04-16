const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");
const authMiddleware = require("../../middleware/authMiddleware");

/**
 * Webhook Routes
 * Note: Webhook endpoint does NOT require authentication (Razorpay initiates the request)
 */

// Razorpay webhook - processes payment events
// This endpoint is called by Razorpay servers (not from client)
router.post("/webhook", (req, res, next) => {
  // No auth needed for webhooks - Razorpay verifies via signature
  webhookController.handleWebhook(req, res).catch((error) => {
    console.error("Webhook handler error:", error);
    res.status(200).json({ success: false, error: error.message });
  });
});

// Webhook health check (for monitoring)
router.get("/webhook/health", webhookController.webhookHealth);

module.exports = router;
