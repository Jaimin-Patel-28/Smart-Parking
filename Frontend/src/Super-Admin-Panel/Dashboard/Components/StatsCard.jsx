import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, trend, isUp, color }) => {
  // Theme Variables Applied:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="bg-[#FAF3E1]/[0.02] p-6 rounded-[2rem] border border-[#F5E7C6]/10 shadow-sm hover:shadow-xl hover:shadow-[#FA8112]/5 hover:-translate-y-1 transition-all duration-300 group cursor-default">
      <div className="flex justify-between items-start">
        {/* Dynamic Icon Container - Using Accent Color #FA8112 as primary */}
        <div
          className={`p-3 rounded-2xl bg-[#FA8112]/10 text-[#FA8112] transition-transform group-hover:scale-110 duration-300 border border-[#FA8112]/20`}
        >
          {Icon && <Icon size={24} strokeWidth={2.5} />}
        </div>

        {/* Trend Indicator - Refined for Dark Mode */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${
            isUp
              ? "text-[#FA8112] bg-[#FA8112]/10"
              : "text-rose-400 bg-rose-400/10"
          }`}
        >
          {isUp ? (
            <ArrowUpRight size={14} strokeWidth={3} />
          ) : (
            <ArrowDownRight size={14} strokeWidth={3} />
          )}
          {trend}%
        </div>
      </div>

      <div className="mt-6">
        {/* Title: Cream Text at 40% Opacity */}
        <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.15em]">
          {title}
        </p>
        {/* Value: Primary Cream Text #FAF3E1 */}
        <h3 className="text-3xl font-black text-[#FAF3E1] mt-1 tracking-tighter">
          {value || "0"}
        </h3>
      </div>

      {/* Subtle bottom progress line: Using Accent #FA8112 */}
      <div className="mt-5 h-1 w-full bg-[#FAF3E1]/[0.05] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FA8112] opacity-40 transition-all duration-1000"
          style={{ width: "65%" }}
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;
