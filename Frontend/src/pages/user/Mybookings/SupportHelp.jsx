import React from "react";
import {
  LifeBuoy,
  AlertCircle,
  Headphones,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const SupportHelp = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-blue-500/20 flex flex-col h-full relative overflow-hidden">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
            <LifeBuoy size={26} className="fill-blue-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Support Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Assistance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-xl">
          <Sparkles size={14} className="text-blue-400 animate-pulse" />
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
            Priority
          </span>
        </div>
      </div>

      {/* 2. INTERACTIVE ACTIONS: Content-rich buttons with metadata */}
      <div className="space-y-4 flex-1 relative z-10">
        {/* Report Issue Button */}
        <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-rose-500/30 hover:bg-slate-950 transition-all group/btn shadow-inner">
          <div className="flex items-center gap-4">
            <div className="shrink-0 p-3 rounded-xl bg-rose-500/10 text-rose-400 group-hover/btn:scale-110 transition-transform">
              <AlertCircle size={20} />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-black text-white uppercase tracking-wider mb-0.5">
                Report Booking Issue
              </p>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">
                Technical or Slot Discrepancy
              </p>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-slate-800 group-hover/btn:text-rose-500 group-hover/btn:translate-x-1 transition-all"
          />
        </button>

        {/* Contact Support Button */}
        <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-blue-500/30 hover:bg-slate-950 transition-all group/btn shadow-inner">
          <div className="flex items-center gap-4">
            <div className="shrink-0 p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover/btn:scale-110 transition-transform">
              <Headphones size={20} />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-black text-white uppercase tracking-wider mb-0.5">
                Contact Support
              </p>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">
                24/7 Live Node Assistance
              </p>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-slate-800 group-hover/btn:text-blue-500 group-hover/btn:translate-x-1 transition-all"
          />
        </button>
      </div>

      {/* 3. QUICK HELP: Subtle footer message */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-20 relative z-10">
        <MessageSquare size={12} className="text-slate-500" />
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
          Typical Response: Under 5 mins
        </span>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
    </section>
  );
};

export default SupportHelp;
