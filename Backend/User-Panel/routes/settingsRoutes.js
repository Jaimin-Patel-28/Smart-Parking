const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settingsController");
const authMiddleware = require("../../middleware/authMiddleware");

// Get settings
router.get("/", authMiddleware, settingsController.getSettings);

// Update settings
router.patch("/", authMiddleware, settingsController.updateSettings);

module.exports = router;
