import { useCallback, useEffect, useState } from "react";
import notificationService from "../Services/notificationService";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const [{ data: notificationResponse }, { data: unreadResponse }] =
        await Promise.all([
          notificationService.getNotifications(params),
          notificationService.getUnreadCount(),
        ]);

      setNotifications(notificationResponse?.data?.notifications || []);
      setUnreadCount(unreadResponse?.unreadCount || 0);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  const markOneAsRead = useCallback(async (id) => {
    setActionLoading(true);
    try {
      await notificationService.markAsRead(id);
      setNotifications((current) =>
        current.map((item) =>
          item._id === id ? { ...item, isRead: true, readAt: new Date() } : item,
        ),
      );
      setUnreadCount((current) => Math.max(0, current - 1));
    } finally {
      setActionLoading(false);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setActionLoading(true);
    try {
      await notificationService.markAllAsRead();
      setNotifications((current) =>
        current.map((item) => ({ ...item, isRead: true, readAt: new Date() })),
      );
      setUnreadCount(0);
    } finally {
      setActionLoading(false);
    }
  }, []);

  const removeNotification = useCallback(async (id) => {
    setActionLoading(true);
    try {
      await notificationService.deleteNotification(id);
      setNotifications((current) => {
        const removed = current.find((item) => item._id === id);
        if (removed && !removed.isRead) {
          setUnreadCount((count) => Math.max(0, count - 1));
        }
        return current.filter((item) => item._id !== id);
      });
    } finally {
      setActionLoading(false);
    }
  }, []);

  const clearAll = useCallback(async () => {
    setActionLoading(true);
    try {
      await notificationService.clearNotifications();
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setActionLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    actionLoading,
    error,
    fetchNotifications,
    markOneAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };
};

export default useNotifications;
