const express = require("express");
const router = express.Router();

const {
  getAllParkings,
  getParkingById,
  createParking,
  updateParking,
  deleteParking,
} = require("../controllers/parkingController");

// GET ALL PARKINGS
router.get("/", getAllParkings);

// GET PARKING BY ID
router.get("/:id", getParkingById);

// CREATE PARKING
router.post("/add", createParking);

// UPDATE PARKING
router.put("/:id", updateParking);

// DELETE PARKING
router.delete("/:id", deleteParking);

module.exports = router;
