const mongoose = require('mongoose');
const Booking = require("../../Super-Admin-Panel/models/Booking");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const now = new Date();

    const [totalBookings, activeBookings, totalSpentResult, recentBookings] = await Promise.all([
      Booking.countDocuments({ user: new mongoose.Types.ObjectId(userId) }),
      Booking.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        status: { $in: ['confirmed', 'active'] },
        startTime: { $lte: now },
        endTime: { $gt: now }
      }),
      Booking.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), status: 'completed' } },
        { $group: { _id: null, totalSpent: { $sum: '$totalAmount' } } }
      ]),
      Booking.find({ user: new mongoose.Types.ObjectId(userId) })
        .populate('parking', 'name location')
        .populate('slot', 'label')
        .sort({ createdAt: -1 })
        .limit(10)
    ]);

    const stats = {
      totalBookings,
      activeBookings,
      totalSpent: totalSpentResult[0]?.totalSpent || 0,
      avgBookingValue: totalBookings > 0 ? (totalSpentResult[0]?.totalSpent || 0) / totalBookings : 0,
      recentBookingsCount: recentBookings.length
    };

    res.json({
      stats,
      recentBookings
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: error.message });
  }
};
