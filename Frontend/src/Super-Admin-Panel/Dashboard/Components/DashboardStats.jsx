import React from "react";
import StatsCard from "./StatsCard";
import { Car, Users, IndianRupee, CheckCircle, Activity } from "lucide-react";

const DashboardStats = ({ data = {} }) => {
  // Theme: BG #222222 | Text #FAF3E1 | Accent #FA8112

  const stats = [
    {
      label: "Revenue Stream",
      value: data.totalRevenue
        ? `₹${data.totalRevenue.toLocaleString()}`
        : "₹0",
      icon: IndianRupee,
      trend: `${data.revenueTrend || 0}%`,
      subtext: "Gross earnings this period",
      color: "#FA8112",
    },
    {
      label: "Network Users",
      value: data.activeUsers?.toLocaleString() || "0",
      icon: Users,
      trend: `${data.usersTrend || 0}%`,
      subtext: "Live active accounts",
      color: "#FA8112",
    },
    {
      label: "Slot Occupancy",
      // Refined the display for better clarity in the Super Admin view
      value: `${data.occupiedSlots || 0} / ${data.totalSlots || 0}`,
      icon: Car,
      trend: `${data.occupancyRate || 0}%`,
      subtext: "Current bay utilization",
      // Using a secondary color for occupancy warning if high
      color: (data.occupancyRate || 0) > 85 ? "#ef4444" : "#FA8112",
    },
    {
      label: "Success Rate",
      value: data.completedBookings?.toLocaleString() || "0",
      icon: CheckCircle,
      trend: `${data.completionTrend || 0}%`,
      subtext: "Completed transactions",
      color: "#FA8112",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. SECTION META: Gives context to the stats grid */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-[#FA8112]" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/30">
            Real-time Metrics
          </h2>
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
          Node: System_Admin_Main
        </p>
      </div>

      {/* 2. STATS GRID: Adjusted gaps for the sharper xl-rounded cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <StatsCard
            key={i}
            label={s.label}
            value={s.value}
            icon={s.icon}
            trend={s.trend}
            subtext={s.subtext}
            color={s.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
