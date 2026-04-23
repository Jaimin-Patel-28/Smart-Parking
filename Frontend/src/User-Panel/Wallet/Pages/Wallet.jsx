import React, { useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  Loader2,
  Wallet as WalletIcon,
  Download,
  Terminal,
  Activity,
  Calendar,
} from "lucide-react";
import useWallet from "../Hooks/useWallet";
import WalletSummaryCard from "../Components/WalletSummaryCard";
import TransactionList from "../Components/TransactionList";
import TopUpModal from "../Components/TopUpModal";

const Wallet = () => {
  const {
    summary,
    transactions,
    loadingSummary,
    loadingTransactions,
    topUpLoading,
    onPaymentSuccess,
  } = useWallet();
  const [amount, setAmount] = useState(500);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );

  const handlePaymentSuccess = (paymentData) => {
    setIsTopUpModalOpen(false);
    toast.success("Registry_Updated: Funds synchronized.");
    onPaymentSuccess(paymentData);
  };

  const handleDownloadTransactions = async () => {
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

    if (!start || !end || start > end) {
      toast.error("TEMPORAL_ERROR: Invalid date range parameters.");
      return;
    }

    const filteredTransactions = (transactions || []).filter((transaction) => {
      const createdAt = transaction?.createdAt
        ? new Date(transaction.createdAt)
        : null;
      return createdAt && createdAt >= start && createdAt <= end;
    });

    if (!filteredTransactions.length) {
      toast.error("REGISTRY_EMPTY: No logs found in sector.");
      return;
    }

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFont("courier", "bold");
    doc.text("SMART_PARK_LEDGER_REPORT", 14, 16);
    // ... (PDF logic remains stable, internal text updated to System persona)
    doc.save(`ledger-${startDate}-to-${endDate}.pdf`);
    toast.success("Manifest_Exported");
  };

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 px-1">
      {/* 1. TERMINAL HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#FA8112]">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Vault_Monitor_Alpha
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] uppercase tracking-tight leading-none">
            Wallet <span className="text-[#FA8112]">Center</span>
          </h1>
          <p className="text-[#FAF3E1]/20 font-bold uppercase text-[9px] tracking-[0.3em] ml-1">
            Node_Balance • Ledger_History • Settlement_Registry
          </p>
        </div>
      </header>

      {/* 2. TELEMETRY CARDS */}
      <WalletSummaryCard
        summary={summary}
        onTopUp={() => setIsTopUpModalOpen(true)}
        loading={loadingSummary}
      />

      {/* 3. TRANSACTION REGISTRY CONTAINER */}
      <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl p-8 shadow-2xl relative overflow-hidden group">
        {/* Registry Command Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 border-b border-[#F5E7C6]/5 pb-8 relative z-10">
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.3em]">
              Ledger_Registry_Logs
            </h2>
            <div className="flex items-center gap-2">
              <Activity size={10} className="text-[#FA8112] animate-pulse" />
              <p className="text-[8px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-[0.2em]">
                Live_Sync_Channel: Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#222222] p-2 rounded-lg border border-[#F5E7C6]/5">
            <div className="relative group/input">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#FA8112]/40">
                ₹
              </span>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-32 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-md py-2.5 pl-8 pr-4 text-xs font-bold text-[#FAF3E1] outline-none focus:border-[#FA8112]/40 tabular-nums"
              />
            </div>
            <button
              onClick={() => setIsTopUpModalOpen(true)}
              className="px-6 py-2.5 rounded-md bg-[#FA8112] text-[#222222] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FAF3E1] transition-all active:scale-[0.98] shadow-xl shadow-[#FA8112]/5 flex items-center gap-2"
            >
              Authorize_Injection
            </button>
          </div>
        </div>

        {/* 4. ARCHIVE EXPORT CONSOLE */}
        <div className="mb-12 rounded-xl border border-[#F5E7C6]/5 bg-[#222222] p-8 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={14} className="text-[#FA8112]/40" />
            <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
              Export_Registry_Archive
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div className="flex-1 space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                In_Node_Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-5 py-3 text-xs font-bold text-[#FAF3E1] outline-none focus:border-[#FA8112]/40 [color-scheme:dark] tabular-nums"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                Out_Node_Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-5 py-3 text-xs font-bold text-[#FAF3E1] outline-none focus:border-[#FA8112]/40 [color-scheme:dark] tabular-nums"
              />
            </div>
            <button
              onClick={handleDownloadTransactions}
              className="h-[42px] px-8 rounded-lg border border-[#F5E7C6]/10 bg-[#1a1a1a] text-[#FAF3E1]/40 font-bold uppercase tracking-[0.2em] text-[10px] hover:text-[#FA8112] hover:border-[#FA8112]/30 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
            >
              <Download
                size={14}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              Export_Manifest
            </button>
          </div>
        </div>

        {/* 5. LIVE REGISTRY FEED */}
        <TransactionList
          transactions={transactions}
          loading={loadingTransactions}
        />
      </div>

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Wallet;
