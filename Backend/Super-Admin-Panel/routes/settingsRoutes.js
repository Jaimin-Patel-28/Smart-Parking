const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

const {
  getSettings,
  updateGeneralSettings,
  updatePricingSettings,
  updateSecuritySettings,
  updateNotificationSettings,
} = require("../controllers/settingsController");

router.get("/", auth, isSuperAdmin, getSettings);
router.put("/general", auth, isSuperAdmin, updateGeneralSettings);
router.put("/pricing", auth, isSuperAdmin, updatePricingSettings);
router.put("/security", auth, isSuperAdmin, updateSecuritySettings);
router.put("/notifications", auth, isSuperAdmin, updateNotificationSettings);

module.exports = router;
