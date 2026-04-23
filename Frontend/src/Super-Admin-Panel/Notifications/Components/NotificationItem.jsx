import React from "react";
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  CreditCard,
  RefreshCcw,
  ShieldInfo,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  booking: Calendar,
  payment: CreditCard,
  refund: RefreshCcw,
  wallet: CreditCard,
  account: ShieldInfo,
  system: Bell,
};

const NotificationItem = ({ notification, onRead, onDelete }) => {
  const Icon = iconMap[notification.type] || Bell;

  return (
    <div
      className={`group relative flex gap-5 p-5 rounded-xl border transition-all duration-300 ${
        notification.isRead
          ? "bg-[#FAF3E1]/2 border-[#F5E7C6]/5 opacity-70 hover:opacity-100"
          : "bg-[#FA8112]/[0.03] border-[#FA8112]/10 shadow-[lg] shadow-[#FA8112]/5"
      }`}
    >
      {/* 1. UNREAD ACCENT: A thin vertical line for new signals */}
      {!notification.isRead && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-[#FA8112] rounded-r-full shadow-[0_0_10px_#FA8112]" />
      )}

      {/* 2. ICON CONTAINER: Sharper geometry */}
      <div
        className={`h-11 w-11 rounded-lg shrink-0 flex items-center justify-center border transition-colors ${
          notification.isRead
            ? "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5"
            : "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20"
        }`}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>

      {/* 3. CONTENT AREA */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 space-y-1">
            <h4 className="text-sm font-bold text-[#FAF3E1] tracking-tight leading-none">
              {notification.title}
            </h4>
            <p className="text-[13px] text-[#FAF3E1]/40 leading-relaxed font-medium line-clamp-2 group-hover:line-clamp-none transition-all">
              {notification.message}
            </p>
          </div>

          {/* 4. ACTIONS: Refined button style */}
          <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notification.isRead && (
              <button
                onClick={() => onRead(notification._id)}
                className="p-2 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:bg-[#FA8112] hover:text-[#222222] transition-all border border-[#F5E7C6]/5"
                title="Acknowledge Signal"
              >
                <Check size={14} strokeWidth={2.5} />
              </button>
            )}
            <button
              onClick={() => onDelete(notification._id)}
              className="p-2 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-[#F5E7C6]/5"
              title="Purge Entry"
            >
              <Trash2 size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* 5. METADATA FOOTER */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1 h-1 rounded-full ${notification.isRead ? "bg-[#FAF3E1]/10" : "bg-[#FA8112] animate-pulse"}`}
            />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/20">
              {notification.type}
            </span>
          </div>
          <span className="h-3 w-px bg-[#F5E7C6]/5" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/20 tabular-nums">
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
