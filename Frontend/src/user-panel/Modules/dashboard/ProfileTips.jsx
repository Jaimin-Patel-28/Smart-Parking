import React from "react";
import {
  Sparkles,
  Car,
  BellRing,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const ProfileTips = () => {
  const tips = [
    {
      icon: UserCheck,
      title: "Complete Profile",
      desc: "Identity Verification",
    },
    { icon: Car, title: "Add Vehicle", desc: "Fast-Track Entry Node" },
  ];

  return (
    <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 space-y-8 relative overflow-hidden group">
      {/* --- DECORATIVE BLUR --- */}
      <div className="absolute -left-4 -top-4 w-20 h-20 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-colors" />

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/30">
              Account Optimization
            </p>
            <h3 className="text-lg font-black text-[#FAF3E1] tracking-tight leading-none">
              Profile Boosters
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <ShieldCheck size={10} className="text-blue-400" />
          <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">
            Level 01 User
          </span>
        </div>
      </div>

      {/* --- ACTIONABLE TASKS --- */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="group/item flex items-center gap-4 p-4 bg-[#111111]/40 border border-[#F5E7C6]/5 rounded-2xl hover:border-[#FA8112]/30 transition-all cursor-pointer"
          >
            <div className="p-2.5 bg-[#222222] rounded-xl text-[#FAF3E1]/20 group-hover/item:text-[#FA8112] transition-colors">
              <tip.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black text-[#FAF3E1] tracking-wide">
                  {tip.title}
                </h4>
                <ArrowRight
                  size={14}
                  className="text-[#FAF3E1]/10 group-hover/item:text-[#FA8112] group-hover/item:translate-x-1 transition-all"
                />
              </div>
              <p className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-tighter">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- EVOLUTION TRACKER --- */}
      <div className="bg-[#111111]/60 rounded-3xl p-5 border border-[#F5E7C6]/5 space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-widest font-bold text-[#FAF3E1]/40">
              Verification Status
            </p>
            <p className="text-xs font-black text-[#FAF3E1]">Almost there</p>
          </div>
          <span className="text-2xl font-black text-[#FA8112] tracking-tighter">
            65%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-[#222222] rounded-full overflow-hidden border border-[#F5E7C6]/5 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-[#FA8112] to-amber-400 rounded-full shadow-[0_0_10px_rgba(250,129,18,0.3)] transition-all duration-1000"
            style={{ width: "65%" }}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5">
            <Zap size={10} className="text-[#FA8112]" />
            <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase">
              Next: <span className="text-[#FAF3E1]/60">Security Lvl 02</span>
            </p>
          </div>
          <button className="px-3 py-1 bg-[#FA8112] hover:bg-[#FA8112]/80 text-[#222222] text-[9px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTips;
