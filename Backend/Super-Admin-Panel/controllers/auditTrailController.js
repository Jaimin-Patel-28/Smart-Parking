const AuditTrail = require("../models/AuditTrail");

exports.getAuditTrails = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      module,
      action,
      actorId,
      status,
      startDate,
      endDate,
    } = req.query;

    const query = {};

    if (module) query.module = module;
    if (action) query.action = action;
    if (actorId) query.actor = actorId;
    if (status) query.status = status;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const safeLimit = Math.min(Number(limit) || 20, 100);
    const safePage = Math.max(Number(page) || 1, 1);

    const [logs, total] = await Promise.all([
      AuditTrail.find(query)
        .populate("actor", "fullName email role")
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      AuditTrail.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      page: safePage,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      totalRecords: total,
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch audit trails",
      error: error.message,
    });
  }
};
