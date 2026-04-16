const Booking = require("../../Super-Admin-Panel/models/Booking");
const Slot = require("../../Super-Admin-Panel/models/Slot");
const Parking = require("../../Super-Admin-Panel/models/Parking");
const Transaction = require("../../Super-Admin-Panel/models/Transaction");
const {
  createWalletIfNotExists,
} = require("../../Super-Admin-Panel/Services/walletService");
const {
  deductMoney,
  refundMoney,
} = require("../../Super-Admin-Panel/Services/transactionService");
const {
  sendNotification,
} = require("../../Shared/services/notification.service");
const mongoose = require("mongoose");

/*
Generate Unique Booking Number
Example: PKR-A7F3K9
*/
const generateBookingNumber = () => {
  const value = Math.floor(1000 + Math.random() * 9000);
  return `PRK-${value}`;
};

const generateUniqueBookingCode = async () => {
  let code = generateBookingNumber();

  while (await Booking.exists({ bookingCode: code })) {
    code = generateBookingNumber();
  }

  return code;
};

/*
🔄 Automatic Slot Status Manager - Runs every 1 minute
Logic:
1. OCCUPY: start time reached → "occupied"
2. RELEASE: end time + buffer passed → "available" + "completed"
3. TEMP LOCK: release temporary_locked after expires
NOTE: No pre-locking! Only time-based logic.
*/
const BUFFER_MINS = 15;
setInterval(async () => {
  try {
    const now = new Date();
    const bufferMs = BUFFER_MINS * 60 * 1000;

    console.log(`[${now.toISOString()}] Running slot status check...`);

    // 1. OCCUPY slots when booking start time reached
    const bookingsToOccupy = await Booking.find({
      status: { $in: ["confirmed", "active"] },
      startTime: { $lte: now },
      endTime: { $gt: now },
    }).populate("slot", "status label _id");

    for (let booking of bookingsToOccupy) {
      if (booking.slot.status !== "occupied") {
        await Slot.findByIdAndUpdate(booking.slot._id, {
          status: "occupied",
          bookedAt: now,
        });
        console.log(
          `[AUTO] Occupied slot ${booking.slot.label} - booking active`,
        );
      }
    }

    // 2. RELEASE completed bookings (end time + buffer passed)
    const completedBookings = await Booking.find({
      status: { $nin: ["completed", "cancelled"] },
      endTime: { $lt: now },
      $expr: { $lt: [{ $add: ["$endTime", bufferMs] }, now] },
    }).populate("slot", "label _id");

    for (let booking of completedBookings) {
      await Slot.findByIdAndUpdate(booking.slot._id, {
        status: "available",
        vehicleNumber: null,
        bookedAt: null,
        lockExpiresAt: null,
      });
      await Booking.findByIdAndUpdate(booking._id, { status: "completed" });
      console.log(
        `[AUTO] Released slot ${booking.slot.label} + completed booking`,
      );
    }

    // 3. Release temporary locks (hold expired)
    await Slot.updateMany(
      {
        status: "temporary_locked",
        lockExpiresAt: { $lt: now },
      },
      {
        status: "available",
        lockExpiresAt: null,
      },
    );

    console.log(`✅ Status check complete. Buffer: ${BUFFER_MINS}min`);
  } catch (error) {
    console.error("Slot manager error:", error);
  }
}, 60000); // Every 1 minute

/*
1. Temporary Slot Lock (5 minutes hold without confirming)
Used to reserve slot while user completes payment/booking confirmation
*/
exports.lockSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    console.log("[LOCK SLOT] Slot ID:", slotId);

    const slot = await Slot.findById(slotId);

    console.log(
      "[LOCK SLOT] Slot Found:",
      slot?.label,
      "Status:",
      slot?.status,
    );

    if (!slot) {
      return res.status(400).json({
        message: "Slot not found",
      });
    }

    // ✅ FIXED: Only reject if occupied or already temporary locked
    // Allow locking even if status is "available" (ignoring "locked" status)
    if (slot.status === "occupied" || slot.status === "temporary_locked") {
      return res.status(400).json({
        message: `Slot not available, current status: ${slot.status}`,
        currentStatus: slot.status,
      });
    }

    // Lock slot for 5 minutes (user has 5 minutes to complete booking)
    slot.status = "temporary_locked";
    slot.lockExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await slot.save();

    console.log(`[LOCK SLOT] ✅ Locked ${slot.label} for 5 minutes`);

    res.json({
      message: "Slot locked for 5 minutes (confirmBooking within this time)",
      slotId: slot._id,
      expiresAt: slot.lockExpiresAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/*
2. Confirm Booking - with 15min buffer conflict check
Buffer Logic: Booking blocks slot for 15 minutes BEFORE and AFTER the actual booking time
Example: 2:00 PM - 2:15 PM booking → Slot locked 1:45 PM - 2:30 PM
Conflict Check: Allow ONLY IF (newStart >= blockedEnd) OR (newEnd <= blockedStart)
*/
exports.confirmBooking = async (req, res) => {
  try {
    const {
      parkingId,
      slotId,
      startTime,
      endTime,
      hourlyRate,
      vehicleNumber,
      paymentMethod,
    } = req.body;
    const userId = req.user.id;

    const buffer = 15 * 60 * 1000;

    const start = new Date(startTime);
    const end = new Date(endTime);

    // ✅ Apply buffer to NEW booking
    const newBlockedStart = new Date(start.getTime() - buffer);
    const newBlockedEnd = new Date(end.getTime() + buffer);

    console.log("\n=== CONFIRM BOOKING ===");
    console.log(`Slot: ${slotId}`);
    console.log(`Requested: ${start.toISOString()} → ${end.toISOString()}`);
    console.log(
      `Buffered: ${newBlockedStart.toISOString()} → ${newBlockedEnd.toISOString()}`,
    );

    // ✅ Get all existing bookings for this slot
    const existingBookings = await Booking.find({
      slot: slotId,
      status: { $in: ["confirmed", "active"] }, // ❗ removed completed
    });

    let conflictFound = false;

    for (let booking of existingBookings) {
      // ✅ Apply buffer to EXISTING booking
      const existingBlockedStart = new Date(
        new Date(booking.startTime).getTime() - buffer,
      );

      const existingBlockedEnd = new Date(
        new Date(booking.endTime).getTime() + buffer,
      );

      const overlap =
        newBlockedStart < existingBlockedEnd &&
        newBlockedEnd > existingBlockedStart;

      if (overlap) {
        conflictFound = true;

        console.log(
          `❌ Conflict with booking ${booking._id} (${booking.startTime} → ${booking.endTime})`,
        );

        break;
      }
    }

    if (conflictFound) {
      return res.status(400).json({
        message: "Slot not available for selected time (15 min buffer applied)",
      });
    }

    // ✅ OPTIONAL: allow temporary_locked OR available
    const slot = await Slot.findById(slotId);

    if (!slot || !["available", "temporary_locked"].includes(slot.status)) {
      return res.status(400).json({
        message: `Slot not available, current status: ${slot?.status}`,
      });
    }

    // 💰 Calculate price
    const duration = (end - start) / (1000 * 60 * 60);
    const totalAmount = duration * Number(hourlyRate);

    const normalizedPaymentMethod =
      paymentMethod === "cash" ? "cash_on_counter" : paymentMethod || "upi";

    const paymentStatus =
      normalizedPaymentMethod === "cash_on_counter" ? "pending" : "paid";

    // ✅ Create booking
    const booking = await Booking.create({
      user: userId,
      parking: parkingId,
      slot: slotId,
      vehicleNumber: vehicleNumber || null,
      startTime: start,
      endTime: end,
      duration,
      totalAmount,
      bookingCode: await generateUniqueBookingCode(),
      paymentMethod: normalizedPaymentMethod,
      paymentStatus,
      status: "confirmed",
    });

    console.log(`✅ Booking created: ${booking._id}`);

    let walletPayment = null;

    // Deduct only when wallet payment is explicitly selected.
    if (normalizedPaymentMethod === "wallet") {
      try {
        walletPayment = await deductMoney(userId, totalAmount, booking._id);
      } catch (walletError) {
        await Booking.findByIdAndDelete(booking._id);
        return res.status(400).json({
          message: walletError.message || "Wallet payment failed",
        });
      }
    }

    const now = new Date();

    if (start <= now && end >= now) {
      // Only mark occupied if currently active
      await Slot.findByIdAndUpdate(slotId, {
        status: "occupied",
      });
    } else {
      // Otherwise keep slot available
      await Slot.findByIdAndUpdate(slotId, {
        status: "available",
      });
    }

    await booking.populate([
      { path: "parking", select: "name location basePrice" },
      { path: "slot", select: "label status" },
      { path: "user", select: "fullName email mobile vehicleNumber" },
    ]);

    res.json({
      message: "Booking confirmed successfully",
      booking,
      bufferInfo: "15 minutes before & after applied",
    });

    void sendNotification({
      user: userId,
      type: "booking",
      title: "Booking confirmed",
      message: `Your booking ${booking._id.toString().slice(-6).toUpperCase()} has been confirmed.`,
      entityType: "booking",
      entityId: booking._id,
      metadata: {
        status: booking.status,
        paymentStatus,
        paymentMethod: normalizedPaymentMethod,
        bookingCode: booking.bookingCode,
        walletBalance: walletPayment?.wallet?.balance,
      },
    }).catch((notificationError) => {
      console.error("Booking notification error:", notificationError);
    });
  } catch (error) {
    console.error("Confirm booking error:", error);
    res.status(500).json({ error: error.message });
  }
};
/*
3. Quick Slot Booking - with 15min buffer conflict check
Instant booking for X hours from now with 15min buffer before & after
*/
exports.bookSlot = async (req, res) => {
  try {
    const { parkingId, slotId, hours = 1 } = req.body;
    const userId = req.user.id;

    if (!userId || !parkingId || !slotId || !hours) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const hoursNum = parseInt(hours);
    const buffer = 15 * 60 * 1000; // 15 minutes
    const start = new Date();
    const end = new Date(start.getTime() + hoursNum * 60 * 60 * 1000);

    // Calculate blocked period with 15min buffer
    const blockedStart = new Date(start.getTime() - buffer);
    const blockedEnd = new Date(end.getTime() + buffer);

    console.log(`[QUICK BOOK] Checking availability for slot ${slotId}`);
    console.log(`Requested: ${start.toISOString()} to ${end.toISOString()}`);
    console.log(
      `With buffer - Blocked: ${blockedStart.toISOString()} to ${blockedEnd.toISOString()}`,
    );

    // Check conflicts (status must be confirmed, active, or completed to block)
    const conflict = await Booking.findOne({
      slot: slotId,
      status: { $in: ["confirmed", "active", "completed"] },
      startTime: { $lt: blockedEnd },
      endTime: { $gt: blockedStart },
    });

    if (conflict) {
      console.log(`❌ Conflict found: ${conflict._id}`);
      return res.status(400).json({
        message:
          "Slot booked during this time (15min buffer applied before and after)",
        conflictTime: conflict.startTime.toISOString(),
        bufferInfo: {
          buffer: "15 minutes",
          blockedPeriod: `${blockedStart.toISOString()} to ${blockedEnd.toISOString()}`,
        },
      });
    }

    // Physical slot check
    const slot = await Slot.findById(slotId);
    if (!slot || slot.status !== "available") {
      return res.status(400).json({
        message: "Slot not available",
        slotStatus: slot?.status,
      });
    }

    // Get price
    const parking = await Parking.findById(parkingId);
    const totalAmount = (parking?.basePrice || 50) * hoursNum;

    // Create booking
    const booking = await Booking.create({
      user: userId,
      parking: parkingId,
      slot: slotId,
      startTime: start,
      endTime: end,
      duration: hoursNum,
      totalAmount,
      bookingCode: await generateUniqueBookingCode(),
      status: "confirmed",
      paymentStatus: "paid",
    });

    console.log(`✅ Booking created: ${booking._id}`);

    const wallet = await createWalletIfNotExists(userId);
    await Transaction.create({
      user: userId,
      wallet: wallet._id,
      type: "debit",
      amount: totalAmount,
      status: "success",
      description: "Parking Booking Payment",
      booking: booking._id,
    });

    // Set status - instant booking is "occupied" (already started)
    slot.status = "occupied";
    slot.lockExpiresAt = blockedEnd; // Release after end + 15min buffer
    await slot.save();

    console.log(`Slot status: occupied until ${blockedEnd.toISOString()}`);

    await booking.populate(["parking", "slot"]);

    const bookingId = booking.bookingCode;

    res.json({
      message: "Booked successfully! Slot locked until end+15min buffer",
      bookingId,
      bufferInfo: {
        buffer: "15 minutes before and after",
        blockedUntil: blockedEnd.toISOString(),
      },
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: error.message });
  }
};

/*
Get Single Booking Detail
*/
exports.getBookingDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: id, user: userId })
      .populate("parking", "name location basePrice totalSlots occupiedSlots status")
      .populate("slot", "label status bookedAt lockExpiresAt")
      .populate("user", "fullName email mobile vehicleNumber");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const transactions = await Transaction.find({ booking: booking._id })
      .sort({ createdAt: -1 })
      .select("type amount status description createdAt")
      .populate("wallet", "balance");

    const bookingCode = booking.bookingCode || `PRK-${booking._id.toString().slice(-4).toUpperCase()}`;
    const qrPayload = JSON.stringify({
      bookingId: booking._id,
      bookingCode,
      userId: booking.user?._id,
      slotId: booking.slot?._id,
      parkingId: booking.parking?._id,
    });

    const now = new Date();
    const canCancel = ["confirmed", "active"].includes(booking.status);
    const canExtend =
      ["confirmed", "active"].includes(booking.status) && now <= booking.endTime;

    res.json({
      success: true,
      data: {
        ...booking.toObject(),
        bookingCode,
        qrPayload,
        accessCode: bookingCode,
        canCancel,
        canExtend,
        isUpcoming: booking.startTime > now,
        isOngoing: booking.startTime <= now && booking.endTime >= now,
        paymentTransactions: transactions,
      },
    });
  } catch (error) {
    console.error("Get booking details error:", error);
    res.status(500).json({ message: error.message });
  }
};

/*
4. Get User Booking History
*/
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate("parking", "name location")
      .populate("slot", "label")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
5. Get User Current/Active Bookings
Filter: confirmed/active && now between start/end
*/
exports.getCurrentBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: { $in: ["confirmed", "active"] },
      startTime: { $lte: now },
      endTime: { $gte: now },
    })
      .populate("parking", "name location basePrice")
      .populate("slot", "label")
      .sort({ startTime: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
6. Get User Upcoming Bookings (startTime > now)
*/
exports.getUpcomingBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: { $in: ["confirmed", "active"] },
      startTime: { $gt: now },
    })
      .populate("parking", "name location basePrice")
      .populate("slot", "label")
      .sort({ startTime: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
7. Get User Past Bookings (endTime < now)
*/
exports.getPastBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: "completed",
      endTime: { $lt: now },
    })
      .populate("parking", "name location")
      .populate("slot", "label")
      .sort({ endTime: -1 })
      .limit(50);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
8. Extend Active Booking - with 15min buffer conflict check
Buffer Logic: Check if extended booking (with 15min before & after) conflicts with other bookings
*/
exports.extendBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { extraHours } = req.body;
    const userId = req.user?.id || req.user?._id; // Assume auth middleware adds req.user

    if (!extraHours || extraHours < 1 || extraHours > 24) {
      return res.status(400).json({ message: "extraHours must be 1-24" });
    }

    const booking = await Booking.findOne({ _id: id, user: userId }).populate(
      "parking",
      "basePrice",
    );

    if (!booking) {
      return res.status(400).json({ message: "Booking not found" });
    }

    if (booking.status !== "active" && booking.status !== "confirmed") {
      return res
        .status(400)
        .json({ message: "Can only extend active/confirmed bookings" });
    }

    const now = new Date();
    if (now > booking.endTime) {
      return res.status(400).json({ message: "Booking has expired" });
    }

    const buffer = 15 * 60 * 1000;
    const newEnd = new Date(
      booking.endTime.getTime() + extraHours * 60 * 60 * 1000,
    );

    // Extended booking period: from startTime to newEnd, with 15min buffer on both sides
    const reservedStart = new Date(booking.startTime.getTime() - buffer);
    const reservedEnd = new Date(newEnd.getTime() + buffer);

    console.log(
      `[EXTEND] Checking conflict for slot ${booking.slot} from ${reservedStart} to ${reservedEnd}`,
    );

    // Check conflicts with OTHER bookings on same slot (with buffer applied)
    const conflict = await Booking.findOne({
      slot: booking.slot,
      _id: { $ne: id },
      status: { $in: ["confirmed", "active", "completed"] },
      startTime: { $lt: reservedEnd },
      endTime: { $gt: reservedStart },
    });

    console.log(`[EXTEND] Conflict found: ${conflict ? conflict._id : "None"}`);

    if (conflict) {
      return res.status(400).json({
        message:
          "Slot not available for extension (conflicts with another booking including 15min buffer)",
        conflictDetails: {
          conflictStart: conflict.startTime,
          conflictEnd: conflict.endTime,
        },
      });
    }

    // Update
    const hourlyRate = booking.parking.basePrice;
    const extraCharge = hourlyRate * parseInt(extraHours);

    if (booking.paymentStatus === "paid" && extraCharge > 0) {
      await deductMoney(userId, extraCharge, booking._id);
    }

    booking.duration += parseInt(extraHours);
    booking.endTime = newEnd;
    booking.totalAmount += extraCharge;

    await booking.save();

    await booking.populate("slot", "label");

    res.json({
      message: "Booking extended successfully",
      bufferApplied: {
        buffer: "15 minutes before and after",
        extendedUntil: newEnd.toISOString(),
      },
      booking,
    });

    void sendNotification({
      user: userId,
      type: "booking",
      title: "Booking extended",
      message: `Your booking ${booking._id.toString().slice(-6).toUpperCase()} was extended by ${extraHours} hour(s).`,
      entityType: "booking",
      entityId: booking._id,
      metadata: {
        extraHours: parseInt(extraHours),
        extraCharge,
        newEndTime: newEnd,
      },
    }).catch((notificationError) => {
      console.error("Extend notification error:", notificationError);
    });
  } catch (error) {
    console.error("Extend error:", error);
    res.status(500).json({ error: error.message });
  }
};

/*
9. Edit Booking Date/Time (confirmed upcoming only) - with 15min buffer conflict check
*/
exports.editBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "startTime and endTime required" });
    }

    const booking = await Booking.findOne({ _id: id, user: userId }).populate(
      "slot parking",
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "confirmed") {
      return res
        .status(400)
        .json({ message: "Can only edit confirmed upcoming bookings" });
    }

    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);
    const buffer = 15 * 60 * 1000;

    // Calculate blocked time with 15min buffer
    const blockedStart = new Date(newStart.getTime() - buffer);
    const blockedEnd = new Date(newEnd.getTime() + buffer);

    console.log(
      `[EDIT BOOKING] Checking conflict for slot ${booking.slot._id}`,
    );
    console.log(
      `New Time: ${newStart.toISOString()} to ${newEnd.toISOString()}`,
    );
    console.log(
      `With Buffer - Blocked: ${blockedStart.toISOString()} to ${blockedEnd.toISOString()}`,
    );

    // Check conflicts (OTHER bookings on same slot, excluding cancelled/rejected)
    const conflict = await Booking.findOne({
      slot: booking.slot._id,
      _id: { $ne: id },
      status: { $in: ["confirmed", "active", "completed"] },
      startTime: { $lt: blockedEnd },
      endTime: { $gt: blockedStart },
    });

    console.log(`Conflict: ${conflict ? "YES ❌" : "NO ✅"}`);

    if (conflict) {
      return res.status(400).json({
        message:
          "Slot unavailable for new times (conflicts with another booking including 15min buffer)",
        bufferInfo: {
          buffer: "15 minutes before and after",
          newBlockedPeriod: `${blockedStart.toISOString()} to ${blockedEnd.toISOString()}`,
        },
      });
    }

    // Update booking
    const durationHours = (newEnd - newStart) / (1000 * 60 * 60);
    booking.startTime = newStart;
    booking.endTime = newEnd;
    booking.duration = durationHours;
    booking.totalAmount = durationHours * booking.parking.basePrice;

    await booking.save();

    console.log(`✅ Booking ${id} updated successfully`);

    res.json({
      message: "Booking updated successfully",
      bufferApplied: "15 minutes before and after new time",
      booking,
    });
  } catch (error) {
    console.error("Edit booking error:", error);
    res.status(500).json({ error: error.message });
  }
};

/*
10. Cancel Booking
*/
exports.cancelBooking = async (req, res) => {
  try {
    console.log("🧑 User from token:", req.user);

    const { id } = req.params;
    const userId = req.user.id;

    console.log("🔍 Looking for booking:", id, "by user:", userId);

    const booking = await Booking.findOne({ _id: id, user: userId }).populate(
      "slot",
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or not owned by user" });
    }

    console.log(
      "📋 Booking found:",
      booking.status,
      booking.user.toString() === userId,
    );

    if (!["confirmed", "active"].includes(booking.status)) {
      return res
        .status(400)
        .json({ message: "Can only cancel confirmed or active bookings" });
    }

    const shouldRefund = booking.paymentStatus === "paid";

    // Cancel & release slot
    booking.status = "cancelled";

    if (shouldRefund) {
      booking.paymentStatus = "refunded";
    }

    await booking.save();

    if (shouldRefund) {
      await refundMoney(userId, booking.totalAmount, booking._id);
    }

    await Slot.findByIdAndUpdate(booking.slot._id, {
      status: "available",
      lockExpiresAt: null,
      bookedAt: null,
      vehicleNumber: null,
    });

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });

    void sendNotification({
      user: userId,
      type: shouldRefund ? "refund" : "booking",
      title: shouldRefund ? "Booking cancelled and refunded" : "Booking cancelled",
      message: shouldRefund
        ? `Your booking ${booking._id.toString().slice(-6).toUpperCase()} was cancelled and refunded.`
        : `Your booking ${booking._id.toString().slice(-6).toUpperCase()} was cancelled.`,
      entityType: "booking",
      entityId: booking._id,
      metadata: {
        refunded: shouldRefund,
        paymentStatus: booking.paymentStatus,
      },
    }).catch((notificationError) => {
      console.error("Cancel notification error:", notificationError);
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ error: error.message });
  }
};
