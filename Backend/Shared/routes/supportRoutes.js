const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { isAdminOrSuperAdmin } = require("../../middleware/roleMiddleware");
const supportController = require("../controllers/supportController");

const router = express.Router();

router.get(
  "/tickets",
  authMiddleware,
  isAdminOrSuperAdmin,
  supportController.listTickets,
);
router.get("/my-tickets", authMiddleware, supportController.listMyTickets);
router.get(
  "/tickets/:id",
  authMiddleware,
  isAdminOrSuperAdmin,
  supportController.getTicket,
);
router.patch(
  "/my-tickets/:id/reopen",
  authMiddleware,
  supportController.reopenMyTicket,
);
router.patch(
  "/tickets/:id",
  authMiddleware,
  isAdminOrSuperAdmin,
  supportController.updateTicketStatus,
);

module.exports = router;