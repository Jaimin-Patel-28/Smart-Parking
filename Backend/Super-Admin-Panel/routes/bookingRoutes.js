const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

router.get("/", auth, isSuperAdmin, bookingController.getAllBookings);

router.get("/code/:bookingCode", auth, isSuperAdmin, bookingController.getBookingByCode);

router.get("/:id", auth, isSuperAdmin, bookingController.getBookingDetails);

router.patch("/:id/status", auth, isSuperAdmin, bookingController.updateBookingStatus);

module.exports = router;
