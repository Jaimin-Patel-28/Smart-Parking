const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);

router.get("/:id", bookingController.getBookingDetails);

router.patch("/:id/status", bookingController.updateBookingStatus);

module.exports = router;
