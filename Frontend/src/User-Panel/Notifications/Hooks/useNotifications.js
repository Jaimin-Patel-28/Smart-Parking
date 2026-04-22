import { useCallback, useEffect, useState } from "react";
import notificationService from "../Services/notificationService";

const UNREAD_EVENT_NAME = "user-notifications-unread";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const emitUnreadCount = useCallback((count) => {
    window.dispatchEvent(
      new CustomEvent(UNREAD_EVENT_NAME, {
        detail: { unreadCount: Math.max(0, Number(count) || 0) },
      }),
    );
  }, []);

  const fetchNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const [{ data: notificationResponse }, { data: unreadResponse }] = await Promise.all([
        notificationService.getNotifications(params),
        notificationService.getUnreadCount(),
      ]);

      const nextNotifications = notificationResponse?.data?.notifications || notificationResponse?.data || [];
      const nextUnread = unreadResponse?.unreadCount || 0;

      setNotifications(nextNotifications);
      setUnreadCount(nextUnread);
      emitUnreadCount(nextUnread);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [emitUnreadCount]);

  const markOneAsRead = useCallback(async (id) => {
    setActionLoading(true);

    try {
      await notificationService.markAsRead(id);
      setNotifications((current) =>
        current.map((item) => (item._id === id ? { ...item, isRead: true } : item)),
      );
      setUnreadCount((current) => {
        const nextUnread = Math.max(0, current - 1);
        emitUnreadCount(nextUnread);
        return nextUnread;
      });
    } finally {
      setActionLoading(false);
    }
  }, [emitUnreadCount]);

  const markAllAsRead = useCallback(async () => {
    setActionLoading(true);

    try {
      await notificationService.markAllAsRead();
      setNotifications((current) => current.map((item) => ({ ...item, isRead: true })));
      setUnreadCount(0);
      emitUnreadCount(0);
    } finally {
      setActionLoading(false);
    }
  }, [emitUnreadCount]);

  const removeNotification = useCallback(async (id) => {
    setActionLoading(true);

    try {
      await notificationService.deleteNotification(id);
      setNotifications((current) => current.filter((item) => item._id !== id));
      setUnreadCount((current) => {
        const removed = notifications.find((item) => item._id === id);
        const nextUnread = removed && !removed.isRead ? Math.max(0, current - 1) : current;
        emitUnreadCount(nextUnread);
        return nextUnread;
      });
    } finally {
      setActionLoading(false);
    }
  }, [emitUnreadCount, notifications]);

  const clearAll = useCallback(async () => {
    setActionLoading(true);

    try {
      await notificationService.clearNotifications();
      setNotifications([]);
      setUnreadCount(0);
      emitUnreadCount(0);
    } finally {
      setActionLoading(false);
    }
  }, [emitUnreadCount]);

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
