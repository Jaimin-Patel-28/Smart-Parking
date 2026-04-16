import React from "react";
import { BellRing, CheckCheck, Trash2, Loader2 } from "lucide-react";
import useNotifications from "../Hooks/useNotifications";
import NotificationItem from "../Components/NotificationItem";
import NotificationEmpty from "../Components/NotificationEmpty";

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    loading,
    actionLoading,
    error,
    markOneAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotifications();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#FAF3E1] tracking-tight uppercase flex items-center gap-4">
            <BellRing className="text-[#FA8112]" size={34} />
            Notifications <span className="text-[#FA8112]">Center</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-2">
            Unread alerts: {unreadCount}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={markAllAsRead}
            disabled={actionLoading || unreadCount === 0}
            className="px-5 py-3 rounded-xl bg-[#FA8112] text-[#222222] font-black uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <CheckCheck size={14} /> Mark all read
          </button>
          <button
            onClick={clearAll}
            disabled={actionLoading || notifications.length === 0}
            className="px-5 py-3 rounded-xl bg-[#FAF3E1]/5 text-[#FAF3E1] border border-[#F5E7C6]/10 font-black uppercase tracking-widest text-[10px] hover:bg-rose-500/10 hover:text-rose-400 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Trash2 size={14} /> Clear All
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-4xl p-6 text-rose-400 font-bold">
          {error}
        </div>
      ) : loading ? (
        <div className="py-24 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#FA8112]" size={34} />
        </div>
      ) : notifications.length === 0 ? (
        <NotificationEmpty />
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onRead={markOneAsRead}
              onDelete={removeNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
