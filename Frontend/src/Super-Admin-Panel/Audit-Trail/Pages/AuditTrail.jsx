import React from "react";
import { Activity, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuditTrail } from "../Hooks/useAuditTrail";

const AuditTrail = () => {
  const {
    logs,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refresh,
  } = useAuditTrail();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter flex items-center gap-3">
            <Activity className="text-[#FA8112]" size={30} />
            Admin <span className="text-[#FA8112]">Audit Trail</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            High-integrity action logs for governance and traceability
          </p>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 text-[#FAF3E1] text-[10px] font-black uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-colors"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#FAF3E1]/2 p-4 rounded-3xl border border-[#F5E7C6]/10">
        <input
          value={filters.module}
          onChange={(e) => updateFilters({ module: e.target.value })}
          placeholder="Filter module (e.g. settings)"
          className="bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/50"
        />
        <input
          value={filters.action}
          onChange={(e) => updateFilters({ action: e.target.value })}
          placeholder="Filter action (e.g. profile_update)"
          className="bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/50"
        />
        <select
          value={filters.status}
          onChange={(e) => updateFilters({ status: e.target.value })}
          className="bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] focus:outline-none focus:border-[#FA8112]/50"
        >
          <option value="">All statuses</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-300 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-220">
            <thead>
              <tr className="text-left border-b border-[#F5E7C6]/10 text-[10px] uppercase tracking-widest text-[#FAF3E1]/40">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Target</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center text-[#FAF3E1]/40 font-black uppercase tracking-[0.2em] text-[10px]">
                    Loading audit logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center text-[#FAF3E1]/40 font-black uppercase tracking-[0.2em] text-[10px]">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="border-t border-[#F5E7C6]/5 text-sm text-[#FAF3E1]">
                    <td className="px-6 py-4 text-[#FAF3E1]/60 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{log.actor?.fullName || "Unknown"}</div>
                      <div className="text-[11px] text-[#FAF3E1]/40">{log.actor?.email || "-"}</div>
                    </td>
                    <td className="px-6 py-4 uppercase text-[11px] tracking-wider text-[#FA8112]">
                      {log.module}
                    </td>
                    <td className="px-6 py-4">{log.action}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          log.status === "success"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-rose-500/15 text-rose-300"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#FAF3E1]/60">
                      {log.targetType || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[#F5E7C6]/10">
          <p className="text-[10px] text-[#FAF3E1]/40 font-black uppercase tracking-widest">
            Total: {pagination.totalRecords}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => changePage(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1] disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-[#FAF3E1]/50">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => changePage(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1] disabled:opacity-30"
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
