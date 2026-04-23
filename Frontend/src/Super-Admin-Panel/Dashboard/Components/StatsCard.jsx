import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, ArrowLeft } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  isUp,
  color,
  showBack = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-[#FAF3E1]/[0.02] p-6 rounded-xl border border-[#F5E7C6]/5 shadow-sm hover:border-[#FA8112]/20 hover:bg-[#FAF3E1]/[0.04] transition-all duration-300 cursor-default overflow-hidden">
      {/* 1. OPTIONAL NAVIGATION: If used in a sub-detail context */}
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20 hover:text-[#FA8112] transition-colors"
        >
          <ArrowLeft size={12} /> Back
        </button>
      )}

      <div className="flex justify-between items-start">
        {/* REFINED ICON: Sharper radius and subtle border */}
        <div className="p-2.5 rounded-lg bg-[#FA8112]/10 text-[#FA8112] border border-[#FA8112]/10 transition-transform group-hover:scale-105 duration-300">
          {Icon && <Icon size={20} strokeWidth={2} />}
        </div>

        {/* TREND BADGE: Disciplined weights and spacing */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase border ${
              isUp
                ? "text-emerald-400 bg-emerald-400/5 border-emerald-400/10"
                : "text-rose-400 bg-rose-400/5 border-rose-400/10"
            }`}
          >
            {isUp ? (
              <ArrowUpRight size={12} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={12} strokeWidth={2.5} />
            )}
            {trend}%
          </div>
        )}
      </div>

      <div className="mt-6 space-y-1">
        {/* TITLE: Muted secondary metadata */}
        <p className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em]">
          {title}
        </p>

        {/* VALUE: Clean, bold primary text */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#FAF3E1] tracking-tight">
          {value || "0"}
        </h3>
      </div>

      {/* REFINED PROGRESS ELEMENT: Technical accent */}
      <div className="mt-6 flex flex-col gap-1.5">
        <div className="h-[2px] w-full bg-[#FAF3E1]/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FA8112] opacity-60 transition-all duration-1000 group-hover:opacity-100"
            style={{ width: "65%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[8px] font-bold uppercase tracking-tighter text-[#FAF3E1]/20">
            Performance Index
          </span>
          <span className="text-[8px] font-bold uppercase tracking-tighter text-[#FA8112]">
            Stable
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
