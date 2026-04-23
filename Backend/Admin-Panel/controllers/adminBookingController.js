const bookingService = require("../../Shared/services/booking.service");
const adminService = require("../services/admin.service");

// ✅ Get bookings
exports.getBookings = async (req, res) => {
  try {
    const data = await bookingService.getAdminBookings(req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get single booking detail
exports.getBookingById = async (req, res) => {
  try {
    const data = await bookingService.getAdminBookingById(req.params.id, req.user);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ✅ Mark Entry
exports.markEntry = async (req, res) => {
  try {
    const data = await bookingService.markEntry(req.params.id, req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Mark Exit
exports.markExit = async (req, res) => {
  try {
    const data = await bookingService.markExit(req.params.id, req.user);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Verify ticket by booking code
exports.verifyByCode = async (req, res) => {
  try {
    const data = await bookingService.verifyBookingByCode(
      req.params.bookingCode,
      req.user,
      req.query.reason || "",
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "VERIFY_FAILED",
      message: err.message,
    });
  }
};

// ✅ Mark entry by booking code
exports.markEntryByCode = async (req, res) => {
  try {
    const data = await bookingService.markEntryByCode(
      req.params.bookingCode,
      req.user,
      req.body?.reason || "",
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "ENTRY_FAILED",
      message: err.message,
    });
  }
};

// ✅ Mark exit by booking code
exports.markExitByCode = async (req, res) => {
  try {
    const data = await bookingService.markExitByCode(
      req.params.bookingCode,
      req.user,
      req.body?.reason || "",
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "EXIT_FAILED",
      message: err.message,
    });
  }
};

// ✅ Get gate activity logs
exports.getGateLogs = async (req, res) => {
  try {
    const data = await bookingService.getGateLogs(req.user, req.query);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "LOGS_FETCH_FAILED",
      message: err.message,
    });
  }
};

// ✅ Phase 3 - Exception buckets
exports.getExceptions = async (req, res) => {
  try {
    const data = await bookingService.getExceptionBuckets(req.user, req.query);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "EXCEPTIONS_FETCH_FAILED",
      message: err.message,
    });
  }
};

// ✅ Phase 3 - Override action with mandatory reason
exports.applyOverride = async (req, res) => {
  try {
    const data = await bookingService.applyGateOverride(
      {
        bookingCode: req.body?.bookingCode || req.params.bookingCode,
        overrideType: req.body?.overrideType,
        reason: req.body?.reason,
      },
      req.user,
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "OVERRIDE_FAILED",
      message: err.message,
    });
  }
};

// ✅ Phase 3 - Header/sidebar alert counters
exports.getOperationalAlerts = async (req, res) => {
  try {
    const data = await bookingService.getOperationalAlerts(req.user);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "ALERTS_FETCH_FAILED",
      message: err.message,
    });
  }
};

// ✅ Phase 3 - Shift notes create
exports.createShiftNote = async (req, res) => {
  try {
    const data = await bookingService.createShiftNote(req.user, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "SHIFT_NOTE_CREATE_FAILED",
      message: err.message,
    });
  }
};

// ✅ Phase 3 - Shift notes list
exports.getShiftNotes = async (req, res) => {
  try {
    const data = await bookingService.getShiftNotes(req.user, req.query);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      errorCode: err.errorCode || "SHIFT_NOTES_FETCH_FAILED",
      message: err.message,
    });
  }
};

// ✅ Phase 4 - Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const data = await adminService.getAdminProfile(req.user);
    res.json(data);
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Phase 4 - Update admin profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const data = await adminService.updateAdminProfile(req.user, req.body);
    res.json(data);
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Phase 5 - Get shift metrics (KPIs)
exports.getShiftMetrics = async (req, res) => {
  try {
    const timeRange = req.query.timeRange || "today";
    const data = await adminService.getShiftMetrics(req.user, timeRange);
    res.json(data);
  } catch (err) {
    res.status(err.status || 400).json({
      success: false,
      message: err.message,
    });
  }
};
