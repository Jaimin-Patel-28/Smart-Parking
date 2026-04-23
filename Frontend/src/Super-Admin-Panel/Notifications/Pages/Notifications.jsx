import React from "react";
import {
  BellRing,
  CheckCheck,
  Trash2,
  Loader2,
  Inbox,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useNotifications from "../Hooks/useNotifications";
import NotificationItem from "../Components/NotificationItem";
import NotificationEmpty from "../Components/NotificationEmpty";

const Notifications = () => {
  const navigate = useNavigate();
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
    <div className="max-w-5xl mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. HEADER & GLOBAL ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          {/* Breadcrumb Navigation */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Command Center
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
                <BellRing size={28} strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
                Notification <span className="text-[#FA8112]">Registry</span>
              </h1>
            </div>

            {/* Status Bar */}
            <div className="flex items-center gap-3 mt-4 px-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${unreadCount > 0 ? "bg-[#FA8112] animate-pulse" : "bg-[#FAF3E1]/20"}`}
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/40">
                  {unreadCount} Unread Signals
                </p>
              </div>
              <span className="h-3 w-px bg-[#F5E7C6]/10" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20">
                Node: Security_Alert_Hub
              </p>
            </div>
          </div>
        </div>

        {/* Global Batch Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            disabled={actionLoading || unreadCount === 0}
            className="px-6 py-2.5 rounded-lg bg-[#FA8112] text-[#222222] font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all disabled:opacity-30 flex items-center gap-2 shadow-lg shadow-[#FA8112]/10 active:scale-95"
          >
            <CheckCheck size={14} strokeWidth={2.5} /> Acknowledge All
          </button>
          <button
            onClick={clearAll}
            disabled={actionLoading || notifications.length === 0}
            className="px-6 py-2.5 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border border-[#F5E7C6]/5 font-bold uppercase tracking-widest text-[10px] hover:bg-rose-500/10 hover:text-rose-400 transition-all disabled:opacity-30 flex items-center gap-2 active:scale-95"
          >
            <Trash2 size={14} strokeWidth={2} /> Purge Registry
          </button>
        </div>
      </div>

      {/* 2. DATA VIEWPORT */}
      <div className="relative">
        {error ? (
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-6 flex items-center gap-4 text-rose-400">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <Inbox size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                Sync Error
              </p>
              <p className="text-sm font-semibold">{error}</p>
            </div>
          </div>
        ) : loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <Loader2
                className="animate-spin text-[#FA8112]"
                size={40}
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 rounded-full border-2 border-[#FA8112]/5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 animate-pulse">
              Retrieving System Signals...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <NotificationEmpty />
        ) : (
          <div className="space-y-3">
            {/* Legend/Header for the list */}
            <div className="px-6 py-2 flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/10">
              <span>Signal Subject</span>
              <span>Registry Metadata</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onRead={markOneAsRead}
                  onDelete={removeNotification}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER METADATA */}
      {!loading && notifications.length > 0 && (
        <div className="pt-8 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
            End of Signal Stream
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
