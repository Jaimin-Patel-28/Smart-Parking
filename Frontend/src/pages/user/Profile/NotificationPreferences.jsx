import React from "react";
import { BellRing, Clock, CreditCard, ShieldCheck, Zap } from "lucide-react";

const NotificationPreferences = () => {
  return (
    /* FIXED: Using rounded-3xl and increased padding for 110% zoom safety */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-blue-500/20 h-full flex flex-col">
      {/* 1. HEADER: Increased spacing and responsive typography */}
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
            <BellRing size={26} className="fill-blue-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Alert Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Activity Stream
            </p>
          </div>
        </div>
      </div>

      {/* 2. PREFERENCES STACK: High-density interactive toggle rows */}
      <div className="space-y-4 flex-1">
        {/* Booking Notifications */}
        <ToggleRow
          icon={Clock}
          label="Booking Reminders"
          desc="Alerts for session starts and expirations."
          color="text-blue-400"
          defaultChecked={true}
        />

        {/* Payment Alerts */}
        <ToggleRow
          icon={CreditCard}
          label="Payment Alerts"
          desc="Instant receipts and wallet top-up notices."
          color="text-emerald-400"
          defaultChecked={true}
        />

        {/* System Updates */}
        <ToggleRow
          icon={ShieldCheck}
          label="System Security"
          desc="Critical node patches and login activity."
          color="text-purple-400"
          defaultChecked={false}
        />
      </div>

      {/* 3. QUICK ACTION: Content-rich footer button */}
      <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all active:scale-95 group/btn flex items-center justify-center gap-2">
        <Zap
          size={14}
          className="group-hover/btn:text-blue-400 transition-colors"
        />
        Pause All Notifications
      </button>
    </section>
  );
};

/* REUSABLE TOGGLE ROW: Clean, responsive, and animated */
const ToggleRow = ({ icon: Icon, label, desc, color, defaultChecked }) => (
  <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/10 hover:bg-slate-950 transition-all group/row cursor-pointer shadow-inner">
    <div className="flex items-center gap-4">
      <div className={`shrink-0 p-2.5 rounded-xl bg-white/5 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-left pr-4">
        <p className="text-[11px] font-black text-white uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight line-clamp-1 group-hover/row:text-slate-400 transition-colors">
          {desc}
        </p>
      </div>
    </div>

    {/* CUSTOM TOGGLE SWITCH: iOS Style */}
    <div className="relative inline-flex items-center shrink-0">
      <input
        type="checkbox"
        className="sr-only peer"
        defaultChecked={defaultChecked}
      />
      <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
    </div>
  </label>
);

export default NotificationPreferences;
