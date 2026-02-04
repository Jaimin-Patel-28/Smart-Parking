import React from "react";
import {
  Scale,
  XCircle,
  RefreshCcw,
  Clock,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const BookingPolicies = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-indigo-500/20 flex flex-col h-full relative overflow-hidden">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:rotate-12 transition-transform duration-500">
            <Scale size={26} className="fill-indigo-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Policy Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Governance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
          <ShieldCheck size={14} className="text-indigo-500" />
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
            Active
          </span>
        </div>
      </div>

      {/* 2. POLICY STACK: High-density interactive rows */}
      <div className="space-y-4 flex-1 relative z-10">
        <PolicyRow
          icon={XCircle}
          label="Cancellation Policy"
          desc="Free cancellation up to 1h before start"
          color="text-rose-400"
        />
        <PolicyRow
          icon={RefreshCcw}
          label="Refund Information"
          desc="Credits returned to Smart Wallet instantly"
          color="text-emerald-400"
        />
        <PolicyRow
          icon={Clock}
          label="Late Entry Rules"
          desc="15-minute grace period for arrivals"
          color="text-amber-400"
        />
        <PolicyRow
          icon={PlusCircle}
          label="Extension Rules"
          desc="Subject to node availability & demand"
          color="text-blue-400"
        />
      </div>

      {/* 3. FOOTER: Subtle link for full terms */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center relative z-10">
        <button className="text-[9px] font-black text-slate-600 hover:text-white uppercase tracking-[0.3em] transition-colors">
          View Complete Governance Document
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10" />
    </section>
  );
};

/* REUSABLE POLICY ROW: Clean and informative */
const PolicyRow = ({ icon: Icon, label, desc, color }) => (
  <div className="group/row flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/10 hover:bg-slate-950 transition-all cursor-pointer shadow-inner">
    <div className="flex items-center gap-4">
      <div className={`shrink-0 p-2.5 rounded-xl bg-white/5 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-left">
        <p className="text-[11px] font-black text-white uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight line-clamp-1 group-hover/row:text-slate-400 transition-colors">
          {desc}
        </p>
      </div>
    </div>
    <ChevronRight
      size={14}
      className="text-slate-800 group-hover/row:text-slate-500 group-hover/row:translate-x-1 transition-all"
    />
  </div>
);

export default BookingPolicies;
