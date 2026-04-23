import React from "react";
import { RefreshCcw, Activity, ShieldAlert, Cpu } from "lucide-react";

const SlotControls = ({ total, occupied, onReset, isLoading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#FAF3E1]/[0.01] p-6 md:p-8 rounded-xl border border-[#F5E7C6]/5 mb-10 shadow-2xl relative overflow-hidden">
      {/* 1. ARCHITECTURAL ACCENT: Subtle light bleed */}
      <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-[#FA8112]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute -right-4 -bottom-4 text-[#FAF3E1]/[0.02] rotate-12">
        <Cpu size={120} />
      </div>

      {/* 2. TELEMETRY LEGEND: High-density data style */}
      <div className="flex flex-wrap items-center gap-10 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#FA8112]/40" />
            <h4 className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
              Bay Telemetry
            </h4>
          </div>

          <div className="flex items-center gap-8">
            {/* Available */}
            <div className="flex items-center gap-3 group">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FA8112] shadow-[0_0_8px_#FA8112] animate-pulse" />
              <span className="text-[10px] font-bold text-[#FAF3E1]/60 uppercase tracking-widest">
                Ready{" "}
                <span className="text-[#FAF3E1]/20 ml-1">
                  ({total - occupied})
                </span>
              </span>
            </div>

            {/* Occupied */}
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-500/40 border border-rose-500/20" />
              <span className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-widest">
                Engaged{" "}
                <span className="text-[#FAF3E1]/10 ml-1">({occupied})</span>
              </span>
            </div>

            {/* Maintenance */}
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400/40 border border-amber-400/20" />
              <span className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-widest">
                Offline
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SYSTEM ACTIONS */}
      <div className="flex items-center gap-4 w-full lg:w-auto relative z-10">
        {/* RESET ACTION: Technical phrasing */}
        <button
          onClick={onReset}
          disabled={isLoading}
          className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/40 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 transition-all active:scale-95 disabled:opacity-20 group"
        >
          <RefreshCcw
            size={14}
            className={`${isLoading ? "animate-spin text-rose-400" : "group-hover:rotate-180 transition-transform duration-500"}`}
          />
          Flush Registry
        </button>

        {/* LIVE STATUS INDICATOR */}
        <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-[#FA8112]/5 text-[#FA8112] rounded-lg border border-[#FA8112]/10">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FA8112]"></span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
            Live Signal
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlotControls;
