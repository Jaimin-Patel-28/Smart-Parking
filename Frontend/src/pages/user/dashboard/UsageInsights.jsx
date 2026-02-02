import React from "react";
import { BarChart3, TrendingUp, Clock, CreditCard } from "lucide-react";

const UsageInsights = () => {
  const insights = [
    {
      label: "Monthly Bookings",
      value: "18/25",
      percent: 72,
      icon: TrendingUp,
      color: "text-blue-400",
    },
    {
      label: "Average Duration",
      value: "3.5 hrs",
      percent: 45,
      icon: Clock,
      color: "text-purple-400",
    },
    {
      label: "Wallet Usage",
      value: "₹1,240 spent",
      percent: 85,
      icon: CreditCard,
      color: "text-emerald-400",
    },
  ];

  return (
    <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 lg:p-8 shadow-2xl h-full flex flex-col">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400">
          <BarChart3 size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Usage Insights
          </h2>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            Node Analysis • Feb 2026
          </p>
        </div>
      </div>

      {/* INSIGHTS STACK */}
      <div className="space-y-6 flex-1">
        {insights.map((item, index) => (
          <div key={index} className="space-y-3 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon size={14} className={item.color} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
              <span className={`text-xs font-black ${item.color}`}>
                {item.value}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
              <div
                className={`h-full bg-current transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.2)] ${item.color.replace("text", "bg")}`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ANALYTICS BADGE */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-2 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          Anand Central Analytics Node
        </span>
      </div>
    </section>
  );
};

export default UsageInsights;
