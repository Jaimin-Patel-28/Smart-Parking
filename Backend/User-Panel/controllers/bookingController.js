const Booking = require("../../Super-Admin-Panel/models/Booking");
const Slot = require("../../Super-Admin-Panel/models/Slot");
const Parking = require("../../Super-Admin-Panel/models/Parking");
const mongoose = require("mongoose");

/*
Generate Unique Booking Number
Example: PKR-A7F3K9
*/
const generateBookingNumber = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PKR-";

  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
};

/*
🔄 Automatic Slot Status Manager - Runs every 1 minute
Logic:
1. LOCK: confirmed/active bookings → now >= start-10min && now < start → "locked"
2. OCCUPY: locked slots → now >= start → "occupied"
3. RELEASE: any booking → now > end+10min → "available" + "completed"
4. TEMP LOCK: release temporary_locked after expires
*/
const BUFFER_MINS = 10;
setInterval(async () => {
  try {
    const now = new Date();
    const bufferMs = BUFFER_MINS * 60 * 1000;

    console.log(`[${now.toISOString()}] Running slot status check...`);

    // 1. LOCK upcoming bookings (pre-start buffer)
    const upcomingBookings = await Booking.find({
      status: { $in: ["confirmed", "active"] },
      startTime: { $gt: now },
      $expr: { $lte: [{ $subtract: ["$startTime", bufferMs] }, now] }
    }).populate("slot");

    for (let booking of upcomingBookings) {
      if (booking.slot.status !== "locked") {
        await Slot.findByIdAndUpdate(booking.slot._id, {
          status: "locked",
          lockExpiresAt: booking.startTime
        });
        console.log(`Locked slot ${booking.slot.label} for booking ${booking._id}`);
      }
    }

    // 2. OCCUPY locked slots when start time reached
    const lockedToOccupy = await Booking.find({
      status: { $in: ["confirmed", "active"] },
      startTime: { $lte: now }
    }).populate("slot", "status label _id");

    for (let booking of lockedToOccupy) {
      if (booking.slot.status === "locked") {
        await Slot.findByIdAndUpdate(booking.slot._id, {
          status: "occupied",
          bookedAt: now
        });
        console.log(`Occupied slot ${booking.slot.label} - booking started`);
      }
    }

    // 3. RELEASE completed bookings (post-end buffer)
    const completedBookings = await Booking.find({
      status: { $nin: ["completed", "cancelled"] },
      $expr: { $lt: [{ $add: ["$endTime", bufferMs] }, now] }
    }).populate('slot');

    for (let booking of completedBookings) {
      await Slot.findByIdAndUpdate(booking.slot._id, {
        status: "available",
        vehicleNumber: null,
        bookedAt: null,
        lockExpiresAt: null
      });
      await Booking.findByIdAndUpdate(booking._id, { status: "completed" });
      console.log(`Released slot ${booking.slot.label} + completed booking ${booking._id}`);
    }

    // 4. Release temporary locks
    await Slot.updateMany(
      {
        status: "temporary_locked",
        lockExpiresAt: { $lt: now }
      },
      {
        status: "available",
        lockExpiresAt: null
      }
    );

    console.log(`✅ Status check complete. Buffer: ${BUFFER_MINS}min`);
  } catch (error) {
    console.error("Slot manager error:", error);
  }
}, 60000); // Every 1 minute

/*
1. Temporary Slot Lock (5 minutes)
*/
exports.lockSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    console.log("Slot ID:", slotId);

    const slot = await Slot.findById(slotId);

    console.log("Slot Found:", slot);

    if (!slot) {
      return res.status(400).json({
        message: "Slot not found",
      });
    }

    if (slot.status !== "available") {
      return res.status(400).json({
        message: `Slot not available, current status: ${slot.status}`,
      });
    }

    slot.status = "temporary_locked";
    slot.lockExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await slot.save();

    res.json({
      message: "Slot locked",
      expiresAt: slot.lockExpiresAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/*
2. Confirm Booking
Check 30 minute buffer rule
*/
exports.confirmBooking = async (req, res) => {
  try {
    const { userId, parkingId, slotId, startTime, endTime, hourlyRate, vehicleNumber, paymentMethod } = req.body;

    const buffer = 30 * 60 * 1000;

    const start = new Date(startTime);
    const end = new Date(endTime);

    const reservedStart = new Date(start.getTime() - buffer);
    const reservedEnd = new Date(end.getTime() + buffer);

    console.log("Checking slot:", slotId);
    console.log("Start:", start);
    console.log("End:", end);

    console.log("Reserved Start:", reservedStart);
    console.log("Reserved End:", reservedEnd);

    const conflict = await Booking.findOne({
      slot: new mongoose.Types.ObjectId(slotId),
      startTime: { $lt: reservedEnd },
      endTime: { $gt: reservedStart },
    });

    console.log("Conflict Found:", conflict);

    const slot = await Slot.findById(slotId);

    if (
      !slot ||
      !["available", "temporary_locked"].includes(
        slot.status.trim().toLowerCase(),
      )
    ) {
      return res.status(400).json({
        message: `Slot is not available, current status: ${slot?.status}`,
      });
    }

    if (conflict !== null) {
      return res.status(400).json({
        message: "Slot not available",
      });
    }

    const duration = (end - start) / (1000 * 60 * 60);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    if (!hourlyRate || isNaN(Number(hourlyRate)) ) {
      return res.status(400).json({ message: "hourlyRate is required and must be numeric" });
    }

    const totalAmount = duration * Number(hourlyRate);

    const normalizedPaymentMethod =
      paymentMethod === "cash"
        ? "cash_on_counter"
        : paymentMethod || "upi";

    const paymentStatus =
      normalizedPaymentMethod === "cash_on_counter" ? "pending" : "paid";

    const booking = await Booking.create({
      user: userId,
      parking: parkingId,
      slot: slotId,
      vehicleNumber: vehicleNumber || null,
      startTime: start,
      endTime: end,
      duration,
      totalAmount,
      paymentMethod: normalizedPaymentMethod,
      paymentStatus,
      status: "confirmed",
    });

    // Set initial slot status based on startTime
    const now = new Date();
    const initialStatus = (start > now) ? "locked" : "occupied";
    const lockUntil = (start > now) ? start : end;

    await Slot.findByIdAndUpdate(slotId, {
      status: initialStatus,
      lockExpiresAt: lockUntil
    });

    res.json({
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/*
3. Smart Buffer Booking (lock startTime-buffer, release endTime+buffer)
*/
exports.bookSlot = async (req, res) => {
  try {
    const { userId, parkingId, slotId, hours = 1 } = req.body;

    if (!userId || !parkingId || !slotId || !hours) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const hoursNum = parseInt(hours);
    const buffer = 30 * 60 * 1000;
    const start = new Date();
    const end = new Date(start.getTime() + hoursNum * 60 * 60 * 1000);

    // Lock from start-buffer
    const lockStart = new Date(start.getTime() - buffer);
    const lockEnd = new Date(end.getTime() + buffer);

    // Check conflicts including buffer
    const conflict = await Booking.findOne({
      slot: slotId,
      $or: [
        { startTime: { $lt: lockEnd }, endTime: { $gt: lockStart } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ 
        message: "Slot booked during this time (30min buffer applied)",
        conflictTime: conflict.startTime
      });
    }

    // Physical slot check
    const slot = await Slot.findById(slotId);
    if (!slot || slot.status !== "available") {
      return res.status(400).json({ message: "Slot not available" });
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
      status: "confirmed",
      paymentStatus: "paid"
    });

    // Set status based on start time
    const now = new Date();
    if (start > now) {
      slot.status = "locked";
      slot.lockExpiresAt = start; // Will auto-occupy at start
    } else {
      slot.status = "occupied";
      slot.lockExpiresAt = lockEnd;
    }
    await slot.save();

    await booking.populate(['parking', 'slot']);

    const bookingId = `BK${booking._id.toString().slice(-6).toUpperCase()}`;

    res.json({
      message: "Booked! Slot locked until end+30min buffer.",
      bookingId,
      bufferLockUntil: lockEnd.toLocaleString(),
      booking
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: error.message });
  }
};

/*
4. Get User Booking History
*/
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

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
    const { userId } = req.params;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: { $in: ['confirmed', 'active'] },
      startTime: { $lte: now },
      endTime: { $gte: now }
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
    const { userId } = req.params;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: { $in: ['confirmed', 'active'] },
      startTime: { $gt: now }
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
    const { userId } = req.params;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: "completed",
      endTime: { $lt: now }
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
8. Extend Active Booking
*/
exports.extendBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { extraHours } = req.body;
    const userId = req.user?.id || req.user?._id; // Assume auth middleware adds req.user

    if (!extraHours || extraHours < 1 || extraHours > 24) {
      return res.status(400).json({ message: "extraHours must be 1-24" });
    }

    const booking = await Booking.findOne({ _id: id, user: userId })
      .populate("parking", "basePrice");

    if (!booking) {
      return res.status(400).json({ message: "Booking not found" });
    }

    if (booking.status !== 'active' && booking.status !== 'confirmed') {
      return res.status(400).json({ message: "Can only extend active/confirmed bookings" });
    }

    const now = new Date();
    if (now > booking.endTime) {
      return res.status(400).json({ message: "Booking has expired" });
    }

    const buffer = 30 * 60 * 1000;
    const oldEnd = booking.endTime;
    const newEnd = new Date(oldEnd.getTime() + extraHours * 60 * 60 * 1000);
    const reservedStart = new Date(oldEnd.getTime() - buffer);
    const reservedEnd = new Date(newEnd.getTime() + buffer);

    // Check conflicts with other bookings on same slot
    const conflict = await Booking.findOne({
      slot: booking.slot,
      _id: { $ne: id },
      $or: [
        { startTime: { $lt: reservedEnd, $gte: reservedStart } },
        { endTime: { $gt: reservedStart, $lte: reservedEnd } },
        { startTime: { $lte: reservedStart }, endTime: { $gte: reservedEnd } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: "Slot not available for extension (conflict)" });
    }

    // Update
    const hourlyRate = booking.parking.basePrice;
    booking.duration += parseInt(extraHours);
    booking.endTime = newEnd;
    booking.totalAmount += hourlyRate * parseInt(extraHours);

    await booking.save();

    await booking.populate("slot", "label");

    res.json({
      message: "Booking extended successfully",
      booking
    });
  } catch (error) {
    console.error("Extend error:", error);
    res.status(500).json({ error: error.message });
  }
};

/*
9. Edit Booking Date/Time (upcoming only)
*/
exports.editBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!startTime || !endTime) {
      return res.status(400).json({ message: "startTime and endTime required" });
    }

    const booking = await Booking.findOne({ _id: id, user: userId }).populate('slot parking');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ message: "Can only edit confirmed upcoming bookings" });
    }

    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);
    const buffer = 30 * 60 * 1000;
    const reservedStart = new Date(newStart.getTime() - buffer);
    const reservedEnd = new Date(newEnd.getTime() + buffer);

    // Check conflicts (same slot, overlapping time)
    const conflict = await Booking.findOne({
      slot: booking.slot._id,
      _id: { $ne: id },
      $or: [
        { startTime: { $lt: reservedEnd, $gte: reservedStart } },
        { endTime: { $gt: reservedStart, $lte: reservedEnd } },
        { startTime: { $lte: reservedStart }, endTime: { $gte: reservedEnd } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: "Slot unavailable for new times (conflict found)" });
    }

    // Update booking
    booking.startTime = newStart;
    booking.endTime = newEnd;
    booking.duration = (newEnd - newStart) / (1000 * 60 * 60);
    booking.totalAmount = booking.duration * booking.parking.basePrice;

    await booking.save();

    res.json({
      message: "Booking updated successfully",
      booking
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
    console.log('🧑 User from token:', req.user);
    
    const { id } = req.params;
    const userId = req.user.id;

    console.log('🔍 Looking for booking:', id, 'by user:', userId);
    
    const booking = await Booking.findOne({ _id: id, user: userId }).populate('slot');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or not owned by user" });
    }

    console.log('📋 Booking found:', booking.status, booking.user.toString() === userId);

    if (!['confirmed', 'active'].includes(booking.status)) {
      return res.status(400).json({ message: "Can only cancel confirmed or active bookings" });
    }

    // Cancel & release slot
    booking.status = 'cancelled';
    await booking.save();

    await Slot.findByIdAndUpdate(booking.slot._id, {
      status: 'available',
      lockExpiresAt: null,
      bookedAt: null,
      vehicleNumber: null
    });

    res.json({
      message: "Booking cancelled successfully",
      booking
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ error: error.message });
  }
};
