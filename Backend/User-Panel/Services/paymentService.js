const crypto = require("crypto");
const Razorpay = require("razorpay");
const Transaction = require("../../Super-Admin-Panel/models/Transaction");
const Payment = require("../../Super-Admin-Panel/models/Payment");
const Wallet = require("../../Super-Admin-Panel/models/Wallet");
const User = require("../../Authentication/models/User");
const {
  createWalletIfNotExists,
} = require("../../Super-Admin-Panel/Services/walletService");
const transactionService = require("../../Super-Admin-Panel/services/transactionService");

let razorpayClient = null;

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Backend/.env");
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayClient;
};

/**
 * Create Razorpay Order for wallet top-up
 * @param {string} userId - User ID
 * @param {number} amount - Amount in INR (will be converted to paise)
 * @returns {Object} - Order details with orderId
 */
const createPaymentOrder = async (userId, amount) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate amount
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    // Create Razorpay order (amount in paise)
    const orderOptions = {
      amount: Math.round(parsedAmount * 100), // Convert to paise
      currency: "INR",
      receipt: `topup_${userId}_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        userEmail: user.email,
        userPhone: user.phone || "N/A",
        topupAmount: parsedAmount,
      },
    };

    const razorpay = getRazorpayClient();
    const razorpayOrder = await razorpay.orders.create(orderOptions);

    // Save payment record
    const payment = new Payment({
      user: userId,
      order_id: razorpayOrder.id,
      amount: parsedAmount,
      currency: "INR",
      status: "created",
      notes: razorpayOrder.notes,
      receipt: razorpayOrder.receipt,
      metadata: {
        userEmail: user.email,
        userPhone: user.phone,
        topupAmount: parsedAmount,
      },
    });

    await payment.save();

    return {
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: parsedAmount,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID,
        name: "Smart Parking ",
        description: "Wallet Top-up",
        userEmail: user.email,
        userPhone: user.phone || "N/A",
      },
    };
  } catch (error) {
    console.error("Error creating payment order:", error);
    throw error;
  }
};

/**
 * Verify Razorpay payment signature
 * @param {string} orderId - Razorpay order ID
 * @param {string} paymentId - Razorpay payment ID
 * @param {string} signature - HMAC signature from payment gateway
 * @returns {boolean} - Signature is valid
 */
const verifyPaymentSignature = (orderId, paymentId, signature) => {
  try {
    const data = `${orderId}|${paymentId}`;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      throw new Error("Razorpay secret is missing. Set RAZORPAY_KEY_SECRET in Backend/.env");
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(data)
      .digest("hex");

    return expectedSignature === signature;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
};

/**
 * Handle successful payment
 * @param {string} orderId - Razorpay order ID
 * @param {string} paymentId - Razorpay payment ID
 * @param {string} signature - HMAC signature
 * @returns {Object} - Transaction and wallet update details
 */
const handlePaymentSuccess = async (orderId, paymentId, signature) => {
  try {
    // Verify signature
    if (!verifyPaymentSignature(orderId, paymentId, signature)) {
      throw new Error("Invalid payment signature - possible fraud attempt");
    }

    // Find payment record
    const payment = await Payment.findOne({ order_id: orderId });
    if (!payment) {
      throw new Error("Payment record not found");
    }

    // Verify payment is not already processed
    if (payment.status !== "created" && payment.status !== "pending") {
      throw new Error("Payment already processed");
    }

    // Verify payment with Razorpay
    const razorpay = getRazorpayClient();
    const razorpayPayment = await razorpay.payments.fetch(paymentId);
    if (razorpayPayment.status !== "authorized" && razorpayPayment.status !== "captured") {
      throw new Error("Payment not authorized by Razorpay");
    }

    // Update payment record
    payment.payment_id = paymentId;
    payment.signature = signature;
    payment.status = "captured";
    payment.acquirer_data = razorpayPayment.acquirer_data;
    await payment.save();

    // Ensure wallet exists
    const wallet = await createWalletIfNotExists(payment.user);

    // Create transaction record
    const transaction = new Transaction({
      user: payment.user,
      wallet: wallet._id,
      type: "credit",
      amount: payment.amount,
      status: "success",
      description: `Wallet top-up via Razorpay (Order: ${orderId})`,
      paymentMethod: "razorpay",
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
    });

    await transaction.save();

    // Update wallet balance
    wallet.balance += payment.amount;
    await wallet.save();

    // Link transaction to payment
    payment.transaction = transaction._id;
    await payment.save();

    return {
      success: true,
      message: "Payment verified and wallet updated successfully",
      data: {
        transactionId: transaction._id,
        orderId: orderId,
        paymentId: paymentId,
        amount: payment.amount,
        newBalance: wallet.balance,
      },
    };
  } catch (error) {
    console.error("Error handling payment success:", error);

    // Log error in payment record if found
    try {
      const payment = await Payment.findOne({ order_id: orderId });
      if (payment) {
        payment.status = "failed";
        payment.error = {
          code: "VERIFICATION_FAILED",
          description: error.message,
        };
        await payment.save();
      }
    } catch (updateError) {
      console.error("Error updating payment record:", updateError);
    }

    throw error;
  }
};

/**
 * Handle failed payment
 * @param {string} orderId - Razorpay order ID
 * @param {object} errorData - Error details from payment gateway
 * @returns {Object} - Status update
 */
const handlePaymentFailure = async (orderId, errorData = {}) => {
  try {
    const payment = await Payment.findOne({ order_id: orderId });

    if (payment) {
      payment.status = "failed";
      payment.error = {
        code: errorData.code || "PAYMENT_FAILED",
        description: errorData.description || "Payment was not completed",
        reason: errorData.reason || "Unknown reason",
      };
      await payment.save();
    }

    return {
      success: true,
      message: "Payment failure recorded",
      orderId: orderId,
    };
  } catch (error) {
    console.error("Error handling payment failure:", error);
    throw error;
  }
};

/**
 * Fetch payment status from Razorpay
 * @param {string} orderId - Razorpay order ID
 * @returns {Object} - Payment status details
 */
const getPaymentStatus = async (orderId) => {
  try {
    const payment = await Payment.findOne({ order_id: orderId }).populate(
      "transaction",
      "amount status description createdAt"
    );

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Fetch from Razorpay if needed
    let razorpayOrder = null;
    try {
      const razorpay = getRazorpayClient();
      razorpayOrder = await razorpay.orders.fetch(orderId);
    } catch (err) {
      console.warn("Could not fetch from Razorpay:", err.message);
    }

    return {
      success: true,
      data: {
        orderId: payment.order_id,
        paymentId: payment.payment_id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        transaction: payment.transaction,
        razorpayStatus: razorpayOrder?.status || "unknown",
        error: payment.error || null,
      },
    };
  } catch (error) {
    console.error("Error fetching payment status:", error);
    throw error;
  }
};

/**
 * Refund a payment
 * @param {string} orderId - Razorpay order ID
 * @param {string} reason - Refund reason
 * @returns {Object} - Refund details
 */
const refundPayment = async (orderId, reason = "Customer request") => {
  try {
    const payment = await Payment.findOne({ order_id: orderId });

    if (!payment || !payment.payment_id) {
      throw new Error("Payment not found or not completed");
    }

    // Create refund in Razorpay
    const razorpay = getRazorpayClient();
    const refund = await razorpay.payments.refund(payment.payment_id, {
      amount: Math.round(payment.amount * 100), // in paise
      notes: {
        reason: reason,
        orderId: orderId,
      },
    });

    // Update payment status
    payment.status = "failed"; // Treating refund as failed/cancelled
    await payment.save();

    // Create refund transaction
    const transaction = new Transaction({
      user: payment.user,
      wallet: payment.transaction?.wallet,
      type: "debit",
      amount: payment.amount,
      status: "success",
      description: `Refund for wallet top-up (Order: ${orderId}, Reason: ${reason})`,
      paymentMethod: "razorpay",
      razorpayOrderId: orderId,
    });

    await transaction.save();

    return {
      success: true,
      message: "Refund processed successfully",
      data: {
        refundId: refund.id,
        amount: payment.amount,
        status: refund.status,
      },
    };
  } catch (error) {
    console.error("Error refunding payment:", error);
    throw error;
  }
};

module.exports = {
  createPaymentOrder,
  verifyPaymentSignature,
  handlePaymentSuccess,
  handlePaymentFailure,
  getPaymentStatus,
  refundPayment,
};
