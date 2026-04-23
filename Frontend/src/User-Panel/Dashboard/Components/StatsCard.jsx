import React from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = "bg-[#FA8112]",
}) => {
  const isPositive = change >= 0;

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="relative overflow-hidden bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-6 transition-all duration-500 hover:bg-[#FAF3E1]/[0.03] hover:border-[#FA8112]/20 group h-full flex flex-col justify-between shadow-2xl">
      {/* 1. ARCHITECTURAL HEADER: Icon & Trend */}
      <div className="flex items-start justify-between mb-12 relative z-10">
        <div
          className={`p-3 rounded-lg border border-[#F5E7C6]/5 transition-all duration-500 group-hover:scale-105 group-hover:border-[#FA8112]/40 shadow-inner ${color.replace("bg-", "text-")} bg-[#1a1a1a]`}
        >
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-widest ${
              isPositive
                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                : "bg-rose-500/5 text-rose-400 border-rose-500/10"
            }`}
          >
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(change)}%
          </div>
          <span className="text-[8px] font-mono text-[#FAF3E1]/10 uppercase tracking-[0.2em]">
            Signal_Stable
          </span>
        </div>
      </div>

      {/* 2. DATA DISPLAY: Label & Value */}
      <div className="space-y-1 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className={`h-1 w-1 rounded-full ${color.replace("bg-", "bg-")} animate-pulse shadow-[0_0_8px] shadow-current`}
          />
          <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 truncate">
            {title}
          </h4>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-4xl font-bold text-[#FAF3E1] tracking-tighter tabular-nums leading-none">
            {value}
          </span>

          <div className="flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity duration-700">
            <Activity size={12} className="text-[#FAF3E1]" />
          </div>
        </div>

        {/* 3. TECHNICAL PROGRESS: Calibrated Ticks */}
        <div className="mt-6 space-y-1.5">
          <div className="h-[3px] w-full bg-[#FAF3E1]/5 rounded-full overflow-hidden flex gap-[2px]">
            <div
              className={`h-full ${color} opacity-60 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(250,129,18,0.2)]`}
              style={{ width: `${Math.min(Math.abs(change) + 40, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[7px] font-mono text-[#FAF3E1]/5 uppercase">
              0%
            </span>
            <span className="text-[7px] font-mono text-[#FAF3E1]/5 uppercase">
              Capacity_Load
            </span>
            <span className="text-[7px] font-mono text-[#FAF3E1]/5 uppercase">
              100%
            </span>
          </div>
        </div>
      </div>

      {/* Background Decorative Glow: Muted for professional use */}
      <div
        className={`absolute -right-10 -bottom-10 w-32 h-32 blur-[80px] opacity-10 rounded-full transition-opacity duration-700 group-hover:opacity-20 ${color}`}
      />
    </div>
  );
};

export default StatsCard;
