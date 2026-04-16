import React from "react";
import { Calendar, Filter } from "lucide-react";

const ReportFilters = ({ filters, onFilterChange, onRefresh, loading }) => {
  return (
    <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Filter size={20} className="text-[#FA8112]" />
        <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest">
          Report Filters
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest">
            Start Date
          </label>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FA8112] pointer-events-none"
            />
            <input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) => onFilterChange("startDate", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1] focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest">
            End Date
          </label>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FA8112] pointer-events-none"
            />
            <input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) => onFilterChange("endDate", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1] focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Report Type */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest">
            Report Type
          </label>
          <select
            value={filters.reportType || "comprehensive"}
            onChange={(e) => onFilterChange("reportType", e.target.value)}
            className="w-full px-4 py-3 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1] focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 outline-none transition-all font-medium appearance-none cursor-pointer"
          >
            <option value="comprehensive" className="bg-[#222222]">
              Comprehensive
            </option>
            <option value="revenue" className="bg-[#222222]">
              Revenue
            </option>
            <option value="occupancy" className="bg-[#222222]">
              Occupancy
            </option>
            <option value="bookings" className="bg-[#222222]">
              Bookings
            </option>
            <option value="users" className="bg-[#222222]">
              Users
            </option>
          </select>
        </div>

        {/* Refresh Button */}
        <div className="flex items-end">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="w-full px-6 py-3 bg-[#FA8112] text-[#222222] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all disabled:opacity-50 shadow-lg active:scale-95"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
