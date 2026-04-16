const mongoose = require("mongoose");

const adminSettingsSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    parking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
      index: true,
    },

    // Notification Preferences
    notifications: {
      emailEnabled: {
        type: Boolean,
        default: true,
      },
      smsEnabled: {
        type: Boolean,
        default: false,
      },
      pushEnabled: {
        type: Boolean,
        default: true,
      },
    },

    // Alert Frequency
    alertFrequency: {
      type: String,
      enum: ["instant", "every_5_mins", "every_15_mins", "every_hour", "daily"],
      default: "instant",
    },

    // Notification Types
    notificationTypes: {
      exceptionAlerts: {
        type: Boolean,
        default: true,
      },
      overstayAlerts: {
        type: Boolean,
        default: true,
      },
      pendingPaymentAlerts: {
        type: Boolean,
        default: true,
      },
      noShowAlerts: {
        type: Boolean,
        default: true,
      },
      invalidCodeAlerts: {
        type: Boolean,
        default: false,
      },
    },

    // Theme & Language
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },

    language: {
      type: String,
      enum: ["en", "hi", "es", "fr"],
      default: "en",
    },

    // Display Preferences
    itemsPerPage: {
      type: Number,
      default: 20,
      min: 5,
      max: 100,
    },

    autoRefreshInterval: {
      type: Number,
      default: 60,
      description: "in seconds",
    },

    // Data Export Preferences
    exportFormat: {
      type: String,
      enum: ["csv", "pdf", "xlsx"],
      default: "csv",
    },

    // Operational Defaults
    defaultShiftDuration: {
      type: Number,
      default: 480,
      description: "in minutes",
    },

    enableShiftNotes: {
      type: Boolean,
      default: true,
    },

    enableOperationalAlerts: {
      type: Boolean,
      default: true,
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    lastModified: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      description: "who modified this settings",
    },
  },
  { timestamps: true },
);

adminSettingsSchema.index({ admin: 1, parking: 1 });

module.exports = mongoose.model("AdminSettings", adminSettingsSchema);
