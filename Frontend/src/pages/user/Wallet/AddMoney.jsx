import React from "react";
import {
  PlusCircle,
  CreditCard,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const AddMoney = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/20 relative overflow-hidden">
      {/* 1. HEADER: Small & Perfect operational labeling */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <PlusCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              Add Money
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">
              Capital Inflow Node v2.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
            Secure Entry
          </span>
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        {/* 2. QUICK PRESETS: High-density interactive chips */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={12} className="text-amber-400" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Quick Selection Nodes
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["100", "500", "1000"].map((amount) => (
              <button
                key={amount}
                className="group/chip relative overflow-hidden py-4 bg-slate-950/60 border border-white/5 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all active:scale-95 shadow-inner"
              >
                <span className="text-lg font-black text-white tracking-tighter group-hover/chip:text-emerald-400">
                  ₹{amount}
                </span>
                <div className="absolute top-1 right-2 opacity-0 group-hover/chip:opacity-100 transition-opacity">
                  <Zap size={10} className="text-emerald-500 animate-pulse" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. CUSTOM INPUT: Cinematic focus node */}
        <div className="relative group/input">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors">
            <CreditCard size={20} />
          </div>
          <input
            type="number"
            placeholder="Enter Custom Amount..."
            className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-black text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-all shadow-inner uppercase tracking-widest"
          />
        </div>

        {/* 4. EXECUTION BUTTON: High-impact primary action */}
        <button className="w-full flex items-center justify-between p-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-600/20 transition-all active:scale-[0.98] group/main">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg group-hover/main:rotate-12 transition-transform">
              <PlusCircle size={20} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              Confirm Add Money
            </span>
          </div>
          <ChevronRight
            size={18}
            className="group-hover/main:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[120px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

export default AddMoney;
