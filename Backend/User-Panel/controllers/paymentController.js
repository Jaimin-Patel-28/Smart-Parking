const paymentService = require("../Services/paymentService");
const { sendNotification } = require("../../Shared/services/notification.service");

/**
 * Create Razorpay order for wallet top-up
 * POST /api/payment/create-order
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const result = await paymentService.createPaymentOrder(userId, amount);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create payment order",
    });
  }
};

/**
 * Verify payment and credit wallet
 * POST /api/payment/verify-payment
 */
const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: "orderId, paymentId, and signature are required",
      });
    }

    // Handle payment success
    const result = await paymentService.handlePaymentSuccess(
      orderId,
      paymentId,
      signature
    );

    // Send notification
    void sendNotification({
      user: userId,
      type: "wallet",
      title: "Payment Successful",
      message: `Your wallet has been credited with ₹${result.data.amount}`,
      entityType: "wallet",
      entityId: result.data.transactionId,
      metadata: {
        amount: result.data.amount,
        balance: result.data.newBalance,
        orderId: orderId,
      },
    }).catch((notificationError) => {
      console.error("Notification error:", notificationError);
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error verifying payment:", error);

    // Handle verification failure
    const { orderId } = req.body;
    if (orderId) {
      await paymentService.handlePaymentFailure(orderId, {
        code: "VERIFICATION_FAILED",
        description: error.message,
      }).catch(err => {
        console.error("Error logging payment failure:", err);
      });
    }

    res.status(400).json({
      success: false,
      message: error.message || "Payment verification failed",
    });
  }
};

/**
 * Get payment status
 * GET /api/payment/status/:orderId
 */
const getStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    const result = await paymentService.getPaymentStatus(orderId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch payment status",
    });
  }
};

/**
 * Refund a payment
 * POST /api/payment/refund
 */
const refund = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId, reason } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    const result = await paymentService.refundPayment(
      orderId,
      reason || "Customer request"
    );

    // Send notification
    void sendNotification({
      user: userId,
      type: "wallet",
      title: "Refund Processed",
      message: `Your payment of ₹${result.data.amount} has been refunded`,
      entityType: "payment",
      entityId: orderId,
      metadata: {
        amount: result.data.amount,
        refundId: result.data.refundId,
      },
    }).catch((notificationError) => {
      console.error("Notification error:", notificationError);
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error refunding payment:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to process refund",
    });
  }
};

/**
 * Handle payment failure callback
 * POST /api/payment/failed
 */
const handleFailure = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId, error } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    const result = await paymentService.handlePaymentFailure(orderId, error);

    // Send notification
    void sendNotification({
      user: userId,
      type: "wallet",
      title: "Payment Failed",
      message: `Your payment attempt failed. ${error?.description || "Please try again."}`,
      entityType: "payment",
      entityId: orderId,
    }).catch((notificationError) => {
      console.error("Notification error:", notificationError);
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling payment failure:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to process payment failure",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getStatus,
  refund,
  handleFailure,
};
