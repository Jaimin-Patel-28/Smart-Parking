import React from "react";
import { Car, Wallet, Cpu, Clock, ChevronRight, Circle } from "lucide-react";

const NotificationItem = ({ notification }) => {
  // Logic to determine icon and color based on MERN data type
  const getTypeStyles = (type) => {
    switch (type?.toLowerCase()) {
      case "booking":
        return { icon: Car, color: "text-[#FA8112]", bg: "bg-[#F5E7C6]" };
      case "wallet":
        return { icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" };
      case "system":
        return { icon: Cpu, color: "text-[#222222]", bg: "bg-[#FAF3E1]" };
      default:
        return { icon: Circle, color: "text-slate-400", bg: "bg-slate-50" };
    }
  };

  const { icon: Icon, color, bg } = getTypeStyles(notification?.type);

  return (
    <div className="group relative bg-white border-2 border-[#222222]/5 p-5 md:p-6 rounded-4xl transition-all duration-500 hover:shadow-xl hover:border-[#222222]/10 flex flex-col md:flex-row md:items-center gap-6">
      {/* 1. TYPE ICON: Tactile & High Contrast */}
      <div
        className={`shrink-0 w-14 h-14 ${bg} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}
      >
        <Icon size={24} className={color} strokeWidth={2.5} />
      </div>

      {/* 2. CONTENT AREA: Editorial Typography */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md ${bg} ${color}`}
          >
            {notification?.type || "Alert"}
          </span>
          {!notification?.read && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FA8112] animate-pulse"></span>
          )}
        </div>

        <h3 className="text-lg font-black text-[#222222] tracking-tight truncate group-hover:text-[#FA8112] transition-colors">
          {notification?.title || "Notification Title"}
        </h3>

        <p className="text-sm font-medium text-[#222222]/50 leading-relaxed truncate md:whitespace-normal line-clamp-1 md:line-clamp-2">
          {notification?.description ||
            "A short description of the event will appear here for the user to review."}
        </p>
      </div>

      {/* 3. METADATA & ACTION */}
      <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-4 border-t-2 md:border-t-0 md:border-l-2 border-[#FAF3E1] pt-4 md:pt-0 md:pl-8">
        <div className="flex items-center gap-2 text-[#222222]/30">
          <Clock size={12} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            {notification?.time || "Just Now"}
          </span>
        </div>

        <button className="flex items-center gap-2 text-[#222222] font-black text-[10px] uppercase tracking-[0.2em] group/btn hover:text-[#FA8112] transition-colors">
          View Detail
          <ChevronRight
            size={14}
            strokeWidth={3}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Subtle paper grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-4xl"></div>
    </div>
  );
};

export default NotificationItem;
