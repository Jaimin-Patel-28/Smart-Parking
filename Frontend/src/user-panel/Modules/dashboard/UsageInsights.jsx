import React from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Activity,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

const UsageInsights = () => {
  const insights = [
    {
      label: "Monthly Bookings",
      value: 18,
      suffix: "/25",
      percent: 72,
      icon: TrendingUp,
      color: "bg-[#FA8112]",
      glow: "shadow-[0_0_10px_rgba(250,129,18,0.4)]",
    },
    {
      label: "Average Duration",
      value: 3.5,
      suffix: " hrs",
      percent: 45,
      icon: Clock,
      color: "bg-blue-500",
      glow: "shadow-[0_0_10px_rgba(59,130,246,0.4)]",
    },
  ];

  return (
    <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 md:p-8 space-y-8 relative overflow-hidden group">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-2xl text-[#FA8112]">
            <BarChart3 size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/30">
              Analytics Node
            </p>
            <h3 className="text-xl font-black text-[#FAF3E1] tracking-tight">
              Usage Insights
            </h3>
          </div>
        </div>
        <button className="p-2 rounded-full bg-[#FAF3E1]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] hover:bg-[#FA8112]/10 transition-all">
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* --- DATA TRACKS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item, index) => (
          <div
            key={index}
            className="bg-[#111111]/40 border border-[#F5E7C6]/5 p-5 rounded-3xl space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#FAF3E1]/40">
                <item.icon size={14} className="text-[#FA8112]" />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {item.label}
                </span>
              </div>
              <div className="text-[#FAF3E1] font-black text-lg tracking-tighter">
                {item.value}
                <span className="text-xs font-bold opacity-30 ml-0.5">
                  {item.suffix}
                </span>
              </div>
            </div>

            {/* Advanced Progress Track */}
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-[#222222] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-out ${item.color} ${item.glow}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold">
                <span className="text-[#FAF3E1]/20">Efficiency Index</span>
                <span className="text-[#FAF3E1]/60">{item.percent}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER ENGINE STATUS --- */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F5E7C6]/5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/30">
            Live Compute Active
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-[#FAF3E1]/5 rounded-lg border border-[#F5E7C6]/5">
          <Cpu size={10} className="text-[#FA8112]" />
          <span className="text-[9px] font-mono font-bold text-[#FAF3E1]/40 uppercase tracking-tighter">
            v2.06 Engine
          </span>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#FA8112]/5 blur-3xl rounded-full group-hover:bg-[#FA8112]/10 transition-colors" />
    </div>
  );
};

export default UsageInsights;
