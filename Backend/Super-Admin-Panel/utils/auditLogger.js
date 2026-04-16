const AuditTrail = require("../models/AuditTrail");

const logAuditTrail = async ({
  actor,
  action,
  module,
  targetType = null,
  targetId = null,
  metadata = {},
  status = "success",
  req = null,
}) => {
  if (!actor || !action || !module) return;

  try {
    await AuditTrail.create({
      actor,
      action,
      module,
      targetType,
      targetId,
      metadata,
      status,
      ipAddress: req?.ip || req?.headers?.["x-forwarded-for"] || null,
      userAgent: req?.headers?.["user-agent"] || null,
    });
  } catch (error) {
    console.error("Audit trail log failed:", error.message);
  }
};

module.exports = { logAuditTrail };
