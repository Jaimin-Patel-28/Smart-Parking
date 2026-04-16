const Notification = require("../../User-Panel/models/Notification");

const sendNotification = async ({
  user,
  type = "system",
  title,
  message,
  entityType = null,
  entityId = null,
  metadata = {},
}) => {
  if (!user || !title || !message) {
    return null;
  }

  const notification = await Notification.create({
    user,
    type,
    title,
    message,
    entityType,
    entityId,
    metadata,
  });

  console.log(`Notification to ${user}: ${title}`);

  return notification;
};

const getNotifications = async (
  userId,
  { page = 1, limit = 20, unreadOnly = false } = {},
) => {
  const query = { user: userId };

  if (unreadOnly) {
    query.isRead = false;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Notification.countDocuments(query),
    Notification.countDocuments({ user: userId, isRead: false }),
  ]);

  return {
    notifications,
    total,
    unreadCount,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.max(1, Math.ceil(total / Number(limit))),
  };
};

const getUnreadCount = async (userId) => {
  return Notification.countDocuments({ user: userId, isRead: false });
};

const markNotificationAsRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { isRead: true, readAt: new Date() },
    { new: true },
  );
};

const markAllNotificationsAsRead = async (userId) => {
  return Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true, readAt: new Date() },
  );
};

const clearNotifications = async (userId) => {
  return Notification.deleteMany({ user: userId });
};

const deleteNotification = async (notificationId, userId) => {
  return Notification.findOneAndDelete({ _id: notificationId, user: userId });
};

module.exports = {
  sendNotification,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  deleteNotification,
};
