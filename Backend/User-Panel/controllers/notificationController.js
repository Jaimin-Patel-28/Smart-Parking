const {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  deleteNotification,
} = require("../../Shared/services/notification.service");

const listNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit, unreadOnly } = req.query;

    const result = await getNotifications(userId, {
      page,
      limit,
      unreadOnly: unreadOnly === "true",
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await getUnreadCount(userId);

    res.json({
      success: true,
      unreadCount: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const notification = await markNotificationAsRead(id, userId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await markAllNotificationsAsRead(userId);

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearAll = async (req, res) => {
  try {
    const userId = req.user.id;
    await clearNotifications(userId);

    res.json({
      success: true,
      message: "Notifications cleared",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const notification = await deleteNotification(id, userId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listNotifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  clearAll,
  removeNotification,
};
