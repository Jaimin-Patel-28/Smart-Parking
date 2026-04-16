const Parking = require("../../Super-Admin-Panel/models/Parking");
const Slot = require("../../Super-Admin-Panel/models/Slot");
const Booking = require("../../Super-Admin-Panel/models/Booking");

/*
========================================
  PARKING CONTROLLER - User Panel
  Features: Find & Browse Parking
========================================
*/

/*
1. Get All Active Parkings
Support search by name or location
*/
exports.getActiveParkings = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { status: "Active" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const parkings = await Parking.find(query).sort({ name: 1 }).lean();

    const now = new Date();
    const activeBookingCounts = await Booking.aggregate([
      {
        $match: {
          status: { $in: ["confirmed", "active"] },
          startTime: { $lte: now },
          endTime: { $gte: now },
        },
      },
      {
        $group: {
          _id: "$parking",
          count: { $sum: 1 },
        },
      },
    ]);

    const bookingCountMap = new Map(
      activeBookingCounts.map((item) => [item._id.toString(), item.count]),
    );

    const parkingsWithLiveAvailability = parkings.map((parking) => {
      const activeBookings = bookingCountMap.get(parking._id.toString()) || 0;
      const liveOccupiedSlots = Math.min(activeBookings, parking.totalSlots);
      const liveAvailableSlots = Math.max(
        parking.totalSlots - liveOccupiedSlots,
        0,
      );

      return {
        ...parking,
        activeBookings,
        occupiedSlots: liveOccupiedSlots,
        liveAvailableSlots,
      };
    });

    res.json(parkingsWithLiveAvailability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
2. Get Parking Details + Available Slots
Supports time slot filtering with 15min buffer rule
Buffer Logic: For a requested booking from startTime to endTime:
  - Calculate blocked period: (startTime - 15min) to (endTime + 15min)
  - Slot is AVAILABLE only if NO existing booking overlaps with blocked period
  - Formula: Allow ONLY IF (newStart >= blockedEnd) OR (newEnd <= blockedStart)
*/
exports.getParkingDetails = async (req, res) => {
  try {
    const parkingId = req.params.id;
    const { startTime, endTime } = req.query;

    const parking = await Parking.findById(parkingId);

    const slots = await Slot.find({ parkingId }).lean();

    const buffer = 15 * 60 * 1000; // 15 min

    // If no time selected → just return physical availability
    if (!startTime || !endTime) {
      const updatedSlots = slots.map((slot) => ({
        ...slot,
        isAvailableForTime: slot.status === "available",
      }));

      return res.json({
        parking,
        slots: updatedSlots,
      });
    }

    // Convert requested time
    const requestedStart = new Date(startTime);
    const requestedEnd = new Date(endTime);

    // Apply buffer to NEW booking (IMPORTANT)
    const requestedBlockedStart = new Date(requestedStart.getTime() - buffer);
    const requestedBlockedEnd = new Date(requestedEnd.getTime() + buffer);

    console.log("\n=== CHECKING SLOT AVAILABILITY ===");
    console.log(
      `Requested: ${requestedStart.toISOString()} → ${requestedEnd.toISOString()}`,
    );
    console.log(
      `With Buffer: ${requestedBlockedStart.toISOString()} → ${requestedBlockedEnd.toISOString()}`,
    );

    // 🔥 IMPORTANT: Fetch all relevant bookings once (optimized)
    const bookings = await Booking.find({
      parking: parkingId,
      status: { $in: ["confirmed", "active"] }, // ❗ removed "completed"
    }).lean();

    // Check each slot
    const updatedSlots = slots.map((slot) => {
      // Filter bookings for this slot
      const slotBookings = bookings.filter(
        (b) => b.slot.toString() === slot._id.toString(),
      );

      let isConflict = false;

      for (let booking of slotBookings) {
        // Apply buffer to EXISTING booking
        const existingBlockedStart = new Date(
          new Date(booking.startTime).getTime() - buffer,
        );

        const existingBlockedEnd = new Date(
          new Date(booking.endTime).getTime() + buffer,
        );

        // 🔥 Correct overlap check (buffer vs buffer)
        const overlap =
          requestedBlockedStart < existingBlockedEnd &&
          requestedBlockedEnd > existingBlockedStart;

        if (overlap) {
          isConflict = true;

          console.log(
            `❌ Slot ${slot.label} conflict with booking ${booking._id}`,
          );

          break;
        }
      }

      return {
        ...slot,
        isAvailableForTime: !isConflict,
      };
    });

    const availableCount = updatedSlots.filter(
      (s) => s.isAvailableForTime,
    ).length;

    res.json({
      parking,
      slots: updatedSlots,
      summary: {
        total: updatedSlots.length,
        available: availableCount,
        unavailable: updatedSlots.length - availableCount,
      },
      availabilitySummary: {
        total: updatedSlots.length,
        available: availableCount,
        unavailable: updatedSlots.length - availableCount,
      },
      bufferInfo: {
        buffer: "15 minutes before & after",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/*
3. Get Slots with Filters
Supports filtering by parkingId, status, and floor grouping
*/
exports.getSlots = async (req, res) => {
  try {
    const { parkingId, status, limit = 100 } = req.query;

    let query = {};
    if (parkingId) query.parkingId = parkingId;
    if (status) query.status = status;

    const slots = await Slot.find(query)
      .sort({ label: 1 })
      .limit(parseInt(limit))
      .lean();

    // Group by floor if available
    const grouped = slots.reduce((acc, slot) => {
      const level = slot.floor || "Ground";
      if (!acc[level]) acc[level] = [];
      acc[level].push(slot);
      return acc;
    }, {});

    res.json({
      slots,
      groupedSlots: grouped,
      filters: { parkingId, status },
      total: slots.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
