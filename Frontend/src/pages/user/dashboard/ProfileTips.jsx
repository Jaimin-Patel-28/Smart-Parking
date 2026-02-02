import React from "react";
import { Sparkles, Car, BellRing, UserCheck, ArrowRight } from "lucide-react";

const ProfileTips = () => {
  const tips = [
    {
      icon: UserCheck,
      title: "Complete Profile",
      desc: "Add your name and photo for Anand Hub verification.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Car,
      title: "Add Vehicle Details",
      desc: "Speed up entry with saved license plate numbers.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      icon: BellRing,
      title: "Enable Alerts",
      desc: "Get notified when your parking session is ending.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <section className="relative">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={18} className="text-amber-400 fill-amber-400/20" />
        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">
          Profile Boosters
        </h2>
      </div>

      {/* TIPS STACK */}
      <div className="space-y-4">
        {/* FIXED: Changed gap-4.map to tips.map to resolve syntax error */}
        {tips.map((tip, index) => (
          <div
            key={index}
            className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
          >
            {/* Icon Container - Updated to use shrink-0 */}
            <div
              className={`shrink-0 p-2.5 rounded-xl ${tip.bg} ${tip.color} transition-transform group-hover:scale-110`}
            >
              <tip.icon size={18} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-white tracking-tight mb-0.5">
                  {tip.title}
                </h4>
                <ArrowRight
                  size={12}
                  className="text-slate-700 group-hover:text-white transition-colors"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PROGRESS INDICATOR */}
      <div className="mt-6 p-4 bg-slate-950/50 rounded-2xl border border-white/5">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Profile Completion
          </span>
          <span className="text-[10px] font-black text-blue-400">65%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            style={{ width: "65%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileTips;
