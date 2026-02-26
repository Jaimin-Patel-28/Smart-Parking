import React from "react";
import {
  ShieldCheck,
  XCircle,
  Clock,
  RefreshCcw,
  ArrowUpCircle,
  Info,
  ChevronRight,
} from "lucide-react";

const BookingRules = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-indigo-500/20 relative overflow-hidden">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:rotate-12 transition-transform duration-500">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Booking Rules
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Compliance Node v1.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/5 border border-indigo-500/10 rounded-full">
          <Info size={10} className="text-indigo-400" />
          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">
            Active Governance
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* 2. RULE STREAM: High-density interactive rows */}
        <RuleRow
          icon={XCircle}
          label="Cancellation Policy"
          desc="Full refund available up to 60 mins before arrival node start."
          color="text-rose-400"
        />

        <RuleRow
          icon={Clock}
          label="Late Entry Rules"
          desc="15-minute grace period allowed beyond the target start time."
          color="text-amber-400"
        />

        <RuleRow
          icon={ArrowUpCircle}
          label="Extension Availability"
          desc="Slots can be extended via dashboard subject to real-time availability."
          color="text-blue-400"
        />

        <RuleRow
          icon={RefreshCcw}
          label="Refund Conditions"
          desc="Settlements are processed instantly to your verified Smart Wallet."
          color="text-emerald-400"
        />

        {/* 3. SYSTEM NOTE: Subtle technical metadata */}
        <div className="mt-6 pt-6 border-t border-white/5 opacity-30 flex items-center justify-center gap-3">
          <div className="w-1 h-1 rounded-full bg-slate-500" />
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
            Anand Smart City Governance Protocols
          </p>
          <div className="w-1 h-1 rounded-full bg-slate-500" />
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[80px] -z-10 group-hover:bg-indigo-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE RULE ROW */
const RuleRow = ({ icon: Icon, label, desc, color }) => (
  <div className="group/row flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:bg-slate-950 hover:border-white/10 transition-all cursor-help shadow-inner">
    <div className="flex items-center gap-4">
      <div className={`shrink-0 p-2.5 bg-white/5 rounded-xl ${color}`}>
        <Icon size={16} />
      </div>
      <div className="text-left pr-4">
        <p className="text-[10px] font-black text-white uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight group-hover/row:text-slate-400 transition-colors">
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

export default BookingRules;
