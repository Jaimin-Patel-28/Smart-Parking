import React from "react";
import { Calendar, Filter, Database, RefreshCw, BarChart3 } from "lucide-react";

const ReportFilters = ({ filters, onFilterChange, onRefresh, loading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const inputStyle =
    "w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1] focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] outline-none transition-all text-[12px] font-medium [color-scheme:dark]";

  return (
    <div className="bg-[#FAF3E1]/1 border border-[#F5E7C6]/5 rounded-xl p-6 md:p-8 space-y-8 shadow-2xl relative overflow-hidden group">
      {/* 1. SECTION IDENTITY */}
      <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FA8112]/10 rounded border border-[#FA8112]/20 text-[#FA8112]">
            <Filter size={16} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
              Query Engine
            </h3>
            <p className="text-sm font-bold text-[#FAF3E1] tracking-tight">
              Report Parameters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
            Protocol Active
          </span>
        </div>
      </div>

      {/* 2. PARAMETER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Start Date */}
        <div className="space-y-3">
          <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] ml-1">
            Period Start
          </label>
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
            />
            <input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) => onFilterChange("startDate", e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-3">
          <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] ml-1">
            Period End
          </label>
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
            />
            <input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) => onFilterChange("endDate", e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Report Type */}
        <div className="space-y-3">
          <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] ml-1">
            Data Schema
          </label>
          <div className="relative">
            <BarChart3
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10"
            />
            <select
              value={filters.reportType || "comprehensive"}
              onChange={(e) => onFilterChange("reportType", e.target.value)}
              className={`${inputStyle} pl-10 appearance-none cursor-pointer uppercase tracking-widest text-[10px]`}
            >
              <option value="comprehensive" className="bg-[#222222]">
                Comprehensive_Log
              </option>
              <option value="revenue" className="bg-[#222222]">
                Revenue_Settlement
              </option>
              <option value="occupancy" className="bg-[#222222]">
                Spatial_Occupancy
              </option>
              <option value="bookings" className="bg-[#222222]">
                Booking_Manifest
              </option>
              <option value="users" className="bg-[#222222]">
                User_Registry
              </option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex items-end">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="w-full h-10.5 flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FAF3E1] transition-all disabled:opacity-30 shadow-xl shadow-[#FA8112]/5 active:scale-[0.98]"
          >
            {loading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Database size={14} />
            )}
            {loading ? "PROCESSING..." : "GENERATE_NODE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
