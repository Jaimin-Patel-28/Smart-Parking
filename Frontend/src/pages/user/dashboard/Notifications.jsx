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
    /* FIXED: Changed rounded-[2.5rem] to rounded-3xl and increased padding to p-8 lg:p-10 */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl h-full flex flex-col group">
      {/* 1. HEADER: Increased margin-bottom (mb-10) for better separation */}
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-white/5 rounded-2xl text-slate-300 group-hover:bg-white/10 transition-all">
            <Bell size={26} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Updates
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
              Activity Stream
            </p>
          </div>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-400 transition-colors">
          Clear All
        </button>
      </div>

      {/* 2. NOTIFICATION FEED: Increased vertical gap (space-y-4) */}
      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="group/item relative flex items-start gap-5 p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer shadow-inner"
          >
            {/* Type Icon: Using shrink-0 to resolve canonical warning */}
            <div
              className={`shrink-0 p-3 rounded-xl ${item.bg} ${item.color} shadow-sm`}
            >
              <item.icon size={20} />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider truncate">
                  {item.title}
                </h4>
                <span className="text-[10px] font-bold text-slate-600 whitespace-nowrap ml-2">
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 group-hover/item:text-slate-300 transition-colors">
                {item.msg}
              </p>
            </div>

            {/* New Status Indicator */}
            {item.isNew && (
              <div className="absolute top-5 right-5">
                <Circle
                  size={7}
                  className="fill-blue-400 text-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. FOOTER: Increased margin-top (mt-8) and height for a premium feel */}
      <button className="w-full mt-8 py-4.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-blue-600/0 hover:shadow-blue-600/20">
        Enter Notification Center
      </button>
    </section>
  );
};

export default Notifications;
