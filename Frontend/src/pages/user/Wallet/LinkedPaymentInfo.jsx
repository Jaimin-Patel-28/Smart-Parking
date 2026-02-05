import React from "react";
import {
  CreditCard,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  Zap,
  Lock,
} from "lucide-react";

const LinkedPaymentInfo = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden">
      {/* 1. HEADER: Small & Perfect operational labeling */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <CreditCard size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Linked Assets
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Payment Node v2.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full">
          <ShieldCheck size={10} className="text-blue-400" />
          <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">
            PCI Secure
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* 2. MASKED ASSET: High-density secure info */}
        <div className="p-5 bg-slate-950/60 border border-white/5 rounded-2xl flex items-center justify-between group/card shadow-inner hover:border-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover/card:text-blue-400 transition-colors">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">
                Primary Visa Node
              </p>
              <h4 className="text-[13px] font-black text-white uppercase tracking-widest">
                •••• •••• •••• 4022
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-emerald-500" />
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
              Default
            </span>
          </div>
        </div>

        {/* 3. UPDATE ACTION: Clean interactive button */}
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-[0.98] group/update shadow-md">
          <RefreshCw
            size={16}
            className="group-hover/update:rotate-180 transition-transform duration-700"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Update Payment Method
          </span>
        </button>

        {/* 4. SYSTEM METADATA: Subtle security disclaimer */}
        <div className="flex items-center justify-center gap-3 opacity-20 pt-2">
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">
            Encrypted Financial Pipeline
          </p>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

export default LinkedPaymentInfo;
