import React from "react";
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  CreditCard,
  RefreshCcw,
  Terminal,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  booking: Calendar,
  payment: CreditCard,
  refund: RefreshCcw,
  wallet: CreditCard,
  account: ShieldCheck, // Updated for engine persona
  system: Terminal, // Updated for engine persona
};

const NotificationItem = ({ notification, onRead, onDelete }) => {
  const Icon = iconMap[notification.type] || Bell;

  return (
    <div
      className={`group relative overflow-hidden flex gap-5 p-6 rounded-xl border transition-all duration-500 ${
        notification.isRead
          ? "bg-[#FAF3E1]/[0.01] border-[#F5E7C6]/5 opacity-60 hover:opacity-100"
          : "bg-[#FA8112]/[0.03] border-[#FA8112]/20 shadow-[0_0_20px_rgba(250,129,18,0.05)]"
      }`}
    >
      {/* 1. STATUS ACCENT: Vertical signal bar */}
      {!notification.isRead && (
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[#FA8112] shadow-[0_0_10px_#FA8112]" />
      )}

      {/* 2. ICON MODULE: Recessed housing */}
      <div
        className={`p-3.5 rounded-lg shrink-0 h-fit border ${
          notification.isRead
            ? "bg-[#1a1a1a] border-[#F5E7C6]/5 text-[#FAF3E1]/10"
            : "bg-[#FA8112]/5 border-[#FA8112]/20 text-[#FA8112]"
        }`}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-bold text-[#FAF3E1] uppercase tracking-tight">
                {notification.title}
              </p>
              {!notification.isRead && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse" />
              )}
            </div>
            <p className="text-[12px] text-[#FAF3E1]/40 leading-relaxed font-medium">
              {notification.message}
            </p>
          </div>

          {/* 3. COMMAND BUTTONS */}
          <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {!notification.isRead && (
              <button
                onClick={() => onRead(notification._id)}
                className="p-2 rounded-lg bg-[#FA8112]/10 text-[#FA8112] border border-[#FA8112]/20 hover:bg-[#FA8112] hover:text-[#222222] transition-all"
                title="Commit_Read"
              >
                <Check size={14} strokeWidth={3} />
              </button>
            )}
            <button
              onClick={() => onDelete(notification._id)}
              className="p-2 rounded-lg bg-[#1a1a1a] border border-[#F5E7C6]/10 text-[#FAF3E1]/20 hover:bg-rose-500 hover:text-[#FAF3E1] hover:border-rose-500 transition-all"
              title="Purge_Entry"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* 4. TELEMETRY FOOTER */}
        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
            <Activity size={10} />
            <span>{notification.type}_SIGNAL</span>
          </div>
          <span className="text-[9px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
