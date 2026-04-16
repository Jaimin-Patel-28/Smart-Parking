const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

const {
  getAllParkings,
  getParkingById,
  createParking,
  updateParking,
  deleteParking,
} = require("../controllers/parkingController");

// GET ALL PARKINGS
router.get("/", auth, isSuperAdmin, getAllParkings);

// GET PARKING BY ID
router.get("/:id", auth, isSuperAdmin, getParkingById);

// CREATE PARKING
router.post("/add", auth, isSuperAdmin, createParking);

// UPDATE PARKING
router.put("/:id", auth, isSuperAdmin, updateParking);

// DELETE PARKING
router.delete("/:id", auth, isSuperAdmin, deleteParking);

module.exports = router;
