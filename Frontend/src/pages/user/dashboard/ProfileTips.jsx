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
      {/* 1. SECTION HEADER: Increased margin-bottom (mb-8) for breathing room */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <Sparkles size={22} className="text-amber-400 fill-amber-400/20" />
        <div>
          <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">
            Profile Boosters
          </h2>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Unlock Pro Features
          </p>
        </div>
      </div>

      {/* 2. TIPS STACK: Increased gap (space-y-5) between items */}
      <div className="space-y-5">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="group flex items-start gap-5 p-4 rounded-2xl bg-white/1 hover:bg-white/4 transition-all cursor-pointer border border-transparent hover:border-white/5"
          >
            {/* Icon Container: Using shrink-0 to resolve canonical warning */}
            <div
              className={`shrink-0 p-3 rounded-xl ${tip.bg} ${tip.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}
            >
              <tip.icon size={20} />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-black text-white tracking-wide uppercase">
                  {tip.title}
                </h4>
                <ArrowRight
                  size={14}
                  className="text-slate-700 group-hover:text-white transition-all group-hover:translate-x-1"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed tracking-tight">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. PROGRESS INDICATOR: Balanced spacing and depth */}
      <div className="mt-10 p-6 bg-slate-950/60 rounded-3xl border border-white/5 shadow-inner">
        <div className="flex justify-between items-end mb-3 px-1">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
              Verification Progress
            </span>
          </div>
          <span className="text-xs font-black text-blue-400">65%</span>
        </div>

        {/* Progress Bar with Glow */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-1000 ease-out"
            style={{ width: "65%" }}
          />
        </div>

        <p className="text-[8px] font-bold text-slate-700 uppercase tracking-widest mt-4 text-center">
          Complete 1 more task to reach Level 2
        </p>
      </div>
    </section>
  );
};

export default ProfileTips;
