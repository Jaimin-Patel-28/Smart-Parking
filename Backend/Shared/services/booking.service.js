const Booking = require("../../Super-Admin-Panel/models/Booking");
const Slot = require("../../Super-Admin-Panel/models/Slot");
const GateActivity = require("../../Admin-Panel/models/GateActivity");
const ShiftNote = require("../../Admin-Panel/models/ShiftNote");

const BUFFER_TIME = 10 * 60 * 1000; // 10 minutes

const OVERRIDE_TYPES = {
  ALLOW_ENTRY: "ALLOW_ENTRY",
  ALLOW_EXIT_PENDING_PAYMENT: "ALLOW_EXIT_PENDING_PAYMENT",
  MARK_NO_SHOW: "MARK_NO_SHOW",
  FORCE_COMPLETE_OVERSTAY: "FORCE_COMPLETE_OVERSTAY",
};

const createGateError = (status, errorCode, message) => {
  const error = new Error(message);
  error.status = status;
  error.errorCode = errorCode;
  return error;
};

const normalizeBookingCode = (bookingCode) =>
  String(bookingCode || "").trim().toUpperCase();

const extractIdString = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (value._id) {
    return String(value._id);
  }

  return String(value);
};

const logGateActivity = async ({
  booking,
  bookingCode,
  admin,
  action,
  result,
  reason = "",
  errorCode = null,
  message = "",
  bookingStatusBefore = null,
  bookingStatusAfter = null,
  isOverride = false,
  overrideType = null,
  startedAt = null,
}) => {
  try {
    const hasValidStart = startedAt instanceof Date && !Number.isNaN(startedAt.getTime());
    const processingTimeMs = hasValidStart ? Math.max(Date.now() - startedAt.getTime(), 0) : null;

    await GateActivity.create({
      booking: booking?._id || null,
      bookingCode,
      parking: booking?.parking || admin?.parking || null,
      admin: admin.id,
      action,
      result,
      reason,
      errorCode,
      message,
      isOverride,
      overrideType,
      bookingStatusBefore,
      bookingStatusAfter,
      processingTimeMs,
    });
  } catch (error) {
    console.error("Gate activity log error:", error.message);
  }
};

const ensureAdminParking = (admin) => {
  if (!admin.parking) {
    throw createGateError(400, "ADMIN_PARKING_MISSING", "Admin parking not assigned");
  }
};

const ensureAdminOwnsBookingParking = (booking, admin) => {
  const bookingParkingId = extractIdString(booking.parking);
  const adminParkingId = extractIdString(admin.parking);

  if (admin.role === "admin" && bookingParkingId !== adminParkingId) {
    throw createGateError(403, "WRONG_PARKING", "This ticket belongs to another parking location");
  }
};

const getBookingByCodeOrThrow = async (bookingCode) => {
  const normalized = normalizeBookingCode(bookingCode);
  const booking = await Booking.findOne({ bookingCode: normalized })
    .populate("user", "fullName email mobile vehicleNumber")
    .populate("parking", "name location")
    .populate("slot", "label status");

  if (!booking) {
    throw createGateError(404, "WRONG_CODE", "Ticket code not found");
  }

  return { booking, normalized };
};

const validateForEntryByCode = (booking) => {
  const now = new Date();

  if (booking.status === "cancelled") {
    throw createGateError(400, "CANCELLED", "Booking is cancelled");
  }

  if (booking.status === "completed") {
    throw createGateError(400, "ALREADY_EXITED", "Booking already exited");
  }

  if (booking.status === "active") {
    throw createGateError(400, "ALREADY_ENTERED", "Entry already marked for this booking");
  }

  if (new Date(booking.endTime) < now) {
    throw createGateError(400, "EXPIRED", "Booking is expired");
  }

  if (booking.status !== "confirmed") {
    throw createGateError(400, "INVALID_STATUS", "Booking is not eligible for entry");
  }
};

const validateForExitByCode = (booking) => {
  const now = new Date();

  if (booking.status === "cancelled") {
    throw createGateError(400, "CANCELLED", "Booking is cancelled");
  }

  if (booking.status === "completed") {
    throw createGateError(400, "ALREADY_EXITED", "Exit already marked for this booking");
  }

  if (booking.status !== "active") {
    if (new Date(booking.endTime) < now) {
      throw createGateError(400, "EXPIRED", "Booking expired before gate exit validation");
    }

    throw createGateError(400, "ENTRY_NOT_DONE", "Entry not done for this booking");
  }
};

// ✅ Create Booking (User)
exports.createBooking = async (data) => {
  const { user, parking, slot, startTime, endTime } = data;

  const slotData = await Slot.findById(slot);

  if (!slotData) {
    throw new Error("Slot not found");
  }

  const booking = await Booking.create({
    user,
    parking,
    slot,
    startTime,
    endTime,
    status: "confirmed",
  });

  await slotData.save();

  return booking;
};

// ✅ Mark Entry (Admin)
exports.markEntry = async (bookingId, admin) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) throw new Error("Booking not found");

  if (!admin.parking) {
    throw new Error("Admin parking not assigned");
  }

  // restrict admin to own parking
  if (admin.role === "admin" && extractIdString(booking.parking) !== extractIdString(admin.parking)) {
    throw new Error("Unauthorized");
  }

  if (booking.status === "active") {
    throw new Error("Already entered");
  }

  if (booking.status !== "confirmed") {
    throw new Error("Booking is not eligible for entry");
  }

  const slot = await Slot.findById(booking.slot);

  if (!slot) {
    throw new Error("Slot not found");
  }

  booking.status = "active";
  booking.entryTime = new Date();

  slot.status = "occupied";
  slot.vehicleNumber = booking.vehicleNumber || null;

  await booking.save();
  await slot.save();

  return booking;
};

// ✅ Mark Exit (Admin)
exports.markExit = async (bookingId, admin) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) throw new Error("Booking not found");

  if (!admin.parking) {
    throw new Error("Admin parking not assigned");
  }

  if (admin.role === "admin" && extractIdString(booking.parking) !== extractIdString(admin.parking)) {
    throw new Error("Unauthorized");
  }

  if (booking.status !== "active") {
    throw new Error("Entry not done");
  }

  const slot = await Slot.findById(booking.slot);

  if (!slot) {
    throw new Error("Slot not found");
  }

  booking.status = "completed";
  booking.exitTime = new Date();

  slot.status = "available";
  slot.vehicleNumber = null;

  await booking.save();
  await slot.save();

  return booking;
};

// ✅ Get Bookings (Admin filtered)
exports.getAdminBookings = async (admin) => {
  if (!admin.parking) {
    throw new Error("Admin parking not assigned");
  }

  return await Booking.find({ parking: admin.parking })
    .populate("user slot parking")
    .sort({ createdAt: -1 });
};

// ✅ Get single booking detail (Admin filtered)
exports.getAdminBookingById = async (bookingId, admin) => {
  if (!admin.parking) {
    throw new Error("Admin parking not assigned");
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    parking: admin.parking,
  }).populate("user slot parking");

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

// ✅ Get All Bookings (Super Admin)
exports.getAllBookings = async () => {
  return await Booking.find()
    .populate("user slot parking")
    .sort({ createdAt: -1 });
};

// ✅ Verify ticket by booking code (Admin)
exports.verifyBookingByCode = async (bookingCode, admin, reason = "") => {
  const operationStartedAt = new Date();

  try {
    ensureAdminParking(admin);
    const { booking, normalized } = await getBookingByCodeOrThrow(bookingCode);

    ensureAdminOwnsBookingParking(booking, admin);

    const now = new Date();
    const isExpired = new Date(booking.endTime) < now;
    const isCancelled = booking.status === "cancelled";
    const alreadyEntered = booking.status === "active" || booking.status === "completed";
    const alreadyExited = booking.status === "completed";

    const canEnter = booking.status === "confirmed" && !isExpired && !isCancelled;
    const canExit = booking.status === "active" && !isCancelled;

    let validation = null;
    if (isCancelled) validation = { errorCode: "CANCELLED", message: "Booking is cancelled" };
    else if (isExpired && booking.status !== "active") {
      validation = { errorCode: "EXPIRED", message: "Booking is expired" };
    } else if (alreadyExited) {
      validation = { errorCode: "ALREADY_EXITED", message: "Booking already exited" };
    } else if (alreadyEntered && !canExit) {
      validation = { errorCode: "ALREADY_ENTERED", message: "Entry already marked" };
    }

    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "verify",
      result: validation ? "failed" : "success",
      reason,
      errorCode: validation?.errorCode || null,
      message: validation?.message || "Ticket verified successfully",
      bookingStatusBefore: booking.status,
      bookingStatusAfter: booking.status,
      startedAt: operationStartedAt,
    });

    return {
      booking,
      gate: {
        canEnter,
        canExit,
        isExpired,
        isCancelled,
        alreadyEntered,
        alreadyExited,
      },
      validation,
    };
  } catch (error) {
    const normalized = normalizeBookingCode(bookingCode);

    await logGateActivity({
      booking: null,
      bookingCode: normalized,
      admin,
      action: "verify",
      result: "failed",
      reason,
      errorCode: error.errorCode || "VERIFY_FAILED",
      message: error.message,
      startedAt: operationStartedAt,
    });

    throw error;
  }
};

// ✅ Mark entry by booking code (Admin)
exports.markEntryByCode = async (bookingCode, admin, reason = "") => {
  const normalized = normalizeBookingCode(bookingCode);
  let booking = null;
  let statusBefore = null;
  const operationStartedAt = new Date();

  try {
    ensureAdminParking(admin);
    const found = await getBookingByCodeOrThrow(bookingCode);
    booking = found.booking;
    statusBefore = booking.status;

    ensureAdminOwnsBookingParking(booking, admin);
    validateForEntryByCode(booking);

    const slot = await Slot.findById(booking.slot);
    if (!slot) {
      throw createGateError(404, "SLOT_NOT_FOUND", "Slot not found");
    }

    booking.status = "active";
    booking.entryTime = new Date();

    slot.status = "occupied";
    slot.vehicleNumber = booking.vehicleNumber || null;

    await booking.save();
    await slot.save();

    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "entry",
      result: "success",
      reason,
      message: "Entry marked successfully",
      bookingStatusBefore: statusBefore,
      bookingStatusAfter: booking.status,
      startedAt: operationStartedAt,
    });

    return booking;
  } catch (error) {
    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "entry",
      result: "failed",
      reason,
      errorCode: error.errorCode || "ENTRY_FAILED",
      message: error.message,
      bookingStatusBefore: statusBefore,
      bookingStatusAfter: booking?.status || null,
      startedAt: operationStartedAt,
    });

    throw error;
  }
};

// ✅ Mark exit by booking code (Admin)
exports.markExitByCode = async (bookingCode, admin, reason = "") => {
  const normalized = normalizeBookingCode(bookingCode);
  let booking = null;
  let statusBefore = null;
  const operationStartedAt = new Date();

  try {
    ensureAdminParking(admin);
    const found = await getBookingByCodeOrThrow(bookingCode);
    booking = found.booking;
    statusBefore = booking.status;

    ensureAdminOwnsBookingParking(booking, admin);
    validateForExitByCode(booking);

    const slot = await Slot.findById(booking.slot);
    if (!slot) {
      throw createGateError(404, "SLOT_NOT_FOUND", "Slot not found");
    }

    booking.status = "completed";
    booking.exitTime = new Date();

    slot.status = "available";
    slot.vehicleNumber = null;

    await booking.save();
    await slot.save();

    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "exit",
      result: "success",
      reason,
      message: "Exit marked successfully",
      bookingStatusBefore: statusBefore,
      bookingStatusAfter: booking.status,
      startedAt: operationStartedAt,
    });

    return booking;
  } catch (error) {
    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "exit",
      result: "failed",
      reason,
      errorCode: error.errorCode || "EXIT_FAILED",
      message: error.message,
      bookingStatusBefore: statusBefore,
      bookingStatusAfter: booking?.status || null,
      startedAt: operationStartedAt,
    });

    throw error;
  }
};

// ✅ Get gate activity logs (Admin filtered)
exports.getGateLogs = async (admin, query = {}) => {
  ensureAdminParking(admin);

  const filter = { parking: admin.parking };

  if (query.bookingCode) {
    filter.bookingCode = normalizeBookingCode(query.bookingCode);
  }

  if (query.action) {
    filter.action = query.action;
  }

  if (query.result) {
    filter.result = query.result;
  }

  if (query.errorCode) {
    filter.errorCode = query.errorCode;
  }

  if (query.isOverride === "true") {
    filter.isOverride = true;
  }

  if (query.isOverride === "false") {
    filter.isOverride = false;
  }

  const limit = Math.min(Number(query.limit) || 50, 200);

  return GateActivity.find(filter)
    .populate("admin", "fullName email")
    .populate("booking", "bookingCode status entryTime exitTime")
    .sort({ createdAt: -1 })
    .limit(limit);
};

// ✅ Phase 3 - Exception buckets for operations dashboard
exports.getExceptionBuckets = async (admin, query = {}) => {
  ensureAdminParking(admin);

  const limit = Math.min(Number(query.limit) || 25, 100);
  const now = new Date();

  const [invalidCodeAttempts, noShows, overstays, pendingPaymentAtExit] = await Promise.all([
    GateActivity.find({
      parking: admin.parking,
      action: "verify",
      result: "failed",
      errorCode: "WRONG_CODE",
    })
      .populate("admin", "fullName email")
      .sort({ createdAt: -1 })
      .limit(limit),

    Booking.find({
      parking: admin.parking,
      status: "confirmed",
      endTime: { $lt: now },
      entryTime: null,
    })
      .populate("user", "fullName email mobile vehicleNumber")
      .populate("slot", "label")
      .sort({ endTime: -1 })
      .limit(limit),

    Booking.find({
      parking: admin.parking,
      status: "active",
      endTime: { $lt: now },
    })
      .populate("user", "fullName email mobile vehicleNumber")
      .populate("slot", "label")
      .sort({ endTime: 1 })
      .limit(limit),

    Booking.find({
      parking: admin.parking,
      paymentStatus: { $ne: "paid" },
      $or: [
        { status: "active" },
        { status: "completed", exitTime: { $ne: null } },
      ],
    })
      .populate("user", "fullName email mobile vehicleNumber")
      .populate("slot", "label")
      .sort({ updatedAt: -1 })
      .limit(limit),
  ]);

  return {
    counts: {
      invalidCodeAttempts: invalidCodeAttempts.length,
      noShows: noShows.length,
      overstays: overstays.length,
      pendingPaymentAtExit: pendingPaymentAtExit.length,
    },
    data: {
      invalidCodeAttempts,
      noShows,
      overstays,
      pendingPaymentAtExit,
    },
  };
};

const validateOverrideType = (overrideType) => {
  if (!Object.values(OVERRIDE_TYPES).includes(overrideType)) {
    throw createGateError(400, "INVALID_OVERRIDE", "Invalid override type");
  }
};

// ✅ Phase 3 - Override action with mandatory reason + traceability
exports.applyGateOverride = async ({ bookingCode, overrideType, reason }, admin) => {
  const normalized = normalizeBookingCode(bookingCode);
  let booking = null;
  let statusBefore = null;
  const finalReason = String(reason || "").trim();
  const operationStartedAt = new Date();

  try {
    ensureAdminParking(admin);
    validateOverrideType(overrideType);

    if (!finalReason) {
      throw createGateError(400, "MANDATORY_REASON", "Override reason is mandatory");
    }

    const found = await getBookingByCodeOrThrow(normalized);
    booking = found.booking;
    statusBefore = booking.status;

    ensureAdminOwnsBookingParking(booking, admin);

    const slot = await Slot.findById(booking.slot);
    if (!slot) {
      throw createGateError(404, "SLOT_NOT_FOUND", "Slot not found");
    }

    const now = new Date();

    if (overrideType === OVERRIDE_TYPES.ALLOW_ENTRY) {
      if (booking.status === "active") {
        throw createGateError(400, "ALREADY_ENTERED", "Entry already marked");
      }
      if (booking.status === "completed") {
        throw createGateError(400, "ALREADY_EXITED", "Booking already exited");
      }
      if (booking.status === "cancelled") {
        throw createGateError(400, "CANCELLED", "Cancelled booking cannot be overridden to entry");
      }

      booking.status = "active";
      booking.entryTime = booking.entryTime || now;
      slot.status = "occupied";
      slot.vehicleNumber = booking.vehicleNumber || null;
    }

    if (overrideType === OVERRIDE_TYPES.ALLOW_EXIT_PENDING_PAYMENT) {
      if (booking.status === "completed") {
        throw createGateError(400, "ALREADY_EXITED", "Exit already marked for this booking");
      }
      if (booking.status !== "active") {
        throw createGateError(400, "ENTRY_NOT_DONE", "Booking must be active before forced exit");
      }

      booking.status = "completed";
      booking.exitTime = now;
      if (booking.paymentStatus === "paid") {
        booking.paymentStatus = "pending";
      }
      slot.status = "available";
      slot.vehicleNumber = null;
    }

    if (overrideType === OVERRIDE_TYPES.MARK_NO_SHOW) {
      if (booking.status === "completed") {
        throw createGateError(400, "ALREADY_EXITED", "Completed booking cannot be marked no-show");
      }
      if (booking.status === "active") {
        throw createGateError(400, "ALREADY_ENTERED", "Active booking cannot be marked no-show");
      }
      if (booking.status === "cancelled") {
        throw createGateError(400, "ALREADY_CANCELLED", "Booking already cancelled");
      }

      booking.status = "cancelled";
      slot.status = "available";
      slot.vehicleNumber = null;
    }

    if (overrideType === OVERRIDE_TYPES.FORCE_COMPLETE_OVERSTAY) {
      if (booking.status === "completed") {
        throw createGateError(400, "ALREADY_EXITED", "Booking already exited");
      }
      if (booking.status !== "active") {
        throw createGateError(400, "ENTRY_NOT_DONE", "Only active overstays can be force completed");
      }

      booking.status = "completed";
      booking.exitTime = now;
      slot.status = "available";
      slot.vehicleNumber = null;
    }

    await booking.save();
    await slot.save();

    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "override",
      result: "success",
      reason: finalReason,
      message: `Override applied: ${overrideType}`,
      bookingStatusBefore: statusBefore,
      bookingStatusAfter: booking.status,
      isOverride: true,
      overrideType,
      startedAt: operationStartedAt,
    });

    return booking;
  } catch (error) {
    await logGateActivity({
      booking,
      bookingCode: normalized,
      admin,
      action: "override",
      result: "failed",
      reason: finalReason,
      errorCode: error.errorCode || "OVERRIDE_FAILED",
      message: error.message,
      bookingStatusBefore: statusBefore,
      bookingStatusAfter: booking?.status || null,
      isOverride: true,
      overrideType: overrideType || null,
      startedAt: operationStartedAt,
    });

    throw error;
  }
};

// ✅ Phase 3 - Header/sidebar alert summary
exports.getOperationalAlerts = async (admin) => {
  ensureAdminParking(admin);

  const now = new Date();

  const [invalidCodeAttempts, noShows, overstays, pendingPaymentAtExit] = await Promise.all([
    GateActivity.countDocuments({
      parking: admin.parking,
      action: "verify",
      result: "failed",
      errorCode: "WRONG_CODE",
      createdAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
    }),
    Booking.countDocuments({
      parking: admin.parking,
      status: "confirmed",
      endTime: { $lt: now },
      entryTime: null,
    }),
    Booking.countDocuments({
      parking: admin.parking,
      status: "active",
      endTime: { $lt: now },
    }),
    Booking.countDocuments({
      parking: admin.parking,
      paymentStatus: { $ne: "paid" },
      $or: [
        { status: "active" },
        { status: "completed", exitTime: { $ne: null } },
      ],
    }),
  ]);

  return {
    invalidCodeAttempts,
    noShows,
    overstays,
    pendingPaymentAtExit,
    total: invalidCodeAttempts + noShows + overstays + pendingPaymentAtExit,
  };
};

// ✅ Phase 3 - Shift notes and handover comments
exports.createShiftNote = async (admin, payload = {}) => {
  ensureAdminParking(admin);

  const note = String(payload.note || "").trim();
  const handoverComment = String(payload.handoverComment || "").trim();

  if (!note && !handoverComment) {
    throw createGateError(400, "NOTE_REQUIRED", "Either note or handover comment is required");
  }

  return ShiftNote.create({
    parking: admin.parking,
    admin: admin.id,
    note: note || handoverComment,
    handoverComment,
  });
};

exports.getShiftNotes = async (admin, query = {}) => {
  ensureAdminParking(admin);

  const limit = Math.min(Number(query.limit) || 30, 100);

  return ShiftNote.find({ parking: admin.parking })
    .populate("admin", "fullName email")
    .sort({ createdAt: -1 })
    .limit(limit);
};
