const Booking = require("../models/Booking");
const User = require("../../Authentication/models/User");
const Parking = require("../models/Parking");
const Slot = require("../models/Slot");

// ===============================
// 1. Dashboard Stats
// ===============================
exports.getDashboardStats = async (req, res) => {
  try {
    // total revenue from bookings
    const revenueResult = await Booking.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    // active users
    const activeUsers = await User.countDocuments({ status: "active" });

    // slots
    const totalSlots = await Slot.countDocuments();
    const occupiedSlots = await Slot.countDocuments({ status: "occupied" });

    // completed bookings
    const completedBookings = await Booking.countDocuments({
      status: "Completed",
    });

    // weekly bookings (Mon-Sun)
    const weeklyData = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          total: { $sum: 1 },
        },
      },
    ]);

    const weeklyBookings = [0, 0, 0, 0, 0, 0, 0];

    weeklyData.forEach((day) => {
      const index = day._id - 1;
      weeklyBookings[index] = day.total;
    });

    res.json({
      totalRevenue,
      activeUsers,
      totalSlots,
      occupiedSlots,
      completedBookings,
      weeklyBookings,

      // trend placeholders
      revenueTrend: 12,
      usersTrend: 8,
      completionTrend: 6,
      occupancyRate: Math.round((occupiedSlots / totalSlots) * 100),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 2. Recent Bookings
// ===============================
exports.getRecentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name")
      .populate("slot", "slotNumber")
      .sort({ createdAt: -1 })
      .limit(5);

    const formatted = bookings.map((b) => ({
      id: b._id,
      user: b.user?.name || "Unknown",
      slot: b.slot?.slotNumber || "N/A",
      status: b.status,
      time: new Date(b.createdAt).toLocaleTimeString(),
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 3. System Status
// ===============================
exports.getSystemStatus = async (req, res) => {
  try {
    // Fake system monitoring data
    // (Normally comes from monitoring service)

    res.json({
      cameraStatus: "Operational",
      cameraLoad: 65,

      paymentStatus: "Operational",
      paymentLoad: 40,

      dbStatus: "Healthy",
      dbLoad: 55,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
