import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, trend, isUp, color }) => {
  // Helper to extract the text color from the background color prop
  // e.g., if color is 'bg-blue-500', this helps set the icon to blue text
  const iconTextColor = color?.replace("bg-", "text-");

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
      <div className="flex justify-between items-start">
        {/* Dynamic Icon Container */}
        <div
          className={`p-3 rounded-xl ${color} bg-opacity-10 ${iconTextColor} transition-transform group-hover:scale-110 duration-300`}
        >
          {Icon && <Icon size={24} strokeWidth={2.5} />}
        </div>

        {/* Trend Indicator */}
        <div
          className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-black tracking-tight ${
            isUp ? "text-emerald-600 bg-emerald-50" : "text-rose-500 bg-rose-50"
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

      <div className="mt-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">
          {value || "0"}
        </h3>
      </div>

      {/* Subtle bottom progress line for visual flair */}
      <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
        <div className={`h-full ${color} opacity-20 w-2/3`}></div>
      </div>
    </div>
  );
};

export default StatsCard;
