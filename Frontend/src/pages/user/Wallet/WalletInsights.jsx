import React from "react";
import {
  TrendingUp,
  PieChart,
  Activity,
  Zap,
  Info,
  ChevronUp,
} from "lucide-react";

const WalletInsights = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/20 relative overflow-hidden h-full">
      {/* 1. HEADER: Small & Perfect analytical labeling */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <PieChart size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Wallet Insights
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Intelligence Node v1.2
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <Zap size={10} className="text-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            Live Engine
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* 2. CORE METRICS: High-density interactive data */}
        <div className="grid grid-cols-1 gap-4">
          <InsightCard
            icon={TrendingUp}
            label="Monthly Spending"
            value="₹1,240.00"
            trend="+12% vs last month"
            color="text-blue-400"
          />
          <InsightCard
            icon={Activity}
            label="Avg. Booking Cost"
            value="₹45.00"
            trend="Stabilized Node"
            color="text-indigo-400"
          />
        </div>

        {/* 3. USAGE TREND: Content-rich visual indicator */}
        <div className="p-5 bg-slate-950/60 border border-white/5 rounded-2xl shadow-inner group/trend hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Usage Trend Analytics
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ChevronUp size={12} />
              <span className="text-[10px] font-black uppercase tracking-tighter">
                Optimal
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-12">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-white/5 rounded-t-sm group-hover/trend:bg-emerald-500/20 transition-all duration-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* 4. SYSTEM ADVISORY: Subtle metadata */}
        <div className="flex items-center gap-2 opacity-30 px-1 pt-2">
          <Info size={10} />
          <p className="text-[8px] font-black uppercase tracking-[0.2em]">
            Data refresh based on last 30 node cycles.
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE INSIGHT CARD */
const InsightCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-white/5 rounded-2xl shadow-inner group/item hover:border-white/10 transition-all">
    <div className="flex items-center gap-4">
      <div
        className={`p-2 bg-white/5 ${color} rounded-lg group-hover/item:scale-110 transition-transform`}
      >
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-sm font-black text-white tracking-tighter">
          {value}
        </p>
      </div>
    </div>
    <div className="text-right">
      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">
        {trend}
      </span>
    </div>
  </div>
);

export default WalletInsights;
