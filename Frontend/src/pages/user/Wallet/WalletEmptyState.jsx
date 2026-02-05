import React from "react";
import {
  Inbox,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

const WalletEmptyState = () => {
  return (
    <section className="bg-slate-900/40 border border-dashed border-white/10 rounded-[2.5rem] p-12 lg:p-20 shadow-2xl backdrop-blur-xl group transition-all duration-700 hover:border-emerald-500/20 relative overflow-hidden text-center flex flex-col items-center justify-center">
      {/* 1. CINEMATIC ICON: High-density placeholder */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[60px] rounded-full scale-150 group-hover:bg-emerald-500/10 transition-all duration-700" />
        <div className="relative z-10 w-24 h-24 bg-slate-950 border border-white/5 rounded-4xl flex items-center justify-center text-slate-700 group-hover:text-emerald-400 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
          <Inbox size={48} strokeWidth={1} />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
          <Sparkles size={18} />
        </div>
      </div>

      {/* 2. CORE MESSAGING: Small & Perfect typography */}
      <div className="max-w-xs space-y-4 mb-10 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldAlert size={12} className="text-slate-600" />
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
            Inventory Log Empty
          </span>
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
          No Transactions <br />{" "}
          <span className="text-slate-500">Available</span>
        </h2>

        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
          Your financial ledger for Anand Smart City is currently inactive. Add
          funds to begin node settlements.
        </p>
      </div>

      {/* 3. CTA: Primary inflow gateway */}
      <button className="flex items-center gap-3 px-8 py-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 group/btn">
        <PlusCircle size={16} />
        Initialize First Deposit
        <ArrowUpRight
          size={14}
          className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
        />
      </button>

      {/* 4. FOOTER: Subtle system metadata */}
      <div className="mt-12 opacity-20 flex items-center gap-3">
        <div className="w-8 h-px bg-slate-700" />
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
          Protocol Idle
        </p>
        <div className="w-8 h-px bg-slate-700" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
    </section>
  );
};

export default WalletEmptyState;
