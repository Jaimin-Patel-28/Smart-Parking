import React from "react";
import {
  PlusCircle,
  History,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const WalletQuickActions = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/20 relative overflow-hidden h-full flex flex-col justify-between">
      {/* 1. HEADER: "Small & Perfect" operational labeling */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <Zap size={22} className="fill-emerald-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Quick Actions
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Execution Hub v1.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <ShieldCheck size={10} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            Active
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* 2. PRIMARY ACTION: High-impact Add Money */}
        <button className="w-full group/main relative overflow-hidden flex items-center justify-between p-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95">
          <div className="flex items-center gap-4">
            <PlusCircle
              size={20}
              className="group-hover/main:rotate-90 transition-transform duration-500"
            />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Add Money to Wallet
            </span>
          </div>
          <ArrowUpRight
            size={18}
            className="opacity-60 group-hover/main:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/main:translate-x-full transition-transform duration-1000" />
        </button>

        {/* 3. SECONDARY GRID: High-density utility buttons */}
        <div className="grid grid-cols-1 gap-3">
          <ActionTile
            icon={History}
            label="View Transactions"
            desc="Audit all node settlements"
            color="text-blue-400"
            bgColor="bg-blue-500/10"
          />
          <ActionTile
            icon={Zap}
            label="Auto Top-Up"
            desc="Automated balance refill"
            color="text-amber-400"
            bgColor="bg-amber-500/10"
          />
        </div>

        {/* 4. FOOTER: Verification metadata */}
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-20">
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
            Secure Asset Handling Node
          </p>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE ACTION TILE */
const ActionTile = ({ icon: Icon, label, desc, color, bgColor }) => (
  <button className="flex items-center justify-between w-full bg-slate-950/60 border border-white/5 rounded-2xl p-4 hover:bg-slate-950 hover:border-white/10 transition-all group/tile shadow-inner">
    <div className="flex items-center gap-4">
      <div
        className={`p-2.5 ${bgColor} ${color} rounded-xl group-hover/tile:scale-110 transition-transform`}
      >
        <Icon size={16} />
      </div>
      <div className="text-left">
        <p className="text-[10px] font-black text-white uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tight">
          {desc}
        </p>
      </div>
    </div>
    <ChevronRight
      size={14}
      className="text-slate-800 group-hover/tile:text-slate-500 group-hover/tile:translate-x-1 transition-all"
    />
  </button>
);

export default WalletQuickActions;
