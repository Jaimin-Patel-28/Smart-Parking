import React from "react";
import {
  Wallet,
  ArrowUpRight,
  History,
  Plus,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const WalletSnapshot = () => {
  return (
    /* FIXED: Using rounded-3xl and increased padding p-8 lg:p-10 for professional spacing.
       Removed backdrop-blur to resolve scrolling lag. */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl h-full flex flex-col relative overflow-hidden group transition-all duration-500 hover:border-emerald-500/20">
      {/* Background Decorative Glow: Increased size for depth */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-700"></div>

      {/* 1. HEADER: Increased margin-bottom (mb-10) for breathing room */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform">
            <Wallet size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">
              Wallet Hub
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">
              Managed Credits
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-[0.2em] shadow-sm">
          <ShieldCheck size={14} />
          Secure
        </div>
      </div>

      {/* 2. PRIMARY BALANCE: Enhanced typography for 110% zoom */}
      <div className="mb-10 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2 px-1">
          Available Balance
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-black text-white tracking-tighter shadow-sm">
            ₹450.00
          </span>
          <span className="text-sm font-black text-slate-600 uppercase tracking-widest">
            INR
          </span>
        </div>
      </div>

      {/* 3. QUICK STATS GRID: Increased gap (gap-6) and padding (p-5) */}
      <div className="grid grid-cols-2 gap-6 mb-10 relative z-10">
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner group/stat hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <History
              size={14}
              className="group-hover/stat:text-blue-400 transition-colors"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Last Use
            </span>
          </div>
          <p className="text-sm font-black text-white tracking-wide">-₹45.00</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner group/stat hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CreditCard
              size={14}
              className="group-hover/stat:text-emerald-400 transition-colors"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Total Out
            </span>
          </div>
          <p className="text-sm font-black text-white tracking-wide">
            ₹1,240.00
          </p>
        </div>
      </div>

      {/* 4. ACTION BUTTONS: Production-ready sizing */}
      <div className="mt-auto space-y-4 relative z-10">
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95 group/btn">
          <Plus
            size={20}
            className="group-hover/btn:rotate-90 transition-transform duration-300"
          />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            Add Money
          </span>
        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded-xl transition-all shadow-sm active:scale-95">
          <ArrowUpRight size={18} />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            History
          </span>
        </button>
      </div>

      {/* 5. INFRASTRUCTURE BADGE: Balanced at footer */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-20">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
          Anand Payment Node v2
        </span>
      </div>
    </section>
  );
};

export default WalletSnapshot;
