import React from "react";
import {
  Search,
  MapPin,
  Navigation,
  Compass,
  Terminal,
  Activity,
} from "lucide-react";

const ParkingSearch = ({ onSearch }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="relative w-full group animate-in fade-in slide-in-from-top-4 duration-700">
      {/* 1. SECTOR SCANNER GLOW: Reactive underlay */}
      <div className="absolute -inset-2 bg-[#FA8112]/[0.02] blur-3xl rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-4">
        {/* 2. SPATIAL QUERY INPUT */}
        <div className="relative flex-1 group/input">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-4 pointer-events-none transition-transform duration-500 group-focus-within/input:scale-110">
            <MapPin
              className="text-[#FA8112] drop-shadow-[0_0_10px_rgba(250,129,18,0.5)]"
              size={18}
              strokeWidth={2.5}
            />
            <div className="h-4 w-px bg-[#F5E7C6]/10" />
          </div>

          <input
            type="text"
            placeholder="SEARCH_SECTOR_IDENTIFIER (Area, Mall, Landmark)"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl py-5 pl-16 pr-6 text-sm font-bold text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.02] transition-all uppercase tracking-wider shadow-2xl"
          />

          {/* Tactical Label */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5">
            <Terminal size={10} className="text-[#FAF3E1]/10" />
            <span className="text-[8px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
              Global_Index_Scan
            </span>
          </div>
        </div>

        {/* 3. GPS_LOCK TRIGGER */}
        <button className="relative overflow-hidden flex items-center justify-center gap-4 bg-[#1a1a1a] border border-[#F5E7C6]/5 text-[#FAF3E1]/40 px-10 py-5 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#FA8112] hover:text-[#222222] hover:border-[#FA8112] transition-all shadow-2xl group/btn active:scale-95 shrink-0">
          <Navigation
            size={16}
            strokeWidth={2.5}
            className="group-hover/btn:animate-pulse -rotate-45"
          />
          <span>GPS_Lock_Near_Me</span>

          {/* Hardware Shine Overlay */}
          <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/btn:animate-[shine_2s_infinite] pointer-events-none" />
        </button>
      </div>

      {/* 4. TELEMETRY STATUS */}
      <div className="mt-5 ml-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Compass
            size={12}
            className="text-[#FA8112] animate-spin-slow opacity-40"
          />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
            Indexing_Live_Spatial_Coordinates
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#F5E7C6]/5 to-transparent" />
        <Activity size={10} className="text-[#FA8112]/20 animate-pulse" />
      </div>
    </div>
  );
};

export default ParkingSearch;
