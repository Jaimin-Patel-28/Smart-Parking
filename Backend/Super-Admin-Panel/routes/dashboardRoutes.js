const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentBookings,
  getSystemStatus,
} = require("../controllers/dashboardController");

router.get("/stats", getDashboardStats);
router.get("/recent-bookings", getRecentBookings);
router.get("/system-status", getSystemStatus);

module.exports = router;
