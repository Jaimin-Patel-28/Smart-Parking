import React, { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Wallet as WalletIcon } from "lucide-react";
import useWallet from "../Hooks/useWallet";
import WalletSummaryCard from "../Components/WalletSummaryCard";
import TransactionList from "../Components/TransactionList";
import TopUpModal from "../Components/TopUpModal";

const Wallet = () => {
  const { summary, transactions, loadingSummary, loadingTransactions, topUpLoading, topUpWallet, onPaymentSuccess } = useWallet();
  const [amount, setAmount] = useState(500);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

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
