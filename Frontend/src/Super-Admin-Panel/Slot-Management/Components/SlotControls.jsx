import React from "react";
import { RefreshCcw, Info } from "lucide-react";

const SlotControls = ({ total, occupied, onReset, isLoading }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 mb-10 shadow-sm relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#FA8112]/5 to-transparent pointer-events-none" />

      {/* Legend Section */}
      <div className="flex flex-wrap items-center gap-8 relative z-10">
        {/* Available Legend */}
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FA8112] shadow-[0_0_10px_#FA8112]" />
          <span className="text-[10px] font-black text-[#FAF3E1]/60 uppercase tracking-[0.15em]">
            available ({total - occupied})
          </span>
        </div>

        {/* Occupied Legend */}
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
          <span className="text-[10px] font-black text-[#FAF3E1]/60 uppercase tracking-[0.15em]">
            occupied ({occupied})
          </span>
        </div>

        {/* Maintenance Legend */}
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
          <span className="text-[10px] font-black text-[#FAF3E1]/60 uppercase tracking-[0.15em]">
            maintenance
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
        <button
          onClick={onReset}
          disabled={isLoading}
          // Button: Transparent with Accent Border | Hover: Solid Accent
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 text-[#FAF3E1] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
          Reset All Units
        </button>

        <div className="hidden lg:flex items-center gap-2 px-5 py-3 bg-[#FA8112]/10 text-[#FA8112] rounded-2xl border border-[#FA8112]/20">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">
            Live Sync
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlotControls;
