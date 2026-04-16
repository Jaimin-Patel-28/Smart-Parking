import React from "react";
import { TrendingUp, BarChart3, Users, AlertCircle } from "lucide-react";

const ReportCard = ({ title, icon: Icon, value, subtitle, trend, bgColor }) => {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor || "from-[#FA8112]/10 to-[#FA8112]/5"} border border-[#F5E7C6]/10 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-2xl bg-[#FA8112]/20 text-[#FA8112]">
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              {trend}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-[11px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.2em] mb-2">
        {title}
      </h3>

      <p className="text-4xl font-black text-[#FAF3E1] tracking-tighter mb-1">
        {value}
      </p>

      {subtitle && (
        <p className="text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-wider">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ReportCard;
