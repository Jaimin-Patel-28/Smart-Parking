import React from "react";
import {
  BarChart3,
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  ShieldCheck,
  Info,
} from "lucide-react";

const TransactionSummary = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden h-full">
      {/* 1. HEADER: Financial metadata */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <BarChart3 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Settlement Audit
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Analytics Node v1.4
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full">
          <ShieldCheck size={10} className="text-blue-400" />
          <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">
            Verified Log
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* 2. ANALYTICS STREAM: High-density interactive rows */}
        <SummaryRow
          icon={ArrowDownLeft}
          label="Total Capital Added"
          value="₹4,250.00"
          color="text-emerald-400"
          bgColor="bg-emerald-500/5"
        />

        <SummaryRow
          icon={ArrowUpRight}
          label="Total Node Expenditure"
          value="₹3,120.00"
          color="text-rose-400"
          bgColor="bg-rose-500/5"
        />

        <SummaryRow
          icon={RotateCcw}
          label="Reverted Settlements"
          value="₹140.00"
          color="text-amber-400"
          bgColor="bg-amber-500/5"
        />

        {/* 3. PERFORMANCE NOTE: Subtle technical metadata */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3 opacity-30 px-1">
          <Info size={12} className="shrink-0 mt-0.5" />
          <p className="text-[8px] font-black uppercase tracking-[0.2em] leading-relaxed">
            All values are audited in real-time against the Anand Central
            Financial Ledger.
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE SUMMARY ROW */
const SummaryRow = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-white/5 rounded-2xl group/row hover:border-white/10 transition-all shadow-inner">
    <div className="flex items-center gap-4">
      <div
        className={`p-2.5 ${bgColor} ${color} rounded-xl group-hover/row:scale-110 transition-transform`}
      >
        <Icon size={16} />
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className={`text-sm font-black tracking-tighter ${color}`}>
      {value}
    </span>
  </div>
);

export default TransactionSummary;
