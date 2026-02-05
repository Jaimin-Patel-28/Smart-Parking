import React from "react";
import {
  Calendar,
  Clock,
  Hourglass,
  Timer,
  ChevronRight,
  Info,
} from "lucide-react";

const DateTimeSelector = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-indigo-500/20 relative overflow-hidden h-full flex flex-col justify-between">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:rotate-12 transition-transform duration-500">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Date & Time
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Timeline Node
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/5 border border-indigo-500/10 rounded-full">
          <Timer size={10} className="text-indigo-500 animate-pulse" />
          <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">
            Live Sync
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* 2. DATE SELECTION: Cinematic focus with icon */}
        <div className="relative group/input">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
            <Calendar size={18} />
          </div>
          <input
            type="date"
            className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs font-black text-white uppercase focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner scheme-dark"
          />
        </div>

        {/* 3. TIME RANGE: Split row for start/end */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group/time">
            <p className="absolute -top-2 left-4 px-2 bg-slate-900 text-[8px] font-black text-slate-500 uppercase tracking-widest z-20">
              Start Node
            </p>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/time:text-blue-400">
              <Clock size={16} />
            </div>
            <input
              type="time"
              className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-black text-white uppercase focus:outline-none focus:border-blue-500/50 transition-all shadow-inner scheme-dark"
            />
          </div>
          <div className="relative group/time">
            <p className="absolute -top-2 left-4 px-2 bg-slate-900 text-[8px] font-black text-slate-500 uppercase tracking-widest z-20">
              End Node
            </p>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/time:text-rose-400">
              <Clock size={16} />
            </div>
            <input
              type="time"
              className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-black text-white uppercase focus:outline-none focus:border-rose-500/50 transition-all shadow-inner scheme-dark"
            />
          </div>
        </div>

        {/* 4. DURATION ANALYTICS: High-density data node */}
        <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center justify-between group/duration">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Hourglass
                size={14}
                className="group-hover/duration:rotate-180 transition-transform duration-700"
              />
            </div>
            <div>
              <p className="text-[8px] font-black text-indigo-400/60 uppercase tracking-widest">
                Calculated Slot
              </p>
              <h4 className="text-[11px] font-black text-white uppercase tracking-wider">
                Total Duration
              </h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-white tracking-tighter">
              02:30
            </span>
            <span className="ml-1 text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Hrs
            </span>
          </div>
        </div>

        {/* 5. NOTICE: Subtle legal/system info */}
        <div className="flex items-center gap-2 opacity-30 px-1">
          <Info size={10} />
          <p className="text-[8px] font-black uppercase tracking-[0.2em]">
            Grace period: 15 mins included
          </p>
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[80px] -z-10 group-hover:bg-indigo-500/10 transition-all duration-700" />
    </section>
  );
};

export default DateTimeSelector;
