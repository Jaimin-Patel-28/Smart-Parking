import React from "react";
import StatsCard from "./StatsCard";
import { Car, Users, Wallet, CheckCircle } from "lucide-react";

// Destructure 'data' from props, default to empty object to prevent errors
const DashboardStats = ({ data = {} }) => {
  // Mapping API data to our UI structure
  const stats = [
    {
      title: "Total Revenue",
      // If data.totalRevenue is 12840, we format it. If undefined, show $0
      value: data.totalRevenue
        ? `$${data.totalRevenue.toLocaleString()}`
        : "$0",
      icon: Wallet,
      trend: data.revenueTrend || "0",
      isUp: (data.revenueTrend || 0) >= 0,
      color: "bg-emerald-500",
    },
    {
      title: "Active Users",
      value: data.activeUsers?.toLocaleString() || "0",
      icon: Users,
      trend: data.usersTrend || "0",
      isUp: (data.usersTrend || 0) >= 0,
      color: "bg-blue-500",
    },
    {
      title: "Parking Slots",
      // Displaying Occupied / Total
      value: `${data.occupiedSlots || 0}/${data.totalSlots || 0}`,
      icon: Car,
      trend: data.occupancyRate || "0",
      isUp: false, // In parking, occupancy going up is often a warning (red/orange)
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: data.completedBookings?.toLocaleString() || "0",
      icon: CheckCircle,
      trend: data.completionTrend || "0",
      isUp: (data.completionTrend || 0) >= 0,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <StatsCard key={i} {...s} />
      ))}
    </div>
  );
};

export default DashboardStats;
