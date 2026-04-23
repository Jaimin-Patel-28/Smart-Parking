import React from "react";
import { useTransactions } from "../Hooks/useTransactions";
import TransactionTable from "../Components/TransactionTable";
import TransactionFilters from "../Components/TransactionFilters";
import {
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Database,
  ShieldCheck,
  Activity,
} from "lucide-react";

const TransactionHistory = () => {
  const {
    transactions,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
  } = useTransactions();

  const handleExportCSV = () => {
    if (!transactions.length) return;

    const headers = [
      "Date",
      "Type",
      "Status",
      "Amount",
      "Description",
      "User Name",
      "User Email",
    ];
    const rows = transactions.map((tx) => [
      new Date(tx.createdAt).toISOString(),
      tx.type || "",
      tx.status || "",
      tx.amount ?? "",
      (tx.description || "").replaceAll('"', '""'),
      (tx.user?.fullName || "").replaceAll('"', '""'),
      (tx.user?.email || "").replaceAll('"', '""'),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "")}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ledger-manifest-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. AUDIT HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Database size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Financial Telemetry
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Terminal <span className="text-[#FA8112]">Ledger</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed">
            Authorized audit trail for credit/debit sequences within the system
            architecture.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={!transactions.length || loading}
          className="flex items-center justify-center gap-3 bg-[#FAF3E1]/5 text-[#FAF3E1]/60 border border-[#F5E7C6]/5 px-8 py-2.5 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FA8112] hover:text-[#222222] hover:border-[#FA8112] transition-all active:scale-95 disabled:opacity-20 group"
        >
          <Download
            size={16}
            strokeWidth={2.5}
            className="group-hover:translate-y-0.5 transition-transform"
          />
          Export_CSV_Manifest
        </button>
      </div>

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-rose-400 text-[11px] font-bold uppercase tracking-widest">
          Critical Registry Error: {error}
        </div>
      )}

      {/* 2. FILTER ENGINE */}
      <TransactionFilters
        filters={filters}
        onFilterChange={updateFilters}
        onClear={() =>
          updateFilters({ type: "", status: "", startDate: "", endDate: "" })
        }
      />

      {/* 3. DATA VIEWPORT */}
      <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl overflow-hidden shadow-2xl min-h-[600px] flex flex-col">
        <div className="flex-1">
          <TransactionTable transactions={transactions} loading={loading} />
        </div>

        {/* 4. PAGINATION CONTROLS */}
        {!loading && transactions.length > 0 && (
          <div className="p-6 border-t border-[#F5E7C6]/5 bg-[#1a1a1a]/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-1 w-1 rounded-full bg-[#FA8112] animate-pulse" />
              <p className="text-[10px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
                Page_Index:{" "}
                <span className="text-[#FAF3E1]/60 tabular-nums">
                  {pagination.currentPage}
                </span>
                <span className="mx-2">/</span>
                <span className="text-[#FAF3E1]/60 tabular-nums">
                  {pagination.totalPages}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => changePage(pagination.currentPage - 1)}
                className="p-2.5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 text-[#FAF3E1]/40 rounded-lg disabled:opacity-5 hover:bg-[#FA8112]/10 hover:text-[#FA8112] transition-all active:scale-90"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => changePage(pagination.currentPage + 1)}
                className="p-2.5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 text-[#FAF3E1]/40 rounded-lg disabled:opacity-5 hover:bg-[#FA8112]/10 hover:text-[#FA8112] transition-all active:scale-90"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 pt-4 opacity-20">
        <div className="flex items-center gap-4 text-[#FAF3E1]">
          <span className="h-px w-12 bg-current" />
          <ShieldCheck size={14} />
          <span className="h-px w-12 bg-current" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Secure Financial Node • Site_Registry_Sync_Enabled
        </p>
      </div>
    </div>
  );
};

export default TransactionHistory;
