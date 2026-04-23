import React from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCcw,
  Activity,
  Terminal,
  Zap,
} from "lucide-react";

const WalletSummaryCard = ({ summary, onTopUp, loading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  if (loading && !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-1">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 rounded-xl bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 relative overflow-hidden animate-pulse"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF3E1]/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Current_Vault",
      value: summary?.balance || 0,
      icon: Wallet,
      accent: "text-[#FA8112]",
      bg: "bg-[#FA8112]/5",
    },
    {
      title: "Node_Expenditure",
      value: summary?.totalSpent || 0,
      icon: ArrowDownLeft,
      accent: "text-rose-400",
      bg: "bg-rose-500/5",
    },
    {
      title: "Ledger_Injections",
      value: summary?.totalTopUps || 0,
      icon: ArrowUpRight,
      accent: "text-emerald-400",
      bg: "bg-emerald-500/5",
    },
    {
      title: "Protocol_Refunds",
      value: summary?.totalRefunds || 0,
      icon: RotateCcw,
      accent: "text-amber-400",
      bg: "bg-amber-500/5",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 1. TELEMETRY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-1">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl p-6 shadow-2xl transition-all duration-500 hover:border-[#FA8112]/30 overflow-hidden"
          >
            {/* Corner Icon Accent */}
            <div
              className={`absolute -right-2 -top-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 ${card.accent}`}
            >
              <card.icon size={80} strokeWidth={1} />
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div
                className={`p-2.5 rounded-lg border border-[#F5E7C6]/5 ${card.bg} ${card.accent}`}
              >
                <card.icon size={16} strokeWidth={2.5} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
                {card.title}
              </p>
            </div>

            <div className="space-y-1 relative z-10">
              <h3 className="text-3xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter leading-none">
                ₹
                {Number(card.value).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </h3>
              <div className="flex items-center gap-2 pt-2">
                <Activity
                  size={10}
                  className={`${card.accent} opacity-20 animate-pulse`}
                />
                <span className="text-[8px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                  Signal_Stable
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. SYSTEM ACTION CONSOLE */}
      <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl p-8 relative overflow-hidden group shadow-2xl mx-1">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#FA8112]/40" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="hidden sm:flex h-12 w-12 rounded-lg bg-[#FA8112]/5 border border-[#FA8112]/10 items-center justify-center text-[#FA8112]">
            <Terminal size={20} />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-ping" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FA8112]">
                Maintenance_Protocol
              </p>
            </div>
            <p className="text-sm font-bold text-[#FAF3E1]/40 uppercase tracking-wider">
              Inject funds to authorize new{" "}
              <span className="text-[#FAF3E1]/60">spatial allocations</span>.
            </p>
          </div>
        </div>

        <button
          onClick={onTopUp}
          className="group relative px-10 py-4 rounded-lg bg-[#FA8112] text-[#222222] font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#FAF3E1] transition-all shadow-2xl shadow-[#FA8112]/10 active:scale-[0.98] overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            <Zap size={14} className="fill-current" />
            Reload_Vault_Registry
          </div>
        </button>
      </div>
    </div>
  );
};

export default WalletSummaryCard;
