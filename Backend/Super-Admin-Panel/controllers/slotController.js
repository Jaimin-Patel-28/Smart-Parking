const Slot = require("../models/Slot");

// GET /api/admin/slots/:parkingId
exports.getSlotsByParking = async (req, res) => {
  try {
    const { parkingId } = req.params;
    console.log(`[${new Date().toISOString()}] Fetching slots for parking: ${parkingId}`);

    const slots = await Slot.find({ parkingId }).sort({ label: 1 });
    console.log(`Found ${slots.length} slots for parking ${parkingId}`);

    res.json(slots);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Fetch slots error for ${parkingId}:`, error);
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};


// PUT /api/admin/slots/:id/status
exports.updateSlotStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(`[${new Date().toISOString()}] Updating slot ${id} status to: ${status}`);

    const slot = await Slot.findByIdAndUpdate(id, { status }, { new: true });
    console.log(`Slot ${id} updated successfully. New status: ${slot.status}`);

    res.json(slot);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Update status error for slot ${id}:`, error);
    res.status(500).json({ message: "Failed to update slot status" });
  }
};


// PUT /api/admin/slots/:id/assign
exports.assignVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleNumber } = req.body;
    console.log(`[${new Date().toISOString()}] Assigning vehicle ${vehicleNumber} to slot ${id}`);

    const slot = await Slot.findByIdAndUpdate(
      id,
      {
        status: "occupied",
        vehicleNumber,
        bookedAt: new Date(),
      },
      { new: true },
    );
    console.log(`Vehicle assigned to slot ${id} successfully`);

    res.json(slot);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Assign vehicle error for slot ${id}:`, error);
    res.status(500).json({ message: "Failed to assign vehicle" });
  }
};


// PUT /api/admin/slots/:id/release
exports.releaseSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const Booking = require("../models/Booking");

    // Delete related bookings first
    const deletedBookings = await Booking.deleteMany({ slot: id });
    console.log(`Deleted ${deletedBookings.deletedCount} related bookings for slot ${id}`);

    const slot = await Slot.findByIdAndUpdate(
      id,
      {
        status: "available",
        vehicleNumber: null,
        bookedAt: null,
        lockExpiresAt: null,
      },
      { new: true },
    );

    console.log(`Slot ${id} released successfully - cleared ${deletedBookings.deletedCount} bookings`);
    res.json({ slot, deletedBookings });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Release slot error for ${id}:`, error);
    res.status(500).json({ message: "Failed to release slot" });
  }
};


// DELETE /api/admin/slots/:id
exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedSlot = await Slot.findByIdAndDelete(id);
    if (!deletedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    
    console.log(`Slot ${id} deleted successfully`);
    res.json({ message: "Slot deleted", slot: deletedSlot });
  } catch (error) {
    console.error("Delete slot error:", error);
    res.status(500).json({ message: "Failed to delete slot" });
  }
};

