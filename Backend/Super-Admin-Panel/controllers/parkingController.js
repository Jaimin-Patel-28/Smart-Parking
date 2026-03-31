const Parking = require("../models/Parking");
const Slot = require("../models/Slot");
const generateSlots = require("../utils/generateSlots");

// GET ALL PARKINGS
exports.getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find().sort({ createdAt: -1 });

    res.json(parkings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PARKING BY ID
exports.getParkingById = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id);

    if (!parking) return res.status(404).json({ message: "Parking not found" });

    const slots = await Slot.find({ parkingId: parking._id });

    res.json({
      ...parking.toObject(),
      slots,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PARKING
exports.createParking = async (req, res) => {
  try {
    const { name, location, totalSlots, basePrice, status } = req.body;

    const parking = new Parking({
      name,
      location,
      totalSlots,
      basePrice,
      status,
    });

    const savedParking = await parking.save();

    // generate slots automatically
    await generateSlots(savedParking._id, totalSlots);

    res.status(201).json(savedParking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PARKING
exports.updateParking = async (req, res) => {
  try {
    const { name, location, totalSlots, basePrice, status } = req.body;

    const parking = await Parking.findById(req.params.id);

    if (!parking) return res.status(404).json({ message: "Parking not found" });

    parking.name = name;
    parking.location = location;
    parking.totalSlots = totalSlots;
    parking.basePrice = basePrice;
    parking.status = status;

    const updated = await parking.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PARKING
exports.deleteParking = async (req, res) => {
  try {
    const parkingId = req.params.id;

    const parking = await Parking.findById(parkingId);

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    // Delete slots belonging to parking
    await Slot.deleteMany({ parkingId });

    // Delete parking
    await Parking.findByIdAndDelete(parkingId);

    res.json({ message: "Parking deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting parking" });
  }
};
