import React from "react";
import {
  LifeBuoy,
  FileText,
  AlertCircle,
  Headphones,
  ChevronRight,
  Zap,
  ShieldQuestion,
} from "lucide-react";

const WalletSupport = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden">
      {/* 1. HEADER: Small & Perfect operational labeling */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <LifeBuoy size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Wallet Support
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Assistance Node v1.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full">
          <ShieldQuestion size={12} className="text-blue-400 animate-pulse" />
          <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">
            Self-Service
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* 2. SUPPORT STREAM: High-density interactive tiles */}
        <SupportTile
          icon={FileText}
          label="Wallet FAQs"
          desc="Quick answers for balance & top-up nodes."
          color="text-indigo-400"
          bgColor="bg-indigo-500/5"
        />

        <SupportTile
          icon={AlertCircle}
          label="Report Wallet Issue"
          desc="Log discrepancies for financial settlement."
          color="text-rose-400"
          bgColor="bg-rose-500/5"
        />

        <SupportTile
          icon={Headphones}
          label="Contact Support"
          desc="Direct link to Anand Hub financial desk."
          color="text-emerald-400"
          bgColor="bg-emerald-500/5"
        />

        {/* 3. QUICK RESOLUTION METADATA */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col items-center gap-4 opacity-30">
          <div className="flex items-center gap-3">
            <Zap size={10} className="text-amber-400" />
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
              Avg Resolution: 12 Mins
            </p>
          </div>
          <p className="text-[7px] font-black text-slate-700 uppercase tracking-[0.2em]">
            Node ID: ASST-WH-2026
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE SUPPORT TILE */
const SupportTile = ({ icon: Icon, label, desc, color, bgColor }) => (
  <button className="w-full flex items-center justify-between p-4 bg-slate-950/60 border border-white/5 rounded-2xl hover:bg-slate-950 hover:border-white/10 transition-all group/btn shadow-inner">
    <div className="flex items-center gap-4 text-left">
      <div
        className={`shrink-0 p-2.5 ${bgColor} ${color} rounded-xl group-hover/btn:scale-110 transition-transform duration-500`}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-black text-white uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tight group-hover/btn:text-slate-400 transition-colors">
          {desc}
        </p>
      </div>
    </div>
    <ChevronRight
      size={14}
      className="text-slate-800 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all"
    />
  </button>
);

export default WalletSupport;
