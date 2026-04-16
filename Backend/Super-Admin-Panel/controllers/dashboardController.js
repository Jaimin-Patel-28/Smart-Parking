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
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    // active users
    const activeUsers = await User.countDocuments({ status: "active" });

    // slots
    const totalSlots = await Slot.countDocuments();
    const occupiedSlots = await Slot.countDocuments({ status: "occupied" });

    // completed bookings
    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    // Current week bookings (Mon-Sun), auto-rolls every new week.
    const now = new Date();
    const currentDay = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(now.getDate() + diffToMonday);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const weeklyData = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: weekStart,
            $lt: weekEnd,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata",
            },
          },
          total: { $sum: 1 },
        },
      },
    ]);

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeklyMap = {};
    weeklyData.forEach((day) => {
      weeklyMap[day._id] = day.total;
    });

    const weeklyBookings = [];
    const weeklyLabels = [];

    for (let i = 0; i < 7; i += 1) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;

      weeklyLabels.push(dayNames[i]);
      weeklyBookings.push(weeklyMap[key] || 0);
    }

    res.json({
      totalRevenue,
      activeUsers,
      totalSlots,
      occupiedSlots,
      completedBookings,
      weeklyBookings,
      weeklyLabels,

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
      .populate("user", "fullName")
      .populate("slot", "label")
      .sort({ createdAt: -1 })
      .limit(5);

    const formatted = bookings.map((b) => ({
      id: b._id,
      user: b.user?.fullName || "Unknown",
      slot: b.slot?.label || "N/A",
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
