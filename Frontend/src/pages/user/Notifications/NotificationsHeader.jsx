import React from "react";
import { BellRing, CheckCircle, Sparkles } from "lucide-react";

const NotificationsHeader = () => {
  // Mock count for the MERN project demonstration
  const unreadCount = 3;

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-[#222222]/5 p-8 md:p-12 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. BACKGROUND DECORATION: Subtle paper grain and organic shapes */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F5E7C6]/50 blur-3xl rounded-full pointer-events-none group-hover:bg-[#FA8112]/5 transition-colors duration-700"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          {/* MINI BADGE: Clean editorial style */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#222222] text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
            <Sparkles size={14} className="text-[#FA8112]" />
            Live Activity Feed
          </div>

          {/* MAIN HEADING: High-contrast typography */}
          <h1 className="text-5xl md:text-7xl font-black text-[#222222] tracking-tighter leading-none">
            Your{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Updates
            </span>
          </h1>

          <p className="text-[#222222]/50 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            Stay updated with your parking activity in{" "}
            <strong className="text-[#222222]">Anand Smart City</strong>.
            Real-time insights for a smarter commute.
          </p>
        </div>

        {/* 2. STATUS INDICATOR: Professional MERN feedback */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FA8112]"></span>
              </span>
              <span className="text-2xl font-black text-[#222222]">
                {unreadCount} New
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#222222]/30">
              Unread Alerts
            </p>
          </div>

          {/* ACTION BUTTON: Tactile "Mark as Read" */}
          <button className="p-5 rounded-2xl bg-[#222222] text-[#FAF3E1] hover:bg-[#FA8112] transition-all duration-300 shadow-xl shadow-[#222222]/10 active:scale-95 group/btn">
            <CheckCircle
              size={24}
              strokeWidth={2.5}
              className="group-hover/btn:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* 3. VIVA DETAIL: Technical footer line */}
      <div className="mt-12 pt-6 border-t-2 border-[#FAF3E1] flex items-center justify-between text-[#222222]/20">
        <div className="flex items-center gap-2">
          <BellRing size={14} />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">
            Socket.io Connection: Stable
          </span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">
          Last Updated: Just Now
        </span>
      </div>
    </section>
  );
};

export default NotificationsHeader;
