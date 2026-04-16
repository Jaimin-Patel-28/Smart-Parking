import React from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft, RotateCcw } from "lucide-react";

const WalletSummaryCard = ({ summary, onTopUp, loading }) => {
  if (loading && !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 rounded-[2rem] bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10"
          />
        ))}
      </div>
    );
  }

  const balance = summary?.balance || 0;

  const cards = [
    {
      title: "Balance",
      value: `₹${balance.toLocaleString()}`,
      icon: <Wallet size={22} />,
      accent: "text-[#FA8112]",
    },
    {
      title: "Spent",
      value: `₹${(summary?.totalSpent || 0).toLocaleString()}`,
      icon: <ArrowDownLeft size={22} />,
      accent: "text-rose-400",
    },
    {
      title: "Top-Ups",
      value: `₹${(summary?.totalTopUps || 0).toLocaleString()}`,
      icon: <ArrowUpRight size={22} />,
      accent: "text-cyan-400",
    },
    {
      title: "Refunds",
      value: `₹${(summary?.totalRefunds || 0).toLocaleString()}`,
      icon: <RotateCcw size={22} />,
      accent: "text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[2rem] p-5 shadow-sm"
          >
            <div className={`mb-4 ${card.accent}`}>{card.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF3E1]/30">
              {card.title}
            </p>
            <h3 className="text-2xl font-black text-[#FAF3E1] mt-2 tracking-tighter">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF3E1]/30">
            Quick Action
          </p>
          <p className="text-sm font-bold text-[#FAF3E1] mt-1">
            Add balance to unlock instant bookings.
          </p>
        </div>
        <button
          onClick={onTopUp}
          className="px-6 py-3 rounded-xl bg-[#FA8112] text-[#222222] font-black uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all"
        >
          Top Up Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletSummaryCard;
