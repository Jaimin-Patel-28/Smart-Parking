const User = require("../../Authentication/models/User");
const GateActivity = require("../models/GateActivity");
const Booking = require("../../Super-Admin-Panel/models/Booking");
const mongoose = require("mongoose");

// ✅ Get admin profile
exports.getAdminProfile = async (admin) => {
  try {
    const adminData = await User.findById(admin.id)
      .select("fullName email mobile address role parking createdAt status")
      .populate("parking", "name");

    if (!adminData) {
      throw new Error("Admin not found");
    }

    return {
      success: true,
      data: adminData,
    };
  } catch (err) {
    throw new Error(err.message || "Failed to fetch admin profile");
  }
};

// ✅ Update admin profile
exports.updateAdminProfile = async (admin, updates) => {
  try {
    const allowedFields = ["fullName", "email", "mobile", "address"];
    const filteredUpdates = {};

    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    const updatedAdmin = await User.findByIdAndUpdate(admin.id, filteredUpdates, {
      new: true,
      runValidators: true,
    }).select("fullName email mobile address role parking createdAt status");

    return {
      success: true,
      data: updatedAdmin,
      message: "Profile updated successfully",
    };
  } catch (err) {
    throw new Error(err.message || "Failed to update admin profile");
  }
};

// ✅ Get shift metrics (KPIs)
exports.getShiftMetrics = async (admin, timeRange = "today") => {
  try {
    // Calculate date range
    const now = new Date();
    let startDate;

    switch (timeRange) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "custom":
        // custom range should be provided in params
        return {
          success: true,
          data: null,
          message: "Please provide startDate and endDate for custom range",
        };
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const adminId = admin?._id || admin?.id;
    const adminObjectId = mongoose.Types.ObjectId.isValid(adminId)
      ? new mongoose.Types.ObjectId(adminId)
      : null;

    if (!adminObjectId) {
      throw new Error("Invalid admin identifier");
    }

    const baseMatch = {
      admin: adminObjectId,
      createdAt: { $gte: startDate, $lte: now },
    };

    // Get gate activities for this admin in selected period
    const activities = await GateActivity.aggregate([
      {
        $match: baseMatch,
      },
      {
        $group: {
          _id: "$action",
          count: { $sum: 1 },
          successCount: {
            $sum: {
              $cond: [{ $eq: ["$result", "success"] }, 1, 0],
            },
          },
          failureCount: {
            $sum: {
              $cond: [{ $eq: ["$result", "failed"] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Get exception breakdown
    const exceptions = await GateActivity.aggregate([
      {
        $match: {
          ...baseMatch,
          isOverride: true,
        },
      },
      {
        $group: {
          _id: "$overrideType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate metrics
    const actionMetrics = {};
    let totalActions = 0;
    let totalSuccess = 0;

    activities.forEach((activity) => {
      actionMetrics[activity._id] = {
        count: activity.count,
        success: activity.successCount,
        failure: activity.failureCount,
        successRate: ((activity.successCount / activity.count) * 100).toFixed(2),
      };
      totalActions += activity.count;
      totalSuccess += activity.successCount;
    });

    // Get total entries
    const entries = actionMetrics.entry || { count: 0, success: 0, failure: 0, successRate: 0 };

    // Get total exits
    const exits = actionMetrics.exit || { count: 0, success: 0, failure: 0, successRate: 0 };

    // Get total overrides
    const overrides = actionMetrics.override || { count: 0, success: 0, failure: 0, successRate: 0 };

    // Get verifications
    const verifications = actionMetrics.verify || { count: 0, success: 0, failure: 0, successRate: 0 };

    // Get exception breakdown
    const exceptionBreakdown = {};
    exceptions.forEach((ex) => {
      exceptionBreakdown[ex._id || "unknown"] = ex.count;
    });

    // Calculate average processing time (approximate)
    const timeMetrics = await GateActivity.aggregate([
      {
        $match: {
          ...baseMatch,
          action: { $in: ["entry", "exit"] },
          processingTimeMs: { $type: "number" },
        },
      },
      {
        $group: {
          _id: null,
          avgProcessingMs: { $avg: "$processingTimeMs" },
          sampleCount: { $sum: 1 },
        },
      },
    ]);

    const avgProcessingTime =
      timeMetrics && timeMetrics[0] && Number.isFinite(timeMetrics[0].avgProcessingMs)
        ? (timeMetrics[0].avgProcessingMs / 1000).toFixed(2)
        : "N/A";

    const overallSuccessRate = totalActions > 0 ? ((totalSuccess / totalActions) * 100).toFixed(2) : "0.00";

    return {
      success: true,
      data: {
        timeRange,
        period: {
          startDate,
          endDate: now,
        },
        summary: {
          totalActions,
          totalSuccess,
          overallSuccessRate,
        },
        entries: {
          total: entries.count,
          successful: entries.success,
          failed: entries.failure,
          successRate: entries.successRate,
        },
        exits: {
          total: exits.count,
          successful: exits.success,
          failed: exits.failure,
          successRate: exits.successRate,
        },
        verifications: {
          total: verifications.count,
          successful: verifications.success,
          failed: verifications.failure,
          successRate: verifications.successRate,
        },
        overrides: {
          total: overrides.count,
          successful: overrides.success,
          failed: overrides.failure,
          successRate: overrides.successRate,
        },
        exceptionBreakdown,
        avgProcessingTimeSecs: avgProcessingTime,
      },
    };
  } catch (err) {
    throw new Error(err.message || "Failed to fetch shift metrics");
  }
};
