import React from "react";
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  CreditCard,
  RefreshCcw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  booking: Calendar,
  payment: CreditCard,
  refund: RefreshCcw,
  wallet: CreditCard,
  account: Bell,
  system: Bell,
};

const NotificationItem = ({ notification, onRead, onDelete }) => {
  const Icon = iconMap[notification.type] || Bell;

  return (
    <div
      className={`group flex gap-4 p-5 rounded-3xl border transition-all ${
        notification.isRead
          ? "bg-[#FAF3E1]/2 border-[#F5E7C6]/10"
          : "bg-[#FA8112]/5 border-[#FA8112]/20"
      }`}
    >
      <div
        className={`p-3 rounded-2xl shrink-0 ${
          notification.isRead
            ? "bg-[#FAF3E1]/5 text-[#FAF3E1]/40"
            : "bg-[#FA8112]/10 text-[#FA8112]"
        }`}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-black text-[#FAF3E1] tracking-tight">
              {notification.title}
            </p>
            <p className="text-sm text-[#FAF3E1]/50 mt-1 leading-relaxed">
              {notification.message}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!notification.isRead ? (
              <button
                onClick={() => onRead(notification._id)}
                className="p-2 rounded-xl bg-[#FA8112]/10 text-[#FA8112] hover:bg-[#FA8112] hover:text-[#222222] transition-all"
                title="Mark as read"
              >
                <Check size={14} />
              </button>
            ) : null}
            <button
              onClick={() => onDelete(notification._id)}
              className="p-2 rounded-xl bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/25">
          <span>{notification.type}</span>
          <span>•</span>
          <span>
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
