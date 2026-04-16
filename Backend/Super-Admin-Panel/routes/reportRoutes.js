const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

const {
  getRevenueReport,
  getOccupancyReport,
  getBookingReport,
  getUserReport,
  getSystemHealthReport,
  getComprehensiveReport,
} = require("../controllers/reportController");

// Revenue Reports
router.get("/revenue", auth, isSuperAdmin, getRevenueReport);

// Occupancy Reports
router.get("/occupancy", auth, isSuperAdmin, getOccupancyReport);

// Booking Reports
router.get("/bookings", auth, isSuperAdmin, getBookingReport);

// User Reports
router.get("/users", auth, isSuperAdmin, getUserReport);

// System Health Report
router.get("/health", auth, isSuperAdmin, getSystemHealthReport);

// Comprehensive Report
router.get("/comprehensive", auth, isSuperAdmin, getComprehensiveReport);

module.exports = router;
