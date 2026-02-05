import React from "react";
import {
  Wallet,
  ShieldCheck,
  TrendingUp,
  Clock,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

const WalletOverview = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/20 relative overflow-hidden h-full">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <Wallet size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              Wallet Overview
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">
              Financial Node v4.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
            Active Node
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 relative z-10">
        {/* 2. PRIMARY ASSET: Massive balance display */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Total Liquid Balance
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
              ₹450.00
            </span>
            <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">
              INR
            </span>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              System Settlement: Finalized
            </p>
          </div>
        </div>

        {/* 3. METADATA GRID: High-density info rows */}
        <div className="grid grid-cols-1 gap-4">
          <OverviewStat
            icon={Clock}
            label="Last Activity"
            value="Today, 02:45 PM"
            color="text-blue-400"
          />
          <OverviewStat
            icon={RefreshCw}
            label="Auto-Sync"
            value="Enabled (Level 2)"
            color="text-indigo-400"
          />
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between group/audit cursor-pointer">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Node Audit ID
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                WH-2026-X99
              </span>
              <ArrowUpRight
                size={12}
                className="text-slate-700 group-hover/audit:text-emerald-400 group-hover/audit:translate-x-1 group-hover/audit:-translate-y-1 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE OVERVIEW STAT */
const OverviewStat = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-white/5 rounded-2xl shadow-inner">
    <div className="flex items-center gap-3">
      <div className={`p-2 bg-white/5 ${color} rounded-lg`}>
        <Icon size={14} />
      </div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className="text-[10px] font-black text-white uppercase tracking-widest">
      {value}
    </span>
  </div>
);

export default WalletOverview;
