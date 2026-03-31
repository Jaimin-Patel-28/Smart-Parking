const express = require("express");
const router = express.Router();

const parkingController = require("../controllers/parkingController");
const bookingController = require("../controllers/bookingController");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../../middleware/authMiddleware");

/*
========================================
  PARKING ROUTES - Find & Browse
========================================
*/
router.get("/parkings", parkingController.getActiveParkings);
router.get("/parking/:id", parkingController.getParkingDetails);
router.get("/slots", parkingController.getSlots);

/*
========================================
  BOOKING ROUTES - Create & Manage
========================================
*/

// Lock slot temporarily (5 minutes)
router.post("/slot/lock", bookingController.lockSlot);

// Confirm booking with detailed info
router.post("/booking/confirm", bookingController.confirmBooking);

// Simple booking endpoint
router.post("/book", bookingController.bookSlot);

// Get user bookings history
router.get("/bookings/:userId", bookingController.getUserBookings);

// Get current/active bookings
router.get("/current-bookings/:userId", bookingController.getCurrentBookings);

// Get upcoming bookings
router.get("/upcoming-bookings/:userId", bookingController.getUpcomingBookings);

// Get past/history bookings
router.get("/past-bookings/:userId", bookingController.getPastBookings);

// Extend booking (requires auth)
router.patch("/bookings/:id/extend", authMiddleware, bookingController.extendBooking);

// Edit booking date/time (requires auth)
router.put("/bookings/:id/edit", authMiddleware, bookingController.editBooking);

// Cancel booking (requires auth)
router.delete("/bookings/:id", authMiddleware, bookingController.cancelBooking);

// User Dashboard (stats + recent)
router.get("/user/dashboard", authMiddleware, dashboardController.getUserDashboard);

module.exports = router;

