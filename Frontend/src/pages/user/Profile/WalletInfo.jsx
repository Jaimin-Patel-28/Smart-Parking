import React from "react";
import {
  Wallet,
  Plus,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const WalletInfo = () => {
  return (
    /* FIXED: Using rounded-3xl and increased padding p-8 lg:p-10 for professional depth */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-emerald-500/20 flex flex-col h-full relative overflow-hidden">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform duration-500">
            <Wallet size={26} className="fill-emerald-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Wallet Hub
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Payment Node
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10 uppercase tracking-widest">
          <ShieldCheck size={14} />
          Secure
        </div>
      </div>

      {/* 2. BALANCE DISPLAY: High-density typography for primary stats */}
      <div className="mb-10 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2 px-1">
          Available Credits
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-white tracking-tighter shadow-sm">
            ₹450.00
          </span>
          <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
            INR
          </span>
        </div>
      </div>

      {/* 3. PAYMENT METHOD TILE: Content-rich interactive row */}
      <div className="space-y-4 flex-1 relative z-10">
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 shadow-inner group/method hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover/method:text-emerald-400 transition-colors">
                <CreditCard size={14} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Linked Method
              </span>
            </div>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-white tracking-wide">
              •••• 4242
            </p>
            <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:underline">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* 4. ACTION BUTTONS: Production-ready responsive scaling */}
      <div className="mt-10 space-y-4 relative z-10">
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95 group/btn">
          <Plus
            size={18}
            className="group-hover/btn:rotate-90 transition-transform duration-300"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Add Credits
          </span>
        </button>

        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-all shadow-sm active:scale-95">
          <ArrowUpRight size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            View Transactions
          </span>
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

export default WalletInfo;
