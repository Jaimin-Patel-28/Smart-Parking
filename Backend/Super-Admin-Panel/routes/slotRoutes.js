const express = require("express");
const router = express.Router();

const {
  getSlotsByParking,
  updateSlotStatus,
  assignVehicle,
  releaseSlot,
  deleteSlot,
} = require("../controllers/slotController");

router.get("/:parkingId", getSlotsByParking);

router.put("/:id/status", updateSlotStatus);

router.put("/:id/assign", assignVehicle);

router.put("/:id/release", releaseSlot);
router.delete("/:id", deleteSlot);

module.exports = router;


