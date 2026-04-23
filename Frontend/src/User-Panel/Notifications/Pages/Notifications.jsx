import React from "react";
import {
  BellRing,
  CheckCheck,
  Trash2,
  Loader2,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
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

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. ALERT COMMAND HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Signal_Monitor_Alpha
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Notifications <span className="text-[#FA8112]">Center</span>
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.3em]">
              Pending_Alerts:{" "}
              <span className="text-[#FA8112] tabular-nums">{unreadCount}</span>
            </p>
            <span className="h-1 w-1 rounded-full bg-[#FAF3E1]/10" />
            <p className="text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.3em]">
              Node_Status: Online
            </p>
          </div>
        </div>

        {/* Global Action Console */}
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            disabled={actionLoading || unreadCount === 0}
            className="px-6 py-3 rounded-lg bg-[#FA8112] text-[#222222] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FAF3E1] transition-all disabled:opacity-20 flex items-center gap-2 shadow-2xl shadow-[#FA8112]/5 group active:scale-95"
          >
            <CheckCheck
              size={14}
              strokeWidth={3}
              className="group-hover:scale-110 transition-transform"
            />
            Commit_All_Read
          </button>
          <button
            onClick={clearAll}
            disabled={actionLoading || notifications.length === 0}
            className="px-6 py-3 rounded-lg bg-[#1a1a1a] text-[#FAF3E1]/40 border border-[#F5E7C6]/5 font-bold uppercase tracking-[0.2em] text-[10px] hover:text-rose-400 hover:border-rose-500/20 transition-all disabled:opacity-10 flex items-center gap-2 active:scale-95"
          >
            <Trash2 size={14} /> Purge_Registry
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC REGISTRY VIEWPORT */}
      <div className="relative min-h-[500px]">
        {error ? (
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-10 text-center animate-in zoom-in-95 duration-500">
            <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-6">
              Critical_Sync_Failure: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#FA8112] transition-colors flex items-center gap-2 mx-auto"
            >
              <Activity size={14} className="animate-pulse" /> Reinitialize_Link
            </button>
          </div>
        ) : loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <Loader2
                className="animate-spin text-[#FA8112]/20"
                size={48}
                strokeWidth={1}
              />
              <Zap
                size={14}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FA8112] animate-pulse"
              />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
              Fetching_Registry_Signals...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <NotificationEmpty />
        ) : (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
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

      {/* 3. SYSTEM FOOTER */}
      <div className="flex flex-col items-center gap-4 pt-12 opacity-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Activity size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Real-time Alert Matrix • End-to-End Secure Sync
        </p>
      </div>
    </div>
  );
};

export default Notifications;
