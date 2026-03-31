const Slot = require("../models/Slot");

const generateSlots = async (parkingId, totalSlots) => {
  const slots = [];

  for (let i = 1; i <= totalSlots; i++) {
    slots.push({
      parkingId,
      label: `S${i}`,
    });
  }

  await Slot.insertMany(slots);
};

module.exports = generateSlots;
