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
router.post("/slot/lock", authMiddleware, bookingController.lockSlot);

// Confirm booking with detailed info
router.post("/booking/confirm", authMiddleware, bookingController.confirmBooking);

// Simple booking endpoint
router.post("/book", authMiddleware, bookingController.bookSlot);

// Get logged-in user bookings history
router.get("/bookings", authMiddleware, bookingController.getUserBookings);

// Backwards-compatible alias (userId ignored; token user is always enforced)
router.get("/bookings/:userId", authMiddleware, bookingController.getUserBookings);

// Get a single booking by id for the logged-in user
router.get("/booking/:id", authMiddleware, bookingController.getBookingDetails);

// Backwards-compatible alias for detail pages
router.get(
  "/bookings/detail/:id",
  authMiddleware,
  bookingController.getBookingDetails,
);

// Get current/active bookings for logged-in user
router.get("/current-bookings", authMiddleware, bookingController.getCurrentBookings);

// Backwards-compatible alias (userId ignored; token user is always enforced)
router.get(
  "/current-bookings/:userId",
  authMiddleware,
  bookingController.getCurrentBookings,
);

// Get upcoming bookings for logged-in user
router.get("/upcoming-bookings", authMiddleware, bookingController.getUpcomingBookings);

// Backwards-compatible alias (userId ignored; token user is always enforced)
router.get(
  "/upcoming-bookings/:userId",
  authMiddleware,
  bookingController.getUpcomingBookings,
);

// Get past/history bookings for logged-in user
router.get("/past-bookings", authMiddleware, bookingController.getPastBookings);

// Backwards-compatible alias (userId ignored; token user is always enforced)
router.get(
  "/past-bookings/:userId",
  authMiddleware,
  bookingController.getPastBookings,
);

// Extend booking (requires auth)
router.patch("/bookings/:id/extend", authMiddleware, bookingController.extendBooking);

// Edit booking date/time (requires auth)
router.put("/bookings/:id/edit", authMiddleware, bookingController.editBooking);

// Cancel booking (requires auth)
router.delete("/bookings/:id", authMiddleware, bookingController.cancelBooking);

// User Dashboard (stats + recent)
router.get("/user/dashboard", authMiddleware, dashboardController.getUserDashboard);

module.exports = router;

