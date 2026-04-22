import React, { useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Loader2, Wallet as WalletIcon, Download } from "lucide-react";
import useWallet from "../Hooks/useWallet";
import WalletSummaryCard from "../Components/WalletSummaryCard";
import TransactionList from "../Components/TransactionList";
import TopUpModal from "../Components/TopUpModal";

const Wallet = () => {
  const { summary, transactions, loadingSummary, loadingTransactions, topUpLoading, topUpWallet, onPaymentSuccess } = useWallet();
  const [amount, setAmount] = useState(500);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleTopUp = async () => {
    try {
      await topUpWallet(amount);
    } catch (err) {
      toast.error(err.response?.data?.message || "Top-up failed");
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setIsTopUpModalOpen(false);
    toast.success("Wallet updated successfully!");
    onPaymentSuccess(paymentData);
  };

  const handleDownloadTransactions = async () => {
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

    if (!start || !end) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (start > end) {
      toast.error("Start date cannot be after end date");
      return;
    }

    const filteredTransactions = (transactions || []).filter((transaction) => {
      const createdAt = transaction?.createdAt ? new Date(transaction.createdAt) : null;
      if (!createdAt || Number.isNaN(createdAt.getTime())) return false;
      return createdAt >= start && createdAt <= end;
    });

    if (!filteredTransactions.length) {
      toast.error("No transactions found in selected date range");
      return;
    }

    const totalCredit = filteredTransactions
      .filter((transaction) => transaction.type === "credit")
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

    const totalDebit = filteredTransactions
      .filter((transaction) => transaction.type !== "credit")
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    let y = 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Smart Parking - Wallet Transactions", 14, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date Range: ${format(start, "dd MMM yyyy")} to ${format(end, "dd MMM yyyy")}`, 14, y);

    y += 6;
    doc.text(`Records: ${filteredTransactions.length}`, 14, y);

    y += 6;
    doc.text(`Total Credit: INR ${totalCredit.toFixed(2)}`, 14, y);
    y += 5;
    doc.text(`Total Debit: INR ${totalDebit.toFixed(2)}`, 14, y);

    y += 8;
    doc.setDrawColor(235, 235, 235);
    doc.line(14, y, 196, y);

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Date", 14, y);
    doc.text("Type", 52, y);
    doc.text("Amount", 78, y);
    doc.text("Reference", 110, y);
    doc.text("Description", 145, y);

    y += 3;
    doc.line(14, y, 196, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    filteredTransactions.forEach((transaction) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      const createdAt = transaction?.createdAt ? new Date(transaction.createdAt) : null;
      const dateText = createdAt && !Number.isNaN(createdAt.getTime())
        ? format(createdAt, "dd MMM yyyy")
        : "N/A";
      const typeText = transaction?.type === "credit" ? "Credit" : "Debit";
      const amountText = `INR ${Number(transaction?.amount || 0).toFixed(2)}`;
      const referenceText = transaction?.booking?._id
        ? `BK-${transaction.booking._id.toString().slice(-6).toUpperCase()}`
        : transaction?._id
          ? transaction._id.toString().slice(-8).toUpperCase()
          : "N/A";
      const descriptionText = transaction?.description || (transaction?.type === "credit" ? "Wallet Credit" : "Wallet Debit");
      const wrappedDescription = doc.splitTextToSize(descriptionText, 48);

      doc.text(dateText, 14, y);
      doc.text(typeText, 52, y);
      doc.text(amountText, 78, y);
      doc.text(referenceText, 110, y);
      doc.text(wrappedDescription, 145, y);

      y += Math.max(6, wrappedDescription.length * 4.5);
    });

    const fileName = `wallet-transactions-${startDate}-to-${endDate}.pdf`;
    doc.save(fileName);
    toast.success("Transactions PDF downloaded");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#FAF3E1] tracking-tight uppercase flex items-center gap-4">
            <WalletIcon className="text-[#FA8112]" size={34} />
            Wallet <span className="text-[#FA8112]">Center</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-2">
            Balance, spending history, refunds, and deposits.
          </p>
        </div>
      </div>

      <WalletSummaryCard
        summary={summary}
        onTopUp={() => setIsTopUpModalOpen(true)}
        loading={loadingSummary}
      />

      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-sm font-black text-[#FAF3E1] uppercase tracking-[0.2em]">
              Transaction History
            </h2>
            <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] mt-1">
              Last synced on demand
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-28 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm font-black text-[#FAF3E1] outline-none focus:border-[#FA8112]"
            />
            <button
              onClick={() => setIsTopUpModalOpen(true)}
              disabled={topUpLoading}
              className="px-5 py-3 rounded-xl bg-[#FA8112] text-[#222222] font-black uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all disabled:opacity-60 flex items-center gap-2"
            >
              {topUpLoading ? <Loader2 size={14} className="animate-spin" /> : null}
              Add Funds
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 p-4">
          <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-[0.2em] mb-3">
            Download Last Transactions
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm font-black text-[#FAF3E1] outline-none focus:border-[#FA8112]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm font-black text-[#FAF3E1] outline-none focus:border-[#FA8112]"
              />
            </div>
            <button
              onClick={handleDownloadTransactions}
              className="h-11.5 px-5 rounded-xl bg-[#FA8112] text-[#222222] font-black uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all flex items-center justify-center gap-2"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

        <TransactionList transactions={transactions} loading={loadingTransactions} />
      </div>

      {/* Top-up Modal */}
      <TopUpModal 
        isOpen={isTopUpModalOpen} 
        onClose={() => setIsTopUpModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Wallet;
