import React from "react";
import { TrendingUp, Activity, ArrowUpRight } from "lucide-react";

const ReportCard = ({ title, icon: Icon, value, subtitle, trend, bgColor }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-6 md:p-8 shadow-2xl transition-all duration-500 hover:border-[#FA8112]/20 group`}
    >
      {/* 1. ARCHITECTURAL UNDERLAY: Subtle light bleed from the corner */}
      <div className="absolute -right-4 -top-4 text-[#FAF3E1]/[0.02] group-hover:text-[#FA8112]/[0.03] transition-colors duration-700">
        <Icon size={120} strokeWidth={1} />
      </div>

      <div className="flex items-start justify-between mb-8 relative z-10">
        {/* Icon Container: Sharper Geometry */}
        <div className="p-3 rounded-lg bg-[#FA8112]/5 border border-[#FA8112]/10 text-[#FA8112] shadow-[0_0_15px_rgba(250,129,18,0.05)]">
          <Icon size={20} strokeWidth={1.5} />
        </div>

        {/* Trend Indicator: Signal Style */}
        {trend && (
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/5 border border-emerald-500/10">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/80">
              {trend}
            </span>
          </div>
        )}
      </div>

      {/* 2. DATA SECTION */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
          {title}
        </h3>

        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-[#FAF3E1] tracking-tighter tabular-nums">
            {value}
          </p>
          <ArrowUpRight
            size={14}
            className="text-[#FA8112] opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {subtitle && (
          <div className="flex items-center gap-2 pt-2">
            <Activity size={10} className="text-[#FAF3E1]/10" />
            <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.2em]">
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* 3. TECHNICAL DECORATION: Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FA8112] transition-all duration-700 group-hover:w-full opacity-40" />
    </div>
  );
};

export default ReportCard;
