const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Define the three main dashboard endpoints
router.get("/dashboard/stats", adminController.getDashboardStats);
router.get("/dashboard/recent-bookings", adminController.getRecentBookings);
router.get("/dashboard/system-status", adminController.getSystemStatus); // Fixed here

module.exports = router;
