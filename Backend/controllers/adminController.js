// Mock Data / Real Logic for Dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    // In a real app, you'd do: await Booking.aggregate(...)
    const stats = {
      totalRevenue: 12840,
      revenueTrend: 12.5,
      activeUsers: 1204,
      usersTrend: 3.2,
      occupiedSlots: 45,
      totalSlots: 100,
      occupancyRate: 5.0,
      completedBookings: 892,
      completionTrend: 18.1,
      // This array goes straight to your DashboardCharts component
      weeklyBookings: [65, 59, 80, 81, 56, 55, 40],
    };
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

exports.getRecentBookings = async (req, res) => {
  try {
    const bookings = [
      {
        id: "#PK-991",
        user: "John Doe",
        slot: "A-12",
        status: "Active",
        time: "10:30 AM",
      },
      {
        id: "#PK-992",
        user: "Jane Smith",
        slot: "B-05",
        status: "Completed",
        time: "09:15 AM",
      },
      {
        id: "#PK-993",
        user: "Mike Ross",
        slot: "C-02",
        status: "Pending",
        time: "11:00 AM",
      },
    ];
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

exports.getSystemStatus = async (req, res) => {
  try {
    const status = {
      cameraStatus: "Online",
      cameraLoad: 85,
      paymentStatus: "Online",
      paymentLoad: 12,
      dbStatus: "Slow",
      dbLoad: 94,
    };
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Error fetching system status" });
  }
};
