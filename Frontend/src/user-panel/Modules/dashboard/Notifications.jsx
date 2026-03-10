import React from "react";
import {
  Bell,
  Clock,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  Radio,
} from "lucide-react";

const Notifications = () => {
  const alerts = [
    {
      id: 1,
      icon: Clock,
      title: "Booking Reminder",
      msg: "Session ends in 15m",
      time: "Now",
      type: "urgent",
    },
    {
      id: 2,
      icon: CreditCard,
      title: "Payment Alert",
      msg: "₹45 settled for P-104",
      time: "2h ago",
      type: "info",
    },
  ];

  return (
    <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 space-y-6 relative overflow-hidden group">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full" />

      {/* --- HEADER --- */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="p-3 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1]/60">
            <Bell size={20} />
          </div>
          {/* Active Alert Dot */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FA8112]"></span>
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FAF3E1]/20">
            Live Stream
          </p>
          <h3 className="text-lg font-black text-[#FAF3E1] tracking-tight">
            Notifications
          </h3>
        </div>
      </div>

      {/* --- ALERT LIST --- */}
      <div className="space-y-4 relative">
        {/* Timeline Vertical Line */}
        <div className="absolute left-[23px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#F5E7C6]/10 via-[#F5E7C6]/5 to-transparent" />

        {alerts.map((item) => (
          <div key={item.id} className="relative flex gap-4 group/item">
            {/* Timeline Icon Node */}
            <div
              className={`z-10 flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                item.type === "urgent"
                  ? "bg-[#FA8112]/10 border-[#FA8112]/30 text-[#FA8112]"
                  : "bg-[#111111] border-[#F5E7C6]/5 text-[#FAF3E1]/40 group-hover/item:border-[#FA8112]/20"
              }`}
            >
              <item.icon size={18} />
            </div>

            {/* Content Section */}
            <div className="flex-1 pt-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-black text-[#FAF3E1] tracking-wide">
                  {item.title}
                </h4>
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    item.type === "urgent"
                      ? "bg-[#FA8112] text-[#222222]"
                      : "bg-[#FAF3E1]/5 text-[#FAF3E1]/30"
                  }`}
                >
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-[#FAF3E1]/40 leading-relaxed font-medium">
                {item.msg}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER ACTION --- */}
      <button className="group w-full flex items-center justify-center gap-2 py-4 bg-[#111111]/40 border border-[#F5E7C6]/5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black text-[#FAF3E1]/30 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all">
        Activity Log{" "}
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      {/* System Status Node */}
      <div className="flex items-center justify-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
        <Radio size={10} className="text-[#FA8112]" />
        <span className="text-[8px] font-bold uppercase tracking-widest">
          Connection Stable
        </span>
      </div>
    </div>
  );
};

export default Notifications;
