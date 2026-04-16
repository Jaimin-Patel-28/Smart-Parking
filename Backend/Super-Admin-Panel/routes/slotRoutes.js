const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

const {
  getSlotsByParking,
  updateSlotStatus,
  assignVehicle,
  releaseSlot,
  deleteSlot,
} = require("../controllers/slotController");

router.get("/:parkingId", auth, isSuperAdmin, getSlotsByParking);

router.put("/:id/status", auth, isSuperAdmin, updateSlotStatus);

router.put("/:id/assign", auth, isSuperAdmin, assignVehicle);

router.put("/:id/release", auth, isSuperAdmin, releaseSlot);
router.delete("/:id", auth, isSuperAdmin, deleteSlot);

module.exports = router;


