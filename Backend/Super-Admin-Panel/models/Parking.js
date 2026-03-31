const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    occupiedSlots: {
      type: Number,
      default: 0,
    },

    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Maintenance", "Closed"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Parking", parkingSchema);
