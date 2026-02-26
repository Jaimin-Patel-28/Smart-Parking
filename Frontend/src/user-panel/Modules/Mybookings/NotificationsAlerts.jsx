import React from "react";
import {
  BellRing,
  Clock,
  ShieldAlert,
  CreditCard,
  ChevronRight,
  Zap,
} from "lucide-react";

const NotificationsAlerts = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-blue-500/20 flex flex-col h-full relative overflow-hidden">
      {/* 1. HEADER: Spaced for high zoom safety */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
            <BellRing size={26} className="fill-blue-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Alert Stream
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Event Node
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-xl">
          <Zap size={14} className="text-blue-400 animate-pulse" />
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      {/* 2. ALERT FEED: High-density interactive rows */}
      <div className="space-y-4 flex-1 relative z-10">
        <AlertRow
          icon={Clock}
          label="Booking Reminders"
          desc="15m prior to session start"
          color="text-blue-400"
          bg="bg-blue-500/10"
        />
        <AlertRow
          icon={ShieldAlert}
          label="Expiry Alerts"
          desc="Active node timeout warnings"
          color="text-amber-400"
          bg="bg-amber-500/10"
        />
        <AlertRow
          icon={Zap}
          label="Cancellations"
          desc="Instant refund confirmations"
          color="text-rose-400"
          bg="bg-rose-500/10"
        />
        <AlertRow
          icon={CreditCard}
          label="Payment Notices"
          desc="Wallet balance & top-up alerts"
          color="text-emerald-400"
          bg="bg-emerald-500/10"
        />
      </div>

      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
    </section>
  );
};

/* REUSABLE ALERT ROW: Clean and interactive */
const AlertRow = ({ icon: Icon, label, desc, color, bg }) => (
  <div className="group/row flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/10 hover:bg-slate-950 transition-all cursor-pointer shadow-inner">
    <div className="flex items-center gap-4">
      <div className={`shrink-0 p-2.5 rounded-xl ${bg} ${color}`}>
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

export default NotificationsAlerts;
