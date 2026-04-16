const express = require("express");
const router = express.Router();

const controller = require("../controllers/adminBookingController");
const { isAdmin } = require("../../middleware/roleMiddleware");
const auth = require("../../middleware/authMiddleware");

router.get("/bookings", auth, isAdmin, controller.getBookings);
router.get("/bookings/:id", auth, isAdmin, controller.getBookingById);

router.put("/booking/:id/entry", auth, isAdmin, controller.markEntry);
router.put("/booking/:id/exit", auth, isAdmin, controller.markExit);

router.get("/gate/verify/:bookingCode", auth, isAdmin, controller.verifyByCode);
router.put("/gate/entry/:bookingCode", auth, isAdmin, controller.markEntryByCode);
router.put("/gate/exit/:bookingCode", auth, isAdmin, controller.markExitByCode);
router.get("/gate/logs", auth, isAdmin, controller.getGateLogs);
router.get("/gate/exceptions", auth, isAdmin, controller.getExceptions);
router.post("/gate/override", auth, isAdmin, controller.applyOverride);
router.get("/gate/alerts", auth, isAdmin, controller.getOperationalAlerts);
router.get("/gate/shift-notes", auth, isAdmin, controller.getShiftNotes);
router.post("/gate/shift-notes", auth, isAdmin, controller.createShiftNote);

// ✅ Phase 4 - Admin Profile Routes
router.get("/profile", auth, isAdmin, controller.getAdminProfile);
router.put("/profile", auth, isAdmin, controller.updateAdminProfile);

// ✅ Phase 4 - Admin Settings Routes
router.get("/settings", auth, isAdmin, controller.getAdminSettings);
router.put("/settings", auth, isAdmin, controller.updateAdminSettings);

// ✅ Phase 5 - Shift Metrics Routes
router.get("/shift-metrics", auth, isAdmin, controller.getShiftMetrics);

module.exports = router;
