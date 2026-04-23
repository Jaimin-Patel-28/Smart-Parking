import React from "react";
import { Calendar, Zap, CreditCard, Activity, Terminal } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = ({ stats }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  // 1. REFINED SKELETON: Matches new geometric precision
  if (!stats)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 animate-pulse relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF3E1]/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    );

  const cards = [
    {
      title: "Total_Bookings",
      value: stats.totalBookings || 0,
      change: Number(stats.totalBookingsChange || 0),
      icon: Calendar,
      color: "bg-[#FA8112]", // System Primary
    },
    {
      title: "Active_Sessions",
      value: stats.activeBookings || 0,
      change: Number(stats.activeBookingsChange || 0),
      icon: Activity,
      color: "bg-emerald-500", // Signal Healthy
    },
    {
      title: "Net_Expenditure",
      value: `₹${Number(stats.totalSpent || 0).toLocaleString()}`,
      change: Number(stats.totalSpentChange || 0),
      icon: CreditCard,
      color: "bg-sky-500", // Data Info
    },
    {
      title: "Utilization_Hours",
      value: `${Number(stats.totalHours || 0).toFixed(1)}h`,
      change: Number(stats.totalHoursChange || 0),
      icon: Zap,
      color: "bg-purple-500", // Power Cycle
    },
  ];

  return (
    <div className="space-y-6">
      {/* Optional internal header for the section */}
      <div className="flex items-center gap-3 opacity-20 ml-1">
        <Terminal size={14} />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
          Node_Metrics_Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-2"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <StatsCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
