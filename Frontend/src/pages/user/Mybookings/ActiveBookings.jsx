import React from "react";
import {
  Timer,
  MapPin,
  Hash,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const ActiveBookings = () => {
  return (
    <section className="p-8 lg:p-10 space-y-10">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Timer size={20} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              Active Session
            </h2>
            <p className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.3em]">
              Real-time Tracking
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Live Node
          </span>
        </div>
      </div>

      {/* 2. CARD CONTAINER: High-density horizontal stack */}
      <ActiveBookingCard
        location="Anand Central Mall"
        slot="P-104"
        date="Feb 04, 2026"
        time="10:00 AM - 12:00 PM"
        remaining="01:24:12"
      />
    </section>
  );
};

const ActiveBookingCard = ({ location, slot, date, time, remaining }) => (
  <div className="group relative bg-slate-950/60 border border-blue-500/20 rounded-4xl p-8 transition-all duration-500 hover:border-blue-500/50 shadow-2xl shadow-blue-900/10 overflow-hidden">
    {/* Background Decorative Glow */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* LOCATION & SLOT: Bold primary data */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/5 rounded-2xl text-blue-400 group-hover:rotate-6 transition-transform">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Parking Node
            </p>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              {location}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-6 pl-1">
          <div className="flex items-center gap-2">
            <Hash size={14} className="text-slate-500" />
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
              Slot {slot}
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-6">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* TIME & DATE: Content-rich secondary info */}
      <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-white/5 lg:pl-10">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-slate-600" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {date}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-slate-600" />
          <span className="text-sm font-black text-white uppercase tracking-tight">
            {time}
          </span>
        </div>
        <div className="mt-2 py-3 px-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center justify-between">
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
            Remaining
          </span>
          <span className="text-lg font-black text-white font-mono tracking-widest animate-pulse">
            {remaining}
          </span>
        </div>
      </div>

      {/* ACTIONS: High-performance button stack */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95">
            <ExternalLink size={14} />
            Details
          </button>
          <button className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            Extend
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 py-3.5 border border-rose-500/20 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          <XCircle size={14} />
          Cancel Session
        </button>
      </div>
    </div>
  </div>
);

export default ActiveBookings;
