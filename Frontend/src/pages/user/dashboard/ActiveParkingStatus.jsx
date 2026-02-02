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
    <section className="relative overflow-hidden bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 lg:p-8 shadow-2xl group transition-all duration-500 hover:border-blue-500/20">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>

      {/* HEADER AREA */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
            <Activity size={24} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Active Session
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                Live Status: Secure
              </span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/10 text-white rounded-xl transition-all group/btn">
          <span className="text-[10px] font-black uppercase tracking-widest">
            Details
          </span>
          <ChevronRight
            size={14}
            className="group-hover/btn:translate-x-0.5 transition-transform"
          />
        </button>
      </div>

      {/* RICH CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Location Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Location
            </span>
          </div>
          <p className="text-lg font-black text-white">Anand Central Mall</p>
          <p className="text-[10px] text-slate-500 font-medium">
            Gujarat Hub • Area A-1
          </p>
        </div>

        {/* Slot Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <Hash size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Parking Slot
            </span>
          </div>
          <p className="text-lg font-black text-blue-400">P-104 (Level 2)</p>
          <p className="text-[10px] text-slate-500 font-medium">
            Premium Reserved
          </p>
        </div>

        {/* Time Schedule */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Schedule
            </span>
          </div>
          <p className="text-lg font-black text-white">09:00 - 18:00</p>
          <p className="text-[10px] text-slate-500 font-medium">
            Monday, Feb 2, 2026
          </p>
        </div>

        {/* Countdown / Remaining Time */}
        <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Timer size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Remaining
            </span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-white tracking-tighter">
              02:45
            </span>
            <span className="text-[10px] font-bold text-slate-600 mb-1.5">
              HRS
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER BAR: STATUS AND ACTION */}
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Session Active
          </span>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            Extend Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActiveParkingStatus;
