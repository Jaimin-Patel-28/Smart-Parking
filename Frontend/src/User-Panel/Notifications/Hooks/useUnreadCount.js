import { useCallback, useEffect, useState } from "react";
import notificationService from "../Services/notificationService";

const UNREAD_EVENT_NAME = "user-notifications-unread";

const useUnreadCount = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { data } = await notificationService.getUnreadCount();
      setUnreadCount(data?.unreadCount || 0);
    } catch {
      setUnreadCount(0);
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();

    const intervalId = setInterval(fetchUnreadCount, 30000);

    const handleUnreadEvent = (event) => {
      const nextCount = Number(event?.detail?.unreadCount);
      if (Number.isFinite(nextCount) && nextCount >= 0) {
        setUnreadCount(nextCount);
      } else {
        fetchUnreadCount();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchUnreadCount();
      }
    };

    window.addEventListener(UNREAD_EVENT_NAME, handleUnreadEvent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener(UNREAD_EVENT_NAME, handleUnreadEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchUnreadCount]);

  return { unreadCount, refreshUnreadCount: fetchUnreadCount };
};

export default useUnreadCount;
