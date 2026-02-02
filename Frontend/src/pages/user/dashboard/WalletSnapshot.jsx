import React from "react";
import { Wallet, ArrowUpRight, History, Plus, CreditCard } from "lucide-react";

const WalletSnapshot = () => {
  return (
    <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 lg:p-8 shadow-2xl h-full flex flex-col relative overflow-hidden group">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="shrink-0 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
            <Wallet size={24} />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Wallet Hub
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest">
          Secure
        </div>
      </div>

      {/* PRIMARY BALANCE DISPLAY */}
      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
          Available Balance
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white tracking-tighter">
            ₹450.00
          </span>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            INR
          </span>
        </div>
      </div>

      {/* QUICK STATS GRID */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <History size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Last Activity
            </span>
          </div>
          <p className="text-xs font-bold text-white">-₹45.00</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <CreditCard size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Total Spent
            </span>
          </div>
          <p className="text-xs font-bold text-white">₹1,240.00</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-auto space-y-3">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 group/btn">
          <Plus
            size={18}
            className="group-hover/btn:rotate-90 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Add Money
          </span>
        </button>

        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-all">
          <ArrowUpRight size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            View Transactions
          </span>
        </button>
      </div>

      {/* INFRASTRUCTURE BADGE */}
      <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          Anand Payment Node v2
        </span>
      </div>
    </section>
  );
};

export default WalletSnapshot;
