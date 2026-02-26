import React from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Zap,
} from "lucide-react";

const WalletNotifications = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden h-full">
      {/* 1. HEADER: Small & Perfect analytical labeling */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <Bell size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Notifications
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Alert Stream v2.1
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full">
          <Zap size={10} className="text-blue-400 animate-pulse" />
          <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">
            Live Feed
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* 2. ALERT STREAM: High-density interactive rows */}
        <NotificationRow
          icon={AlertTriangle}
          label="Low Balance Alert"
          desc="Your balance is below ₹100. Top up to ensure uninterrupted parking."
          color="text-amber-400"
          bgColor="bg-amber-500/5"
          time="2m ago"
        />

        <NotificationRow
          icon={CheckCircle2}
          label="Top-Up Success"
          desc="₹500.00 has been successfully added to your Anand Smart Wallet."
          color="text-emerald-400"
          bgColor="bg-emerald-500/5"
          time="1h ago"
        />

        <NotificationRow
          icon={XCircle}
          label="Payment Failed"
          desc="Transaction for Slot P-104 failed due to insufficient node authority."
          color="text-rose-400"
          bgColor="bg-rose-500/5"
          time="Yesterday"
        />

        {/* 3. SYSTEM METADATA: Subtle stream protocol */}
        <div className="mt-6 pt-6 border-t border-white/5 opacity-20 flex items-center justify-center gap-3">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
            End of Notification Stream
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE NOTIFICATION ROW */
const NotificationRow = ({ icon: Icon, label, desc, color, bgColor, time }) => (
  <div className="group/row flex items-start justify-between p-4 bg-slate-950/60 border border-white/5 rounded-2xl hover:bg-slate-950 hover:border-white/10 transition-all cursor-pointer shadow-inner">
    <div className="flex gap-4">
      <div
        className={`shrink-0 p-2.5 ${bgColor} ${color} rounded-xl group-hover/row:scale-110 transition-transform`}
      >
        <Icon size={18} />
      </div>
      <div className="text-left pr-2">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-[10px] font-black text-white uppercase tracking-wider">
            {label}
          </p>
          <div className="flex items-center gap-1 text-slate-700">
            <Clock size={8} />
            <span className="text-[7px] font-black uppercase tracking-widest">
              {time}
            </span>
          </div>
        </div>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed group-hover/row:text-slate-400 transition-colors">
          {desc}
        </p>
      </div>
    </div>
    <ChevronRight
      size={14}
      className="mt-1 text-slate-800 group-hover/row:text-slate-500 group-hover/row:translate-x-1 transition-all"
    />
  </div>
);

export default WalletNotifications;
