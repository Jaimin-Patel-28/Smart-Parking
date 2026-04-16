import React from "react";
import { useTransactions } from "../Hooks/useTransactions";
import TransactionTable from "../Components/TransactionTable";
import TransactionFilters from "../Components/TransactionFilters";
import { FileText, Download, ChevronLeft, ChevronRight } from "lucide-react";

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
    link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter flex items-center gap-4">
            <FileText className="text-[#FA8112]" size={32} />
            Terminal <span className="text-[#FA8112]">Ledger</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Audit trail for every credit and debit sequence in the system.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={!transactions.length}
          className="flex items-center justify-center gap-3 bg-[#FAF3E1]/5 text-[#FAF3E1] border border-[#F5E7C6]/10 px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FA8112] hover:text-[#222222] transition-all active:scale-95 shadow-xl shadow-black/20 group disabled:opacity-50"
        >
          <Download
            size={18}
            className="group-hover:translate-y-0.5 transition-transform"
          />
          Export CSV Manifest
        </button>
      </div>

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-300 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      {/* Filters Component - Inherits dark theme internally */}
      <TransactionFilters
        filters={filters}
        onFilterChange={updateFilters}
        onClear={() =>
          updateFilters({ type: "", status: "", startDate: "", endDate: "" })
        }
      />

      {/* Data Table Container */}
      <div className="bg-[#FAF3E1]/2 p-2 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm min-h-125 flex flex-col justify-between">
        <TransactionTable transactions={transactions} loading={loading} />

        {/* Pagination Controls */}
        {!loading && transactions.length > 0 && (
          <div className="p-8 border-t border-[#F5E7C6]/5 flex items-center justify-between">
            <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
              Data Page{" "}
              <span className="text-[#FAF3E1]/60">
                {pagination.currentPage}
              </span>
              <span className="mx-2 opacity-50">/</span>
              <span className="text-[#FAF3E1]/60">{pagination.totalPages}</span>
            </p>

            <div className="flex gap-3">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => changePage(pagination.currentPage - 1)}
                className="p-3 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 text-[#FAF3E1]/40 rounded-xl disabled:opacity-10 hover:bg-[#FA8112] hover:text-[#222222] transition-all active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => changePage(pagination.currentPage + 1)}
                className="p-3 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 text-[#FAF3E1]/40 rounded-xl disabled:opacity-10 hover:bg-[#FA8112] hover:text-[#222222] transition-all active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* System Note */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          Secure Financial Node • Real-time Audit Enabled
        </p>
      </div>
    </div>
  );
};

export default TransactionHistory;
