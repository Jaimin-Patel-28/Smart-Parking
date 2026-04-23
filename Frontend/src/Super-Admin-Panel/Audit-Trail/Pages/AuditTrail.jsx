import React from "react";
import {
  Activity,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Terminal,
  Search,
} from "lucide-react";
import { useAuditTrail } from "../Hooks/useAuditTrail";

const AuditTrail = () => {
  const {
    logs,
    loading,
    error,
    filters,
    updateFilters,
    pagination,
    changePage,
    refresh,
  } = useAuditTrail();

  const inputStyle =
    "bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none focus:border-[#FA8112]/30 transition-all";

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. SECURITY HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Governance Protocol
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            System <span className="text-[#FA8112]">Audit Trail</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/20 font-bold uppercase tracking-widest leading-relaxed max-w-xl">
            Immutable session logs for high-integrity traceability and
            administrative accountability.
          </p>
        </div>

        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-widest hover:bg-[#FA8112]/10 hover:text-[#FA8112] transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Sync
          Logs
        </button>
      </div>

      {/* 2. FILTER CONSOLE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#FAF3E1]/[0.01] p-3 rounded-xl border border-[#F5E7C6]/5 shadow-2xl">
        <div className="md:col-span-1 relative group">
          <Terminal
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112]"
          />
          <input
            value={filters.module}
            onChange={(e) => updateFilters({ module: e.target.value })}
            placeholder="MODULE_ID"
            className={`${inputStyle} w-full pl-10`}
          />
        </div>
        <div className="md:col-span-2 relative group">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112]"
          />
          <input
            value={filters.action}
            onChange={(e) => updateFilters({ action: e.target.value })}
            placeholder="SEARCH_ACTION_SEQUENCE"
            className={`${inputStyle} w-full pl-10`}
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => updateFilters({ status: e.target.value })}
          className={`${inputStyle} appearance-none cursor-pointer`}
        >
          <option value="" className="bg-[#222222]">
            ALL_STATUS
          </option>
          <option value="success" className="bg-[#222222]">
            SUCCESS_ONLY
          </option>
          <option value="failed" className="bg-[#222222]">
            FAILURE_ONLY
          </option>
        </select>
      </div>

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-rose-400 text-[11px] font-bold uppercase tracking-widest">
          Critical Sync Error: {error}
        </div>
      )}

      {/* 3. LOG DATA VIEWPORT */}
      <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#FAF3E1]/[0.02] text-[9px] uppercase tracking-[0.4em] text-[#FAF3E1]/20">
                <th className="px-8 py-5 border-b border-[#F5E7C6]/5">
                  Sequence Timestamp
                </th>
                <th className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  Operational Actor
                </th>
                <th className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  Module Node
                </th>
                <th className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  Action Log
                </th>
                <th className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  Status
                </th>
                <th className="px-8 py-5 border-b border-[#F5E7C6]/5">
                  Target
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E7C6]/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <RefreshCw
                        size={32}
                        className="animate-spin text-[#FA8112]/40"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
                        Accessing Vault Logs...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-24 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10"
                  >
                    Zero Registry Entries Identified
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-[#FAF3E1]/[0.03] transition-colors group"
                  >
                    <td className="px-8 py-5 font-mono text-[11px] text-[#FAF3E1]/30 tabular-nums">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        hour12: false,
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#FAF3E1] text-[13px] tracking-tight">
                        {log.actor?.fullName || "SYSTEM_DAEMON"}
                      </div>
                      <div className="text-[10px] font-mono text-[#FAF3E1]/20 mt-0.5 tracking-tighter">
                        {log.actor?.email || "internal_trigger"}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-0.5 rounded bg-[#FA8112]/5 border border-[#FA8112]/10 text-[9px] font-bold tracking-[0.2em] text-[#FA8112]">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-[11px] text-[#FAF3E1]/60 uppercase tracking-tighter">
                      {log.action}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1 h-1 rounded-full ${log.status === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
                        />
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${log.status === "success" ? "text-emerald-400/60" : "text-rose-400/60"}`}
                        >
                          {log.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[11px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                      {log.targetType || "---"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION INTERFACE */}
        <div className="flex items-center justify-between px-8 py-5 bg-[#FAF3E1]/[0.01]">
          <div className="flex items-center gap-4">
            <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em]">
              Registry Load: {pagination.totalRecords} Sequences
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => changePage(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] disabled:opacity-5 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[10px] font-mono font-bold text-[#FAF3E1]/30 tabular-nums">
              PAGE_{pagination.page.toString().padStart(2, "0")} /{" "}
              {pagination.totalPages.toString().padStart(2, "0")}
            </span>
            <button
              onClick={() => changePage(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-lg bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] disabled:opacity-5 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
