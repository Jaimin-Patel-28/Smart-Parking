import api from "../../../Shared/Services/api";

const notificationService = {
  getNotifications: (params = {}) => api.get("/notifications", { params }),
  getUnreadCount: () => api.get("/notifications/unread-count"),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch("/notifications/read-all"),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  clearNotifications: () => api.delete("/notifications"),
};

export default notificationService;
