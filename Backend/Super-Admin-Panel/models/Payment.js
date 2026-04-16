const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order_id: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["created", "pending", "authorized", "captured", "failed", "cancelled"],
      default: "created",
    },

    payment_id: {
      type: String,
      sparse: true,
    },

    signature: {
      type: String,
      sparse: true,
    },

    receipt: {
      type: String,
      sparse: true,
    },

    notes: {
      type: mongoose.Schema.Types.Mixed,
    },

    acquirer_data: {
      type: mongoose.Schema.Types.Mixed,
    },

    error: {
      code: String,
      description: String,
      reason: String,
    },

    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },

    metadata: {
      userEmail: String,
      userPhone: String,
      topupAmount: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
