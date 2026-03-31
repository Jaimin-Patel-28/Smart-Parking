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
        { location: { $regex: search, $options: "i" } }
      ];
    }

    const parkings = await Parking.find(query).sort({ name: 1 });
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
2. Get Parking Details + Available Slots
Supports time slot filtering with 30min buffer rule
*/
exports.getParkingDetails = async (req, res) => {
  try {
    const parkingId = req.params.id;
    const { startTime, endTime } = req.query;
    const parking = await Parking.findById(parkingId);

    // Get ALL slots
    const slots = await Slot.find({ parkingId: parkingId }).lean();

    const buffer = 30 * 60 * 1000;
    let reservedStart, reservedEnd;

    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      reservedStart = new Date(start.getTime() - buffer);
      reservedEnd = new Date(end.getTime() + buffer);

      // Mark unavailable slots (physical status OR time conflict)
      for (let slot of slots) {
        if (slot.status !== 'available') {
          slot.isAvailableForTime = false;
          continue;
        }

        // Check time conflict
        const conflict = await Booking.findOne({
          slot: slot._id,
          startTime: { $lt: reservedEnd },
          endTime: { $gt: reservedStart }
        });
        slot.isAvailableForTime = !conflict;
        slot.timeConflict = conflict;
      }
    } else {
      // No time - use current status
      for (let slot of slots) {
        slot.isAvailableForTime = slot.status === 'available';
      }
    }

    // Count
    const availableSlots = slots.filter(s => s.isAvailableForTime || s.status === 'available').length;
    const totalSlots = slots.length;

    res.json({
      parking,
      slots,
      availabilitySummary: {
        available: availableSlots,
        total: totalSlots,
        occupied: totalSlots - availableSlots
      },
      reservedStart: reservedStart,
      reservedEnd: reservedEnd
    });
  } catch (error) {
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
      const level = slot.floor || 'Ground';
      if (!acc[level]) acc[level] = [];
      acc[level].push(slot);
      return acc;
    }, {});
    
    res.json({
      slots,
      groupedSlots: grouped,
      filters: { parkingId, status },
      total: slots.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


