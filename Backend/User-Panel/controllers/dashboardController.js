const mongoose = require('mongoose');
const Booking = require("../../Super-Admin-Panel/models/Booking");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const now = new Date();
    const periodLengthDays = 30;
    const currentPeriodStart = new Date(now);
    currentPeriodStart.setDate(currentPeriodStart.getDate() - periodLengthDays);

    const previousPeriodStart = new Date(now);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - periodLengthDays * 2);

    const currentSnapshot = now;
    const previousSnapshot = new Date(now);
    previousSnapshot.setDate(previousSnapshot.getDate() - periodLengthDays);

    const calculateChange = (currentValue, previousValue) => {
      if (previousValue === 0) {
        return currentValue === 0 ? 0 : 100;
      }

      return Number((((currentValue - previousValue) / previousValue) * 100).toFixed(1));
    };

    const [
      totalBookings,
      activeBookings,
      totalSpentResult,
      totalHoursResult,
      recentBookings,
      statusCounts,
      currentPeriodBookingCount,
      previousPeriodBookingCount,
      currentPeriodSpentResult,
      previousPeriodSpentResult,
      currentPeriodHoursResult,
      previousPeriodHoursResult,
      previousActiveBookings,
    ] = await Promise.all([
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
      Booking.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, totalHours: { $sum: '$duration' } } }
      ]),
      Booking.find({ user: new mongoose.Types.ObjectId(userId) })
        .populate('parking', 'name location')
        .populate('slot', 'label')
        .sort({ createdAt: -1 })
        .limit(10),
      Booking.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Booking.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: currentPeriodStart }
      }),
      Booking.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart }
      }),
      Booking.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            status: 'completed',
            createdAt: { $gte: currentPeriodStart }
          }
        },
        { $group: { _id: null, totalSpent: { $sum: '$totalAmount' } } }
      ]),
      Booking.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            status: 'completed',
            createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart }
          }
        },
        { $group: { _id: null, totalSpent: { $sum: '$totalAmount' } } }
      ]),
      Booking.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            createdAt: { $gte: currentPeriodStart }
          }
        },
        { $group: { _id: null, totalHours: { $sum: '$duration' } } }
      ]),
      Booking.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart }
          }
        },
        { $group: { _id: null, totalHours: { $sum: '$duration' } } }
      ]),
      Booking.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        status: { $in: ['confirmed', 'active'] },
        startTime: { $lte: previousSnapshot },
        endTime: { $gt: previousSnapshot }
      })
    ]);

    const currentPeriodSpent = currentPeriodSpentResult[0]?.totalSpent || 0;
    const previousPeriodSpent = previousPeriodSpentResult[0]?.totalSpent || 0;
    const currentPeriodHours = currentPeriodHoursResult[0]?.totalHours || 0;
    const previousPeriodHours = previousPeriodHoursResult[0]?.totalHours || 0;

    const stats = {
      totalBookings,
      activeBookings,
      totalSpent: totalSpentResult[0]?.totalSpent || 0,
      totalHours: totalHoursResult[0]?.totalHours || 0,
      totalBookingsChange: calculateChange(currentPeriodBookingCount, previousPeriodBookingCount),
      activeBookingsChange: calculateChange(activeBookings, previousActiveBookings),
      totalSpentChange: calculateChange(currentPeriodSpent, previousPeriodSpent),
      totalHoursChange: calculateChange(currentPeriodHours, previousPeriodHours),
      avgBookingValue: totalBookings > 0 ? (totalSpentResult[0]?.totalSpent || 0) / totalBookings : 0,
      recentBookingsCount: recentBookings.length
    };

    res.json({
      stats,
      recentBookings,
      statusCounts
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: error.message });
  }
};
