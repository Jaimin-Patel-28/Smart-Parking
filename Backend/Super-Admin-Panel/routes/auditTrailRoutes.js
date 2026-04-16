const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");
const { getAuditTrails } = require("../controllers/auditTrailController");

router.get("/", auth, isSuperAdmin, getAuditTrails);

module.exports = router;
