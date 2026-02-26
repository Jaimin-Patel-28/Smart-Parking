import React from "react";
import { Inbox, EyeOff, Eye, TrendingUp } from "lucide-react";

const NotificationsSummary = () => {
  // Mock data for your MERN project presentation
  const stats = [
    {
      label: "Total Alerts",
      value: "124",
      sub: "+12 this week",
      icon: Inbox,
      color: "text-[#222222]",
      bg: "bg-white",
    },
    {
      label: "Unread",
      value: "03",
      sub: "Action required",
      icon: EyeOff,
      color: "text-[#FA8112]",
      bg: "bg-[#F5E7C6]",
    },
    {
      label: "Reviewed",
      value: "121",
      sub: "Archive ready",
      icon: Eye,
      color: "text-[#222222]/40",
      bg: "bg-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`group relative p-8 rounded-[2.5rem] border-2 border-[#222222]/5 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${item.bg}`}
          >
            {/* 1. TOP ROW: Icon & Growth Indicator */}
            <div className="flex items-start justify-between mb-6">
              <div
                className={`p-4 rounded-2xl bg-[#FAF3E1] ${item.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}
              >
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                <TrendingUp size={10} />
                Live
              </div>
            </div>

            {/* 2. MAIN METRIC: Bold Typography */}
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-[#222222] tracking-tighter italic font-serif">
                {item.value}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#222222]/30">
                {item.label}
              </p>
            </div>

            {/* 3. SUBTEXT: Editorial Context */}
            <p className="mt-6 text-sm font-medium text-[#222222]/40 border-t-2 border-[#FAF3E1] pt-4">
              {item.sub}
            </p>

            {/* Subtle paper grain overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[2.5rem]"></div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsSummary;
