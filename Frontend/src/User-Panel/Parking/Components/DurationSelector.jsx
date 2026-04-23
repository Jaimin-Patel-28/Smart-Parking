import React from "react";
import { Clock, Calendar, ArrowRight, Terminal, Activity } from "lucide-react";

const DurationSelector = ({ onChange }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="relative group overflow-hidden bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 transition-all duration-500 hover:bg-[#FAF3E1]/[0.02] hover:border-[#FA8112]/20 shadow-2xl">
      {/* 1. SECTOR DECOR: Ghost HUD element */}
      <div className="absolute -right-6 -top-6 text-[#FA8112]/5 rotate-12 pointer-events-none group-hover:text-[#FA8112]/10 transition-colors duration-1000">
        <Terminal size={120} strokeWidth={1} />
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-8 relative z-10">
        {/* ARRIVAL PARAMETER */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]">
              <Clock size={12} strokeWidth={2.5} /> Arrival_Registry
            </label>
            <span className="text-[8px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
              In_Node
            </span>
          </div>

          <div className="relative group/input">
            <input
              type="datetime-local"
              onChange={(e) => onChange("startTime", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-5 text-sm font-bold text-[#FAF3E1] focus:outline-none focus:border-[#FA8112]/40 transition-all [color-scheme:dark] tabular-nums shadow-inner"
            />
          </div>
        </div>

        {/* LOGIC BRIDGE: Tactical Connector */}
        <div className="hidden md:flex flex-col items-center justify-center pt-6">
          <div className="h-px w-8 bg-gradient-to-r from-[#FA8112]/40 to-transparent mb-2" />
          <div className="bg-[#1a1a1a] p-2.5 rounded-lg border border-[#F5E7C6]/5 group-hover:border-[#FA8112]/40 transition-all duration-500 shadow-xl">
            <ArrowRight
              size={14}
              className="text-[#FA8112]"
              strokeWidth={2.5}
            />
          </div>
          <div className="h-px w-8 bg-gradient-to-l from-[#FA8112]/40 to-transparent mt-2" />
        </div>

        {/* DEPARTURE PARAMETER */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]">
              <Calendar size={12} strokeWidth={2.5} /> Departure_Registry
            </label>
            <span className="text-[8px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
              Out_Node
            </span>
          </div>

          <div className="relative group/input">
            <input
              type="datetime-local"
              onChange={(e) => onChange("endTime", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-5 text-sm font-bold text-[#FAF3E1] focus:outline-none focus:border-[#FA8112]/40 transition-all [color-scheme:dark] tabular-nums shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* 4. SYSTEM STATUS FOOTER */}
      <div className="mt-10 flex items-center gap-4 group-hover:gap-6 transition-all duration-700">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#F5E7C6]/5 to-transparent" />
        <div className="flex items-center gap-3">
          <Activity size={10} className="text-[#FA8112] animate-pulse" />
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
            Precision_Time_Sync_Active
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#F5E7C6]/5 to-transparent" />
      </div>
    </div>
  );
};

export default DurationSelector;
