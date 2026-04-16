import React from "react";
import { Search, Calendar, XCircle, Filter } from "lucide-react";

const BookingFilters = ({ filters, onFilterChange, onClear }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const inputBaseStyle =
    "w-full pl-12 pr-4 py-3 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl text-[#FAF3E1] placeholder-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 font-medium transition-all";

  return (
    <div className="bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Vehicle Search */}
        <div className="flex-1 relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Vehicle Number (e.g. GJ01...)"
            value={filters.vehicleNumber}
            onChange={(e) => onFilterChange("vehicleNumber", e.target.value)}
            className={inputBaseStyle}
          />
        </div>

        {/* Date Filter */}
        <div className="relative group">
          <Calendar
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
            size={18}
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange("date", e.target.value)}
            // Custom styling for date icon color in dark mode
            className={`${inputBaseStyle} [color-scheme:dark]`}
          />
        </div>

        {/* Clear Button - Styled with Rose Red for 'Reset' action */}
        {(filters.vehicleNumber || filters.date) && (
          <button
            onClick={onClear}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-[#222222] transition-all active:scale-95 shadow-lg shadow-rose-500/5"
          >
            <XCircle size={16} />
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] px-1">
        <Filter size={12} className="text-[#FA8112]" />
        Query Parameters
      </div>
    </div>
  );
};

export default BookingFilters;
