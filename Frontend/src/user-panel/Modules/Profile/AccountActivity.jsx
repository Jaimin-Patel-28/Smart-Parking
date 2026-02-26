import React from "react";
import {
  Activity,
  LogIn,
  UserCog,
  ShieldAlert,
  History,
  ChevronRight,
} from "lucide-react";

const AccountActivity = () => {
  const activities = [
    {
      id: 1,
      type: "Login",
      icon: LogIn,
      label: "Recent Login",
      desc: "Chrome on Windows • Anand Hub",
      time: "2h ago",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      type: "Update",
      icon: UserCog,
      label: "Profile Updated",
      desc: "Vehicle GJ-06-AM-1234 added",
      time: "5h ago",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      id: 3,
      type: "Security",
      icon: ShieldAlert,
      label: "Security Alert",
      desc: "Password strength verified",
      time: "1d ago",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    /* FIXED: Using rounded-3xl and increased padding for professional depth */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-slate-500/30 flex flex-col h-full">
      {/* 1. HEADER: Spaced for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-white/5 rounded-2xl text-slate-300 group-hover:rotate-12 transition-transform duration-500">
            <Activity size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Activity Hub
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Identity Audit Stream
            </p>
          </div>
        </div>
        <div className="p-2.5 bg-white/5 rounded-xl text-slate-600 hover:text-white transition-colors cursor-pointer">
          <History size={18} />
        </div>
      </div>

      {/* 2. ACTIVITY STREAM: High-density interactive rows */}
      <div className="space-y-4 flex-1">
        {activities.map((item) => (
          <div
            key={item.id}
            className="group/item relative flex items-start gap-5 p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/10 transition-all cursor-pointer shadow-inner"
          >
            {/* Type Icon: Using shrink-0 to resolve canonical warning */}
            <div
              className={`shrink-0 p-3 rounded-xl ${item.bg} ${item.color} shadow-sm group-hover/item:scale-105 transition-transform`}
            >
              <item.icon size={20} />
            </div>

            {/* Content Area: Optimized for narrow windows */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[11px] font-black text-white uppercase tracking-wider truncate mr-2">
                  {item.label}
                </h4>
                <span className="text-[9px] font-bold text-slate-600 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed line-clamp-1 group-hover/item:text-slate-300 transition-colors uppercase tracking-tight">
                {item.desc}
              </p>
            </div>

            <ChevronRight
              size={14}
              className="mt-1 text-slate-800 group-hover/item:text-slate-500 group-hover/item:translate-x-1 transition-all"
            />
          </div>
        ))}
      </div>

      {/* 3. FOOTER: Thinner button for a cleaner "Small & Perfect" finish */}
      <button className="w-full mt-10 py-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-blue-600/0 hover:shadow-blue-600/20">
        Download Full Activity Log
      </button>
    </section>
  );
};

export default AccountActivity;
