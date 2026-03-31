const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    parkingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    status: {
      type: String,
enum: ["available", "locked", "temporary_locked", "occupied", "maintenance"],
      default: "available",
    },

    vehicleNumber: {
      type: String,
      default: null,
    },

    bookedAt: {
      type: Date,
      default: null,
    },

    lockExpiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Slot", slotSchema);
