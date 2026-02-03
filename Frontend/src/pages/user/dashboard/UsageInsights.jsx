import React from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CreditCard,
  Activity,
} from "lucide-react";

const UsageInsights = () => {
  const insights = [
    {
      label: "Monthly Bookings",
      value: "18/25",
      percent: 72,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Average Duration",
      value: "3.5 hrs",
      percent: 45,
      icon: Clock,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Wallet Usage",
      value: "₹1,240 spent",
      percent: 85,
      icon: CreditCard,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    /* FIXED: Using rounded-3xl and increased padding p-8 lg:p-10 for spacing.
       Removed backdrop-blur to resolve scrolling lag. */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl h-full flex flex-col group transition-all duration-500 hover:border-blue-500/20">
      {/* 1. SECTION HEADER: Increased margin-bottom (mb-10) */}
      <div className="flex items-center gap-4 mb-10">
        <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
          <BarChart3 size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Usage Insights
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">
            Node Analysis • Feb 2026
          </p>
        </div>
      </div>

      {/* 2. INSIGHTS STACK: Increased vertical gap (space-y-8) for better readability */}
      <div className="space-y-8 flex-1">
        {insights.map((item, index) => (
          <div key={index} className="space-y-4 group/item">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover/item:text-white transition-colors">
                  {item.label}
                </span>
              </div>
              <span
                className={`text-sm font-black tracking-tighter ${item.color}`}
              >
                {item.value}
              </span>
            </div>

            {/* PROGRESS BAR: Enhanced height and depth */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.3)] ${item.color.replace("text", "bg")}`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. ANALYTICS BADGE: Anchored at bottom with clear separation */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
        <Activity size={12} className="text-blue-500" />
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
          Anand Central Analytics Node
        </span>
      </div>
    </section>
  );
};

export default UsageInsights;
