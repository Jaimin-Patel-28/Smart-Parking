const express = require("express");

const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", authMiddleware, notificationController.listNotifications);
router.get(
  "/unread-count",
  authMiddleware,
  notificationController.unreadCount,
);
router.patch("/read-all", authMiddleware, notificationController.markAllAsRead);
router.patch("/:id/read", authMiddleware, notificationController.markAsRead);
router.delete("/", authMiddleware, notificationController.clearAll);
router.delete("/:id", authMiddleware, notificationController.removeNotification);

module.exports = router;
