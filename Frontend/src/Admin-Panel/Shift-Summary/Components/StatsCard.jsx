import React from "react";

const StatsCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  trend,
  color = "#FA8112",
}) => {
  return (
    <div className="group relative bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-xl p-6 transition-all duration-300 hover:border-[#F5E7C6]/20 hover:bg-[#FAF3E1]/5 shadow-sm">
      {/* Background Accent - Subtle glow on hover */}
      <div
        className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
        {/* Header: Label and Icon */}
        <div className="flex items-start justify-between">
          <p className="text-[10px] md:text-[11px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] leading-tight">
            {label}
          </p>
          {Icon && (
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors"
              style={{
                backgroundColor: `${color}10`,
                borderColor: `${color}20`,
              }}
            >
              <Icon size={18} style={{ color }} strokeWidth={2} />
            </div>
          )}
        </div>

        {/* Value Section */}
        <div className="space-y-1">
          <h4 className="text-2xl md:text-3xl font-bold text-[#FAF3E1] tracking-tight">
            {value}
          </h4>
          {subtext && (
            <p className="text-[11px] font-medium text-[#FAF3E1]/40 flex items-center gap-1.5">
              {subtext}
            </p>
          )}
        </div>

        {/* Trend Indicator: Redesigned as a professional data badge */}
        {trend && (
          <div className="pt-1">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border"
              style={{
                color: color,
                backgroundColor: `${color}10`,
                borderColor: `${color}20`,
              }}
            >
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
