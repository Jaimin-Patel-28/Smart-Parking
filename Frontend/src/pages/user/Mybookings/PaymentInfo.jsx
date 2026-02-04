import React from "react";
import {
  CreditCard,
  Receipt,
  Hash,
  CheckCircle2,
  Download,
  ShieldCheck,
} from "lucide-react";

const PaymentInfo = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-emerald-500/20 flex flex-col h-full relative overflow-hidden">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500">
            <CreditCard size={26} className="fill-emerald-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Payment Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Financial Asset Log
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            Secure
          </span>
        </div>
      </div>

      {/* 2. TRANSACTION DATA: High-density typography for primary stats */}
      <div className="space-y-8 flex-1 relative z-10">
        {/* Total Amount Paid */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 shadow-inner">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2 px-1">
            Settled Amount
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tighter">
              ₹125.00
            </span>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              INR
            </span>
          </div>
        </div>

        {/* Payment Details Grid */}
        <div className="grid grid-cols-1 gap-6 px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hash size={14} className="text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                TXN ID
              </span>
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-tighter">
              SP-TX-2026-0402
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard size={14} className="text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Method
              </span>
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-tighter">
              Smart Wallet
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Invoice
              </span>
            </div>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-lg border border-emerald-500/10 uppercase tracking-widest">
              Generated
            </span>
          </div>
        </div>
      </div>

      {/* 3. ACTION HUB: Production-ready responsive scaling */}
      <div className="mt-10 relative z-10">
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-all shadow-sm active:scale-95 group/btn">
          <Download
            size={18}
            className="group-hover/btn:-translate-y-0.5 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Download Receipt
          </span>
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

export default PaymentInfo;
