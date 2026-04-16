const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    settingKey: {
      type: String,
      default: "super-admin",
      unique: true,
      index: true,
    },
    general: {
      companyName: { type: String, default: "Smart Parking" },
      supportEmail: { type: String, default: "support@smartparking.com" },
      supportPhone: { type: String, default: "+91 00000 00000" },
      timezone: { type: String, default: "Asia/Kolkata" },
      currency: { type: String, default: "INR" },
      defaultBufferMinutes: { type: Number, default: 15 },
    },
    pricing: {
      baseHourlyRate: { type: Number, default: 40 },
      minBookingMinutes: { type: Number, default: 30 },
      cancelPenaltyPercent: { type: Number, default: 10 },
      taxPercent: { type: Number, default: 18 },
    },
    security: {
      sessionTimeoutMinutes: { type: Number, default: 120 },
      maxLoginAttempts: { type: Number, default: 5 },
      passwordMinLength: { type: Number, default: 8 },
      twoFactorRequired: { type: Boolean, default: false },
    },
    notifications: {
      emailAlerts: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: false },
      newBookingAlert: { type: Boolean, default: true },
      cancelBookingAlert: { type: Boolean, default: true },
      systemIncidentAlert: { type: Boolean, default: true },
      dailyReportEmail: { type: Boolean, default: true },
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SystemSetting", systemSettingSchema);
