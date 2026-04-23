import React from "react";
import { TrendingUp, Activity, BarChart2, RefreshCw  } from "lucide-react";

const RevenueChart = ({ data, viewType, setViewType, loading }) => {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="bg-[#FAF3E1]/[0.01] p-8 rounded-xl border border-[#F5E7C6]/5 shadow-2xl h-full relative overflow-hidden group">
      {/* 1. TECHNICAL GRID UNDERLAY: Mimics an oscilloscope or trading terminal */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,231,198,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,231,198,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FA8112]/[0.02] blur-[100px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Activity size={14} className="animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Live Telemetry
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Revenue <span className="text-[#FA8112]">Diagnostic</span>
          </h3>
        </div>

        {/* VIEW SELECTOR: Precision Toggle */}
        <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#F5E7C6]/5">
          {["daily", "monthly"].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                viewType === type
                  ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/10"
                  : "text-[#FAF3E1]/20 hover:text-[#FAF3E1]/60"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CHART VIEWPORT */}
      <div className="relative h-72 flex items-end justify-between gap-2 sm:gap-4 relative z-10 px-2">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <RefreshCw
                size={32}
                className="animate-spin text-[#FA8112]/40"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 rounded-full border-2 border-[#FA8112]/5 animate-ping" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
              Accessing Ledger...
            </p>
          </div>
        ) : data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center group/bar relative h-full justify-end"
            >
              {/* PRECISION TOOLTIP */}
              <div className="absolute -top-12 bg-[#222222] text-[#FAF3E1] border border-[#FA8112]/30 text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/bar:opacity-100 transition-all duration-300 -translate-y-2 group-hover/bar:translate-y-0 whitespace-nowrap font-bold shadow-2xl pointer-events-none z-20 tabular-nums">
                <span className="text-[#FA8112]/60 mr-2">VAL_</span>₹
                {item.amount.toLocaleString()}
              </div>

              {/* DATA BAR: Industrial Aesthetic */}
              <div
                className="w-full max-w-[18px] bg-[#FA8112]/80 rounded-t-sm transition-all duration-1000 ease-out group-hover/bar:bg-[#FA8112] group-hover/bar:shadow-[0_0_20px_rgba(250,129,18,0.2)] cursor-crosshair relative"
                style={{
                  height: `${(item.amount / maxAmount) * 100}%`,
                  minHeight: "4px",
                }}
              >
                {/* Scanline Detail */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
              </div>

              {/* AXIS LABEL */}
              <div className="h-10 mt-4 overflow-hidden">
                <span className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-tighter block rotate-45 origin-left group-hover/bar:text-[#FA8112] transition-colors tabular-nums">
                  {item.label}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
            <BarChart2 size={48} strokeWidth={1} />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] mt-4">
              No Signal Identified
            </p>
          </div>
        )}
      </div>

      {/* 3. METADATA FOOTER */}
      <div className="mt-8 pt-6 border-t border-[#F5E7C6]/5 flex justify-between items-center opacity-20 relative z-10">
        <div className="flex items-center gap-2">
          <TrendingUp size={12} />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
            Temporal Settlement Logic
          </span>
        </div>
        <span className="text-[9px] font-mono font-bold">REF_SYSTEM_01A</span>
      </div>
    </div>
  );
};

export default RevenueChart;
