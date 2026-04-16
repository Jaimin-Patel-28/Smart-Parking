const SystemSetting = require("../models/SystemSetting");
const { logAuditTrail } = require("../utils/auditLogger");

const SETTINGS_KEY = "super-admin";

const getOrCreateSettings = async () => {
  let settings = await SystemSetting.findOne({ settingKey: SETTINGS_KEY });
  if (!settings) {
    settings = await SystemSetting.create({ settingKey: SETTINGS_KEY });
  }
  return settings;
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
};

const updateSection = async (req, res, sectionName, allowedFields) => {
  try {
    const settings = await getOrCreateSettings();
    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    if (sectionName === "general") {
      if (Object.prototype.hasOwnProperty.call(updates, "supportEmail")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(updates.supportEmail || "").trim())) {
          return res.status(400).json({ success: false, message: "Invalid support email format" });
        }
      }
      if (Object.prototype.hasOwnProperty.call(updates, "defaultBufferMinutes")) {
        const value = Number(updates.defaultBufferMinutes);
        if (Number.isNaN(value) || value < 0 || value > 120) {
          return res.status(400).json({ success: false, message: "Default buffer must be between 0 and 120 minutes" });
        }
        updates.defaultBufferMinutes = value;
      }
    }

    if (sectionName === "pricing") {
      ["baseHourlyRate", "minBookingMinutes", "cancelPenaltyPercent", "taxPercent"].forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(updates, field)) {
          updates[field] = Number(updates[field]);
        }
      });

      if (updates.baseHourlyRate < 0) {
        return res.status(400).json({ success: false, message: "Base hourly rate cannot be negative" });
      }
      if (updates.minBookingMinutes < 1 || updates.minBookingMinutes > 1440) {
        return res.status(400).json({ success: false, message: "Minimum booking minutes must be between 1 and 1440" });
      }
      if (updates.cancelPenaltyPercent < 0 || updates.cancelPenaltyPercent > 100) {
        return res.status(400).json({ success: false, message: "Cancellation penalty must be between 0 and 100" });
      }
      if (updates.taxPercent < 0 || updates.taxPercent > 100) {
        return res.status(400).json({ success: false, message: "Tax must be between 0 and 100" });
      }
    }

    if (sectionName === "security") {
      ["sessionTimeoutMinutes", "maxLoginAttempts", "passwordMinLength"].forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(updates, field)) {
          updates[field] = Number(updates[field]);
        }
      });

      if (updates.sessionTimeoutMinutes < 5 || updates.sessionTimeoutMinutes > 1440) {
        return res.status(400).json({ success: false, message: "Session timeout must be between 5 and 1440 minutes" });
      }
      if (updates.maxLoginAttempts < 3 || updates.maxLoginAttempts > 15) {
        return res.status(400).json({ success: false, message: "Max login attempts must be between 3 and 15" });
      }
      if (updates.passwordMinLength < 8 || updates.passwordMinLength > 32) {
        return res.status(400).json({ success: false, message: "Password minimum length must be between 8 and 32" });
      }
    }

    Object.entries(updates).forEach(([field, value]) => {
      settings[sectionName][field] = value;
    });

    settings.updatedBy = req.user.id;
    await settings.save();

    void logAuditTrail({
      actor: req.user.id,
      action: "settings_update",
      module: "settings",
      targetType: "system-setting",
      targetId: settings._id,
      metadata: { sectionName, updatedFields: Object.keys(updates) },
      req,
    });

    return res.status(200).json({
      success: true,
      message: `${sectionName} settings updated successfully`,
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update ${sectionName} settings`,
      error: error.message,
    });
  }
};

exports.updateGeneralSettings = async (req, res) =>
  updateSection(req, res, "general", [
    "companyName",
    "supportEmail",
    "supportPhone",
    "timezone",
    "currency",
    "defaultBufferMinutes",
  ]);

exports.updatePricingSettings = async (req, res) =>
  updateSection(req, res, "pricing", [
    "baseHourlyRate",
    "minBookingMinutes",
    "cancelPenaltyPercent",
    "taxPercent",
  ]);

exports.updateSecuritySettings = async (req, res) =>
  updateSection(req, res, "security", [
    "sessionTimeoutMinutes",
    "maxLoginAttempts",
    "passwordMinLength",
    "twoFactorRequired",
  ]);

exports.updateNotificationSettings = async (req, res) =>
  updateSection(req, res, "notifications", [
    "emailAlerts",
    "smsAlerts",
    "newBookingAlert",
    "cancelBookingAlert",
    "systemIncidentAlert",
    "dailyReportEmail",
  ]);
