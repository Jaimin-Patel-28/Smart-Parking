import React from "react";
import { Search, Calendar, XCircle, Filter } from "lucide-react";

const BookingFilters = ({ filters, onFilterChange, onClear }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Vehicle Search */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Vehicle Number (e.g. GJ01...)"
            value={filters.vehicleNumber}
            onChange={(e) => onFilterChange("vehicleNumber", e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium transition-all"
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <Calendar
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange("date", e.target.value)}
            className="pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-emerald-500 font-medium text-slate-600 transition-all"
          />
        </div>

        {/* Clear Button */}
        {(filters.vehicleNumber || filters.date) && (
          <button
            onClick={onClear}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
          >
            <XCircle size={18} />
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
        <Filter size={12} />
        Quick Filters
      </div>
    </div>
  );
};

export default BookingFilters;
