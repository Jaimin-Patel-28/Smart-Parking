const crypto = require("crypto");
const paymentService = require("../Services/paymentService");
const { sendNotification } = require("../../Shared/services/notification.service");
const Payment = require("../../Super-Admin-Panel/models/Payment");
const AuditTrail = require("../../Super-Admin-Panel/models/AuditTrail");

/**
 * Verify webhook signature from Razorpay
 * @param {object} body - Request body
 * @param {string} signature - X-Razorpay-Signature header
 * @returns {boolean} - Signature is valid
 */
const verifyWebhookSignature = (body, signature) => {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET)
      .update(JSON.stringify(body))
      .digest("hex");

    return expectedSignature === signature;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return false;
  }
};

/**
 * Handle Razorpay webhook events
 * POST /api/payment/webhook
 *
 * Webhook events handled:
 * - payment.captured
 * - payment.failed
 * - order.paid
 */
const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body;

    console.log("Webhook received:", body.event);

    // Verify signature
    if (!verifyWebhookSignature(body, signature)) {
      console.error("Invalid webhook signature");
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const event = body.event;
    const eventData = body.payload?.payment || body.payload?.order || {};

    // Log webhook event for audit trail
    await logWebhookEvent(event, eventData);

    // Handle different events
    switch (event) {
      case "payment.captured":
        await handlePaymentCaptured(eventData);
        break;

      case "payment.failed":
        await handlePaymentFailed(eventData);
        break;

      case "order.paid":
        await handleOrderPaid(eventData);
        break;

      case "payment.authorized":
        await handlePaymentAuthorized(eventData);
        break;

      default:
        console.log("Unknown webhook event:", event);
    }

    // Always return 200 to acknowledge receipt
    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    // Return 200 to prevent Razorpay from retrying
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Handle payment.captured event
 * This is the main event for successful payments
 */
const handlePaymentCaptured = async (eventData) => {
  try {
    const { id: paymentId, order_id: orderId, amount, status } = eventData;

    console.log(`Processing payment.captured: ${paymentId} for order: ${orderId}`);

    // Find payment record
    const payment = await Payment.findOne({ order_id: orderId });

    if (!payment) {
      console.warn(`Payment record not found for order: ${orderId}`);
      return;
    }

    // Update payment status
    payment.payment_id = paymentId;
    payment.status = "captured";
    await payment.save();

    // Send notification to user
    if (payment.user) {
      await sendNotification({
        user: payment.user,
        type: "wallet",
        title: "Payment Received",
        message: `We have received your payment of ₹${payment.amount}. Your wallet will be updated shortly.`,
        entityType: "payment",
        entityId: orderId,
        metadata: {
          amount: payment.amount,
          orderId: orderId,
          paymentId: paymentId,
        },
      }).catch((err) => {
        console.error("Notification error:", err);
      });
    }
  } catch (error) {
    console.error("Error handling payment.captured:", error);
  }
};

/**
 * Handle payment.failed event
 */
const handlePaymentFailed = async (eventData) => {
  try {
    const { id: paymentId, order_id: orderId, error_reason: errorReason } = eventData;

    console.log(`Processing payment.failed: ${paymentId} for order: ${orderId}`);

    // Find payment record
    const payment = await Payment.findOne({ order_id: orderId });

    if (!payment) {
      console.warn(`Payment record not found for order: ${orderId}`);
      return;
    }

    // Update payment status
    payment.payment_id = paymentId;
    payment.status = "failed";
    payment.error = {
      code: eventData.error_code || "UNKNOWN",
      reason: errorReason || "Payment declined",
    };
    await payment.save();

    // Send notification to user
    if (payment.user) {
      await sendNotification({
        user: payment.user,
        type: "wallet",
        title: "Payment Failed",
        message: `Your payment attempt failed: ${errorReason || "Please try again with a different payment method."}`,
        entityType: "payment",
        entityId: orderId,
      }).catch((err) => {
        console.error("Notification error:", err);
      });
    }
  } catch (error) {
    console.error("Error handling payment.failed:", error);
  }
};

/**
 * Handle order.paid event
 * Indicates order is fully paid
 */
const handleOrderPaid = async (eventData) => {
  try {
    const { id: orderId, amount_paid: amountPaid } = eventData;

    console.log(`Processing order.paid: ${orderId}, amount: ${amountPaid}`);

    // Find payment record
    const payment = await Payment.findOne({ order_id: orderId });

    if (!payment) {
      console.warn(`Payment record not found for order: ${orderId}`);
      return;
    }

    // Update status
    if (payment.status === "created" || payment.status === "pending") {
      payment.status = "captured";
      await payment.save();
    }
  } catch (error) {
    console.error("Error handling order.paid:", error);
  }
};

/**
 * Handle payment.authorized event
 * Payment authorized but not captured yet
 */
const handlePaymentAuthorized = async (eventData) => {
  try {
    const { id: paymentId, order_id: orderId } = eventData;

    console.log(`Processing payment.authorized: ${paymentId} for order: ${orderId}`);

    // Find payment record
    const payment = await Payment.findOne({ order_id: orderId });

    if (!payment) {
      console.warn(`Payment record not found for order: ${orderId}`);
      return;
    }

    // Update payment status
    payment.payment_id = paymentId;
    payment.status = "authorized";
    await payment.save();
  } catch (error) {
    console.error("Error handling payment.authorized:", error);
  }
};

/**
 * Log webhook event for audit trail
 */
const logWebhookEvent = async (event, eventData) => {
  try {
    const orderId = eventData?.id || eventData?.order_id || "unknown";

    // Create audit trail entry
    await AuditTrail.create({
      action: `WEBHOOK_${event.replace(".", "_").toUpperCase()}`,
      actor: "system",
      resourceType: "payment",
      resourceId: orderId,
      changes: {
        event: event,
        payload: eventData,
      },
      metadata: {
        source: "razorpay_webhook",
        timestamp: new Date(),
      },
    }).catch((err) => {
      console.warn("Error creating audit trail:", err);
    });
  } catch (error) {
    console.error("Error logging webhook event:", error);
  }
};

/**
 * Webhook health check (for testing)
 * GET /api/payment/webhook/health
 */
const webhookHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Webhook endpoint is active",
    timestamp: new Date(),
  });
};

module.exports = {
  handleWebhook,
  verifyWebhookSignature,
  webhookHealth,
};
