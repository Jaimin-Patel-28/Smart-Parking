import React from "react";
import {
  IndianRupee,
  RotateCcw,
  Users,
  Activity,
  Zap,
  Terminal,
} from "lucide-react";

const WalletStatsGrid = ({ stats, loading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-44 bg-[#FAF3E1]/[0.01] animate-pulse rounded-xl border border-[#F5E7C6]/5"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Revenue Asset",
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <IndianRupee size={20} />,
      color: "text-[#FA8112]",
      bg: "bg-[#FA8112]/5",
      border: "border-[#FA8112]/20",
      trend: "Gross_Settlement",
    },
    {
      title: "Issued Refunds",
      value: `₹${stats?.totalRefunds?.toLocaleString() || 0}`,
      icon: <RotateCcw size={20} />,
      color: "text-amber-400",
      bg: "bg-amber-400/5",
      border: "border-amber-400/20",
      trend: "Credit_Reversal",
    },
    {
      title: "Registry Base",
      value: stats?.totalUsers || 0,
      icon: <Users size={20} />,
      color: "text-[#FAF3E1]",
      bg: "bg-[#FAF3E1]/5",
      border: "border-[#F5E7C6]/10",
      trend: "Active_Nodes",
    },
    {
      title: "Sequence Logs",
      value: stats?.totalTransactions || 0,
      icon: <Activity size={20} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/5",
      border: "border-cyan-400/20",
      trend: "Total_Sequences",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#FAF3E1]/[0.01] p-6 md:p-8 rounded-xl border border-[#F5E7C6]/5 shadow-2xl hover:bg-[#FAF3E1]/[0.02] transition-all duration-500 group relative overflow-hidden"
        >
          {/* ARCHITECTURAL UNDERLAY */}
          <div className="absolute -right-6 -top-6 text-[#FAF3E1]/[0.02] group-hover:text-[#FA8112]/[0.03] transition-colors duration-700">
            <Terminal size={140} strokeWidth={1} />
          </div>

          <div className="flex justify-between items-start mb-8 relative z-10">
            <div
              className={`p-3.5 rounded-lg border transition-all duration-500 group-hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.2)] ${card.bg} ${card.color} ${card.border}`}
            >
              {card.icon}
            </div>

            {/* SIGNAL BADGE */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] rounded-md border border-[#F5E7C6]/5">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FA8112]" />
              </div>
              <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
                Live
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <h3 className="text-4xl font-bold text-[#FAF3E1] tracking-tighter tabular-nums">
              {card.value}
            </h3>

            <div className="flex items-center gap-3 pt-2">
              <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
                {card.title}
              </p>
              <div className="h-px w-4 bg-[#F5E7C6]/10" />
              <p className="text-[9px] font-mono font-bold text-[#FA8112]/60 uppercase tracking-tighter">
                {card.trend}
              </p>
            </div>
          </div>

          {/* DECORATIVE BOTTOM ACCENT */}
          <div
            className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 opacity-40 ${card.color.replace("text", "bg")}`}
          />
        </div>
      ))}
    </div>
  );
};

export default WalletStatsGrid;
