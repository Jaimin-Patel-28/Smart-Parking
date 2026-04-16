const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { isAdminOrSuperAdmin } = require("../../middleware/roleMiddleware");

const {
  getDashboardStats,
  getRecentBookings,
  getSystemStatus,
} = require("../controllers/dashboardController");

router.get("/stats", auth, isAdminOrSuperAdmin, getDashboardStats);
router.get("/recent-bookings", auth, isAdminOrSuperAdmin, getRecentBookings);
router.get("/system-status", auth, isAdminOrSuperAdmin, getSystemStatus);

module.exports = router;
