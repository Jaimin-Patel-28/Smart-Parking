import React from "react";
import {
  Wallet,
  ArrowUpRight,
  History,
  Plus,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const WalletSnapshot = () => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
            <Wallet size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#222222]">Wallet</h2>
            <p className="text-sm text-[#6B6B6B]">Manage your credits</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">
          <ShieldCheck size={14} />
          Secure
        </div>
      </div>

      {/* Balance */}
      <div className="mb-8">
        <p className="text-sm text-[#6B6B6B] mb-1">Available Balance</p>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold text-[#222222]">₹450.00</span>
          <span className="text-sm text-[#6B6B6B]">INR</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#FAF3E1] rounded-xl p-4 border border-[#F5E7C6]">
          <div className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-1">
            <History size={14} />
            Last Use
          </div>
          <p className="text-sm font-medium text-[#222222]">-₹45.00</p>
        </div>

        <div className="bg-[#FAF3E1] rounded-xl p-4 border border-[#F5E7C6]">
          <div className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-1">
            <CreditCard size={14} />
            Total Spent
          </div>
          <p className="text-sm font-medium text-[#222222]">₹1,240.00</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#FA8112] hover:bg-[#e6730f] text-white rounded-lg text-sm transition">
          <Plus size={16} />
          Add Money
        </button>

        <button className="w-full flex items-center justify-center gap-2 py-3 border border-[#F5E7C6] rounded-lg text-sm text-[#6B6B6B] hover:bg-[#FAF3E1] transition">
          <ArrowUpRight size={16} />
          View History
        </button>
      </div>
    </section>
  );
};

export default WalletSnapshot;
