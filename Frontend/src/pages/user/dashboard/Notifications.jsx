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
    <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 shadow-2xl h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/5 rounded-2xl text-slate-300">
            <Bell size={22} />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Updates
          </h2>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
          Clear All
        </button>
      </div>

      {/* NOTIFICATION FEED */}
      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
          >
            {/* Type Icon */}
            <div
              className={`shrink-0 p-2.5 rounded-xl ${item.bg} ${item.color}`}
            >
              <item.icon size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[11px] font-black text-white uppercase tracking-wider truncate">
                  {item.title}
                </h4>
                <span className="text-[9px] font-bold text-slate-600 whitespace-nowrap ml-2">
                  {item.time}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                {item.msg}
              </p>
            </div>

            {/* New Status Indicator */}
            {item.isNew && (
              <div className="absolute top-4 right-4">
                <Circle
                  size={6}
                  className="fill-blue-400 text-blue-400 animate-pulse"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <button className="w-full mt-6 py-3.5 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:bg-white/10 hover:text-white transition-all">
        Enter Notification Center
      </button>
    </section>
  );
};

export default Notifications;
