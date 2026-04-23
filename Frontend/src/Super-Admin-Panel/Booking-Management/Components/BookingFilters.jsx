import React from "react";
import { Search, Calendar, XCircle, Filter, Database } from "lucide-react";

const BookingFilters = ({ filters, onFilterChange, onClear }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const inputBaseStyle =
    "w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none focus:border-[#FA8112]/30 focus:bg-[#FAF3E1]/[0.03] text-[13px] font-medium transition-all uppercase tracking-wider";

  return (
    <div className="bg-[#FAF3E1]/[0.01] p-6 md:p-8 rounded-xl border border-[#F5E7C6]/5 shadow-2xl space-y-6 relative overflow-hidden">
      {/* 1. SECTION LABEL */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <Database size={14} className="text-[#FA8112]" />
          <h3 className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.4em]">
            Search Parameters
          </h3>
        </div>
        {(filters.vehicleNumber || filters.date) && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
            <span className="h-1 w-1 rounded-full bg-[#FA8112] animate-pulse" />
            <span className="text-[9px] font-bold text-[#FA8112] uppercase tracking-widest">
              Filters Active
            </span>
          </div>
        )}
      </div>

      {/* 2. FILTER INPUTS */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Vehicle Search */}
        <div className="flex-1 relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Vehicle Identifier (e.g. GJ01...)"
            value={filters.vehicleNumber}
            onChange={(e) => onFilterChange("vehicleNumber", e.target.value)}
            className={inputBaseStyle}
          />
        </div>

        {/* Date Filter */}
        <div className="relative group w-full lg:w-64">
          <Calendar
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
            size={16}
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange("date", e.target.value)}
            className={`${inputBaseStyle} [color-scheme:dark] cursor-pointer`}
          />
        </div>

        {/* Reset Action */}
        {(filters.vehicleNumber || filters.date) && (
          <button
            onClick={onClear}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-rose-500/5 text-rose-400 border border-rose-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-[#222222] transition-all active:scale-95 shadow-lg shadow-rose-500/5"
          >
            <XCircle size={14} />
            Reset Query
          </button>
        )}
      </div>

      {/* 3. TECHNICAL FOOTNOTE */}
      <div className="flex items-center gap-2 text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em] pt-2 border-t border-[#F5E7C6]/5">
        <Filter size={10} />
        Live Audit Registry Filter Node
      </div>
    </div>
  );
};

export default BookingFilters;
