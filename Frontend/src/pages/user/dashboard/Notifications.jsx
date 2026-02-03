import React from "react";
import { Bell, Clock, CreditCard, ShieldAlert, Circle } from "lucide-react";

const Notifications = () => {
  const alerts = [
    {
      id: 1,
      type: "booking",
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      title: "Booking Reminder",
      msg: "Your session at Anand Central P-104 ends in 15 mins.",
      time: "Now",
      isNew: true,
    },
    {
      id: 2,
      type: "payment",
      icon: CreditCard,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      title: "Payment Alert",
      msg: "Credits deducted for last session (₹45.00).",
      time: "2h ago",
      isNew: false,
    },
    {
      id: 3,
      type: "system",
      icon: ShieldAlert,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      title: "System Message",
      msg: "Security patch updated for Gujarat Hub Node.",
      time: "5h ago",
      isNew: false,
    },
  ];

  return (
    /* 1. CONTAINER: Using p-6 to p-8 to save space while maintaining 3xl rounding */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 lg:p-8 shadow-2xl h-full flex flex-col group transition-all duration-500 hover:border-blue-500/10">
      {/* 2. HEADER: Reduced text size (text-xl) to prevent clipping in narrow tab frames */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex items-center gap-3">
          <div className="shrink-0 p-3 bg-white/5 rounded-2xl text-slate-300 group-hover:bg-blue-600/10 group-hover:text-blue-400 transition-all">
            <Bell size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Updates
            </h2>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5 opacity-60">
              Activity Stream
            </p>
          </div>
        </div>
        <button className="text-[8px] font-black uppercase tracking-widest text-slate-600 hover:text-rose-400 transition-colors">
          Clear All
        </button>
      </div>

      {/* 3. NOTIFICATION FEED: Compact spacing (space-y-3) for 110% zoom */}
      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="group/item relative flex items-start gap-4 p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-blue-500/20 transition-all cursor-pointer shadow-inner"
          >
            {/* Type Icon: Shrunk to 18px to save horizontal space */}
            <div
              className={`shrink-0 p-2.5 rounded-xl ${item.bg} ${item.color} shadow-sm group-hover/item:scale-105 transition-transform`}
            >
              <item.icon size={18} />
            </div>

            {/* Content Area: min-w-0 and truncate used to prevent horizontal layout break */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[10px] font-black text-white uppercase tracking-wider truncate mr-2">
                  {item.title}
                </h4>
                <span className="text-[8px] font-black text-slate-600 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
              {/* FIXED: text-[10px] and line-clamp-1 to resolve clipping seen in screenshot */}
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed line-clamp-1 group-hover/item:text-slate-300 transition-colors">
                {item.msg}
              </p>
            </div>

            {/* New Status Indicator */}
            {item.isNew && (
              <div className="absolute top-4 right-4">
                <Circle
                  size={6}
                  className="fill-blue-400 text-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. FOOTER: Thinner button (py-3.5) for a cleaner "Small & Perfect" finish */}
      <button className="w-full mt-6 py-3.5 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-blue-600/0 hover:shadow-blue-600/20">
        Enter Notification Center
      </button>
    </section>
  );
};

export default Notifications;
