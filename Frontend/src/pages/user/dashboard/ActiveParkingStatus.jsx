import React from "react";
import {
  MapPin,
  Hash,
  Clock,
  Timer,
  CheckCircle2,
  ChevronRight,
  Activity,
} from "lucide-react";

const ActiveParkingStatus = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-blue-500/20">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>

      {/* 1. HEADER AREA: Increased margin-bottom (mb-12) for better separation */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 shrink-0">
            <Activity size={28} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Active Session
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                Live Status: Secure
              </span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 text-white rounded-xl transition-all group/btn">
          <span className="text-[10px] font-black uppercase tracking-widest">
            Session Details
          </span>
          <ChevronRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* 2. RICH CONTENT GRID: Using gap-10 for 'Small & Perfect' breathing room */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Location Info */}
        <div className="space-y-2 relative">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Location
            </span>
          </div>
          <div className="pt-1">
            <p className="text-xl font-black text-white">Anand Central Mall</p>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight mt-1">
              Gujarat Hub • Area A-1
            </p>
          </div>
        </div>

        {/* Slot Info: Added vertical separator for desktop */}
        <div className="space-y-2 lg:border-l lg:border-white/5 lg:pl-10">
          <div className="flex items-center gap-2 text-slate-500">
            <Hash size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Parking Slot
            </span>
          </div>
          <div className="pt-1">
            <p className="text-xl font-black text-blue-400">
              P-104 <span className="text-sm font-bold opacity-60">(L2)</span>
            </p>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight mt-1">
              Premium Reserved
            </p>
          </div>
        </div>

        {/* Time Schedule */}
        <div className="space-y-2 lg:border-l lg:border-white/5 lg:pl-10">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Schedule
            </span>
          </div>
          <div className="pt-1">
            <p className="text-xl font-black text-white">09:00 - 18:00</p>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight mt-1">
              Monday, Feb 2, 2026
            </p>
          </div>
        </div>

        {/* Countdown Card: Cleaned up spacing */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-center shadow-inner min-w-30">
          <div className="flex items-center gap-2 text-amber-500 mb-2 px-1">
            {/* FIXED: Smaller icon for better clearance */}
            <Timer size={14} className="shrink-0" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
              Remaining
            </span>
          </div>

          <div className="flex items-baseline gap-1 px-1">
            {/* FIXED: Reduced font size from 3xl to 2xl to prevent overflow */}
            <span className="text-2xl font-black text-white tracking-tighter leading-none">
              02:45
            </span>
            {/* FIXED: Smaller HRS label aligned with baseline */}
            <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase">
              hrs
            </span>
          </div>

          {/* Optional: Add a subtle progress ring or bar if space allows */}
          <div className="mt-3 h-1 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          </div>
        </div>
      </div>

      {/* 3. FOOTER BAR: Anchored with clear separation (mt-12) */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-5 py-3 rounded-xl border border-emerald-500/10">
          <CheckCircle2 size={18} />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            Session Active
          </span>
        </div>

        <div className="flex gap-4">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95">
            Extend Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActiveParkingStatus;
