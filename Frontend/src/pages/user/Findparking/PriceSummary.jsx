import React from "react";
import {
  CreditCard,
  Wallet,
  Calculator,
  MapPin,
  Hash,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const PriceSummary = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/20 relative overflow-hidden h-full flex flex-col justify-between">
      {/* 1. SECTION HEADER: Financial metadata */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500">
            <CreditCard size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Price Summary
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Settlement Node
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <ShieldCheck size={10} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            Verified Rate
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* 2. TRANSACTION CONTEXT: High-density info rows */}
        <div className="space-y-4 bg-slate-950/40 border border-white/5 rounded-2xl p-5 shadow-inner">
          <PriceDetail
            icon={MapPin}
            label="Location Node"
            value="Anand Central Hub"
          />
          <PriceDetail icon={Hash} label="Target Slot" value="Slot P-104" />
          <PriceDetail icon={Clock} label="Duration" value="02:30 Hrs" />
        </div>

        {/* 3. CALCULATION ENGINE: Content-rich breakdown */}
        <div className="space-y-3 px-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Base Rate (₹20/hr)
            </span>
            <span className="text-[11px] font-bold text-white uppercase tracking-tighter">
              ₹50.00
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Smart Fee
            </span>
            <span className="text-[11px] font-bold text-white uppercase tracking-tighter">
              ₹05.00
            </span>
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator size={12} className="text-blue-400" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Total Liability
              </span>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              ₹55.00
            </span>
          </div>
        </div>

        {/* 4. WALLET AUDIT: Real-time balance check */}
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between group/wallet cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Wallet size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-emerald-400/60 uppercase tracking-widest">
                Wallet Balance
              </p>
              <h4 className="text-[11px] font-black text-white uppercase tracking-wider">
                ₹450.00
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
              Sufficient
            </span>
            <ChevronRight
              size={12}
              className="text-slate-700 group-hover/wallet:translate-x-1 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE DETAIL ROW */
const PriceDetail = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between group/row">
    <div className="flex items-center gap-3">
      <Icon
        size={14}
        className="text-slate-600 group-hover/row:text-emerald-400 transition-colors"
      />
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className="text-[10px] font-black text-white uppercase tracking-tighter">
      {value}
    </span>
  </div>
);

export default PriceSummary;
