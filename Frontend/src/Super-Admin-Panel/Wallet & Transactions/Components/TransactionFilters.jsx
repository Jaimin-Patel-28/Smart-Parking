import React from "react";
import { Filter, Calendar, X, Database, Activity } from "lucide-react";

const TransactionFilters = ({ filters, onFilterChange, onClear }) => {
  const hasFilters =
    filters.type || filters.status || filters.startDate || filters.endDate;

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const selectStyle =
    "w-full p-3.5 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1] outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all appearance-none cursor-pointer";

  const inputStyle =
    "w-full p-3.5 pl-10 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1] outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all [color-scheme:dark] cursor-pointer";

  return (
    <div className="bg-[#FAF3E1]/[0.01] p-6 md:p-8 rounded-xl border border-[#F5E7C6]/5 shadow-2xl space-y-6 relative overflow-hidden group">
      {/* 1. ARCHITECTURAL HEADER */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <Database size={14} className="text-[#FA8112]" />
          <h4 className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.4em]">
            Query_Parameter_Engine
          </h4>
        </div>

        {hasFilters && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
            <span className="h-1 w-1 rounded-full bg-[#FA8112] animate-pulse" />
            <span className="text-[9px] font-bold text-[#FA8112] uppercase tracking-widest">
              Active_Sequence
            </span>
          </div>
        )}
      </div>

      {/* 2. PARAMETER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* Transaction Type */}
        <div className="relative group/select">
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            className={selectStyle}
          >
            <option value="" className="bg-[#222222]">
              All_Flow_Types
            </option>
            <option value="credit" className="bg-[#222222]">
              Type: Credit_In
            </option>
            <option value="debit" className="bg-[#222222]">
              Type: Debit_Out
            </option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within/select:opacity-100 transition-opacity">
            <Activity size={12} className="text-[#FA8112]" />
          </div>
        </div>

        {/* Transaction Status */}
        <div className="relative group/select">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className={selectStyle}
          >
            <option value="" className="bg-[#222222]">
              All_Status_Nodes
            </option>
            <option value="success" className="bg-[#222222]">
              Status: Success
            </option>
            <option value="pending" className="bg-[#222222]">
              Status: Pending
            </option>
            <option value="failed" className="bg-[#222222]">
              Status: Failed
            </option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within/select:opacity-100 transition-opacity">
            <Activity size={12} className="text-[#FA8112]" />
          </div>
        </div>

        {/* Start Date */}
        <div className="relative group/field">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors"
            size={14}
          />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
            className={inputStyle}
          />
        </div>

        {/* End Date & Reset */}
        <div className="flex gap-2">
          <div className="relative flex-1 group/field">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors"
              size={14}
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange({ endDate: e.target.value })}
              className={inputStyle}
            />
          </div>

          {hasFilters && (
            <button
              onClick={onClear}
              className="px-4 bg-rose-500/5 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500 hover:text-[#222222] transition-all active:scale-95 group/reset"
              title="Purge Filters"
            >
              <X
                size={16}
                className="group-hover/reset:rotate-90 transition-transform"
              />
            </button>
          )}
        </div>
      </div>

      {/* 3. TECHNICAL METADATA FOOTER */}
      <div className="flex items-center gap-2 text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em] pt-2 border-t border-[#F5E7C6]/5">
        <Filter size={10} />
        Audit_Registry_Filter_Logic_V2
      </div>
    </div>
  );
};

export default TransactionFilters;
