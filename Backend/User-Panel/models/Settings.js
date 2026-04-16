const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    notifications: {
      bookingAlerts: { type: Boolean, default: true },
      expiryAlerts: { type: Boolean, default: true },
      paymentAlerts: { type: Boolean, default: true },
    },

    preferences: {
      defaultDuration: { type: Number, default: 60 }, // minutes
      preferredFloor: { type: String, default: "" },
    },

    reminders: {
      reminderEnabled: { type: Boolean, default: true },
      reminderTime: { type: Number, default: 10 }, // minutes before end
    },

    autoFeatures: {
      autoExtend: { type: Boolean, default: false },
      autoRelease: { type: Boolean, default: true },
    },

    appSettings: {
      darkMode: { type: Boolean, default: false },
      language: { type: String, default: "en" },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Settings", settingsSchema);
