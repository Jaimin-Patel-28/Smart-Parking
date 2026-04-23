import React from "react";
import { Search, X, Activity, Command } from "lucide-react";

const UserSearch = ({ value, onChange, onClear, isLoading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="relative group w-full animate-in fade-in duration-700">
      {/* 1. SEARCH ICON: Technical positioning */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors duration-500">
        <Search size={18} strokeWidth={2.5} />
      </div>

      {/* 2. MAIN INPUT: Sharper geometry and technical hint */}
      <input
        type="text"
        placeholder="SEARCH_REGISTRY_IDENTIFIER (Name, Email, or UID)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-32 py-4 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl text-sm font-medium text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all uppercase tracking-wider"
      />

      {/* 3. STATUS & COMMAND CONSOLE (Right Side) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        {isLoading ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5">
            <div className="h-3 w-3 border-2 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
            <span className="text-[9px] font-bold text-[#FA8112] uppercase tracking-widest">
              Syncing
            </span>
          </div>
        ) : value ? (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/5 border border-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-[#222222] transition-all group/clear"
          >
            <span className="text-[9px] font-bold uppercase tracking-widest">
              Reset
            </span>
            <X
              size={14}
              className="group-hover/clear:rotate-90 transition-transform"
            />
          </button>
        ) : (
          <div className="flex items-center gap-3 px-4 py-1.5 bg-[#FAF3E1]/[0.02] rounded-lg border border-[#F5E7C6]/5">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FA8112]"></span>
            </div>
            <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
              Signal_Live
            </span>
          </div>
        )}

        {/* Technical Key Hint */}
        <div className="hidden md:flex items-center gap-1 opacity-5 select-none">
          <Command size={10} />
          <span className="text-[10px] font-bold">K</span>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
