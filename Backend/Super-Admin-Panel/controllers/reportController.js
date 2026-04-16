const Booking = require("../models/Booking");
const User = require("../../Authentication/models/User");
const Parking = require("../models/Parking");
const Slot = require("../models/Slot");
const Transaction = require("../models/Transaction");

// ===============================
// 1. Revenue Reports
// ===============================
exports.getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = { status: "completed" };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const totalRevenue = await Booking.aggregate([
      { $match: { ...query, status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const revenueByParking = await Booking.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "parkings",
          localField: "parking",
          foreignField: "_id",
          as: "parkingData",
        },
      },
      { $unwind: "$parkingData" },
      {
        $group: {
          _id: "$parkingData._id",
          parkingName: { $first: "$parkingData.name" },
          totalRevenue: { $sum: "$totalAmount" },
          bookingsCount: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        revenueByParking,
        period: {
          startDate: startDate || "N/A",
          endDate: endDate || "N/A",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 2. Occupancy Reports
// ===============================
exports.getOccupancyReport = async (req, res) => {
  try {
    const parkings = await Parking.find();

    const occupancyData = [];

    for (const parking of parkings) {
      const totalSlots = await Slot.countDocuments({ parkingId: parking._id });
      const occupiedSlots = await Slot.countDocuments({
        parkingId: parking._id,
        status: "occupied",
      });
      const availableSlots = await Slot.countDocuments({
        parkingId: parking._id,
        status: "available",
      });

      const occupancyRate = totalSlots > 0 ? (occupiedSlots / totalSlots) * 100 : 0;

      occupancyData.push({
        parkingId: parking._id,
        parkingName: parking.name,
        location: parking.location,
        totalSlots,
        occupiedSlots,
        availableSlots,
        occupancyRate: Math.round(occupancyRate),
      });
    }

    res.json({
      success: true,
      data: occupancyData,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 3. Booking Reports
// ===============================
exports.getBookingReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate("user", "fullName email")
      .populate("parking", "name location")
      .populate("slot", "label")
      .sort({ createdAt: -1 });

    const stats = {
      totalBookings: bookings.length,
      byStatus: {},
      byParking: {},
    };

    bookings.forEach((booking) => {
      // Count by status
      stats.byStatus[booking.status] = (stats.byStatus[booking.status] || 0) + 1;

      // Count by parking
      const parkingName = booking.parking?.name || "Unknown";
      stats.byParking[parkingName] = (stats.byParking[parkingName] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        stats,
        bookings,
        period: {
          startDate: startDate || "N/A",
          endDate: endDate || "N/A",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 4. User Reports
// ===============================
exports.getUserReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const inactiveUsers = await User.countDocuments({ status: "inactive" });
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    // Top users by bookings
    const topUsers = await Booking.aggregate([
      {
        $group: {
          _id: "$user",
          totalBookings: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $project: {
          _id: 0,
          userId: "$userData._id",
          fullName: "$userData.fullName",
          email: "$userData.email",
          totalBookings: 1,
          totalSpent: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalUsers,
          activeUsers,
          inactiveUsers,
          adminUsers,
          regularUsers,
        },
        topUsers,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 5. System Health Report
// ===============================
exports.getSystemHealthReport = async (req, res) => {
  try {
    const totalParkings = await Parking.countDocuments();
    const totalSlots = await Slot.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });
    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });
    const activeBookings = await Booking.countDocuments({ status: "active" });

    const failedTransactions = await Transaction.countDocuments({
      status: "failed",
    });
    const successfulTransactions = await Transaction.countDocuments({
      status: "success",
    });

    res.json({
      success: true,
      data: {
        parkings: {
          total: totalParkings,
        },
        slots: {
          total: totalSlots,
        },
        bookings: {
          total: totalBookings,
          completed: completedBookings,
          pending: pendingBookings,
          active: activeBookings,
        },
        transactions: {
          successful: successfulTransactions,
          failed: failedTransactions,
        },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 6. Comprehensive System Report
// ===============================
exports.getComprehensiveReport = async (req, res) => {
  try {
    // Fetch all report data in parallel
    const [revenueData, occupancy, users, systemHealth] = await Promise.all([
      (async () => {
        const result = await Booking.aggregate([
          { $match: { status: "completed" } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);
        return result[0]?.total || 0;
      })(),
      (async () => {
        const total = await Slot.countDocuments();
        const occupied = await Slot.countDocuments({ status: "occupied" });
        return { total, occupied, rate: total > 0 ? Math.round((occupied / total) * 100) : 0 };
      })(),
      (async () => {
        const total = await User.countDocuments();
        const active = await User.countDocuments({ status: "active" });
        return { total, active };
      })(),
      (async () => {
        const totalBookings = await Booking.countDocuments();
        const completedBookings = await Booking.countDocuments({
          status: "completed",
        });
        return { totalBookings, completedBookings };
      })(),
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue: revenueData,
        occupancyRate: occupancy.rate,
        activeUsers: users.active,
        totalUsers: users.total,
        completionRate: systemHealth.totalBookings > 0
          ? Math.round((systemHealth.completedBookings / systemHealth.totalBookings) * 100)
          : 0,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
