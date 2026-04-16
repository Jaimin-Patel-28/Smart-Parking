const mongoose = require("mongoose");

const gateActivitySchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    bookingCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    parking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      default: null,
      index: true,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    action: {
      type: String,
      enum: ["verify", "entry", "exit", "override"],
      required: true,
      index: true,
    },

    result: {
      type: String,
      enum: ["success", "failed"],
      required: true,
      index: true,
    },

    reason: {
      type: String,
      default: "",
      trim: true,
    },

    errorCode: {
      type: String,
      default: null,
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    processingTimeMs: {
      type: Number,
      default: null,
      min: 0,
    },

    isOverride: {
      type: Boolean,
      default: false,
      index: true,
    },

    overrideType: {
      type: String,
      default: null,
      trim: true,
    },

    bookingStatusBefore: {
      type: String,
      default: null,
    },

    bookingStatusAfter: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

gateActivitySchema.index({ parking: 1, createdAt: -1 });
gateActivitySchema.index({ bookingCode: 1, createdAt: -1 });

module.exports = mongoose.model("GateActivity", gateActivitySchema);
