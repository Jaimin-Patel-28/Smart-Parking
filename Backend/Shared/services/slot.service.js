const Slot = require("../models/Slot");

exports.getSlotsByParking = async (parkingId) => {
  return await Slot.find({ parking: parkingId });
};

exports.updateSlotStatus = async (slotId, status) => {
  const slot = await Slot.findById(slotId);
  if (!slot) throw new Error("Slot not found");

  slot.status = status;
  await slot.save();

  return slot;
};
