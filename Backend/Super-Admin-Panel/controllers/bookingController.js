const Booking = require("../models/Booking");

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate("user", "fullName email")
      .populate("parking", "name location")
      .populate("slot", "slotNumber");

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Booking Details
const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "fullName email mobile")
      .populate("parking")
      .populate("slot");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Booking Status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBookings,
  getBookingDetails,
  updateBookingStatus,
};
