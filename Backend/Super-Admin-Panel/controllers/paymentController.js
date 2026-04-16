const Payment = require("../../Super-Admin-Panel/models/Payment");
const Transaction = require("../../Super-Admin-Panel/models/Transaction");
const Wallet = require("../../Super-Admin-Panel/models/Wallet");
const User = require("../../Authentication/models/User");

/**
 * Get all payments with filters
 * GET /api/admin/payments
 */
const getPayments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, startDate, endDate } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [payments, total] = await Promise.all([
      Payment.find(query)
        .populate("user", "name email phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Payment.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: {
        payments,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get payment statistics
 * GET /api/admin/payments/stats/overview
 */
const getPaymentStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateQuery = {};
    if (startDate || endDate) {
      dateQuery.createdAt = {};
      if (startDate) dateQuery.createdAt.$gte = new Date(startDate);
      if (endDate) dateQuery.createdAt.$lte = new Date(endDate);
    }

    // Get aggregated stats
    const [totalStats, statusStats, methodStats] = await Promise.all([
      Payment.aggregate([
        { $match: dateQuery },
        {
          $group: {
            _id: null,
            totalTransactions: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
            successfulTransactions: {
              $sum: { $cond: [{ $eq: ["$status", "captured"] }, 1, 0] },
            },
            failedTransactions: {
              $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
            },
          },
        },
      ]),
      Payment.aggregate([
        { $match: dateQuery },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            amount: { $sum: "$amount" },
          },
        },
      ]),
      Transaction.aggregate([
        {
          $match: {
            ...dateQuery,
            type: "credit",
            status: "success",
          },
        },
        {
          $group: {
            _id: "$paymentMethod",
            count: { $sum: 1 },
            amount: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const stats = totalStats[0] || {
      totalTransactions: 0,
      totalAmount: 0,
      successfulTransactions: 0,
      failedTransactions: 0,
    };

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        byStatus: statusStats,
        byMethod: methodStats,
        successRate:
          stats.totalTransactions > 0
            ? Math.round(
                (stats.successfulTransactions / stats.totalTransactions) * 100
              )
            : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get payment details
 * GET /api/admin/payments/:paymentId
 */
const getPaymentDetail = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate("user", "name email phone")
      .populate("transaction");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("Error fetching payment detail:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get user payment history
 * GET /api/admin/payments/user/:userId
 */
const getUserPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const [payments, total, wallet] = await Promise.all([
      Payment.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("transaction"),
      Payment.countDocuments({ user: userId }),
      Wallet.findOne({ user: userId }),
    ]);

    const user = await User.findById(userId).select("name email phone");

    res.status(200).json({
      success: true,
      data: {
        user,
        wallet,
        payments,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user payment history:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Export payment report
 * GET /api/admin/payments/export/csv
 */
const exportPayments = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const query = {};
    if (status) query.status = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const payments = await Payment.find(query)
      .populate("user", "name email phone")
      .populate("transaction", "amount status");

    // Create CSV
    let csv = "Order ID,Payment ID,User,Email,Amount,Status,Date\n";
    payments.forEach((p) => {
      csv += `"${p.order_id}","${p.payment_id || ""}","${
        p.user?.name || ""
      }","${p.user?.email || ""}",${p.amount},"${p.status}","${p.createdAt.toISOString()}"\n`;
    });

    res.header("Content-Type", "text/csv");
    res.header(
      "Content-Disposition",
      `attachment; filename="payments-${Date.now()}.csv"`
    );
    res.send(csv);
  } catch (error) {
    console.error("Error exporting payments:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPayments,
  getPaymentStats,
  getPaymentDetail,
  getUserPaymentHistory,
  exportPayments,
};
