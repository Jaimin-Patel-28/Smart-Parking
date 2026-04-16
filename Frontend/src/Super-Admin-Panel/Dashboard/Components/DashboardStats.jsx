import React from "react";
import StatsCard from "./StatsCard";
import { Car, Users, IndianRupee, CheckCircle } from "lucide-react";

// Destructure 'data' from props, default to empty object to prevent errors
const DashboardStats = ({ data = {} }) => {
  // Theme Variables Applied via StatsCard:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112

  const stats = [
    {
      title: "Total Revenue",
      // Formatting the value from your API logic
      value: data.totalRevenue
        ? `₹${data.totalRevenue.toLocaleString()}`
        : "₹0",
      icon: IndianRupee, // Using IndianRupee for currency consistency
      trend: data.revenueTrend || "0",
      isUp: (data.revenueTrend || 0) >= 0,
      // We pass a consistent color key, StatsCard handles the #FA8112 mapping
      color: "bg-[#FA8112]",
    },
    {
      title: "Active Users",
      value: data.activeUsers?.toLocaleString() || "0",
      icon: Users,
      trend: data.usersTrend || "0",
      isUp: (data.usersTrend || 0) >= 0,
      color: "bg-[#FA8112]",
    },
    {
      title: "Parking Slots",
      // Occupied / Total
      value: `${data.occupiedSlots || 0}/${data.totalSlots || 0}`,
      icon: Car,
      trend: data.occupancyRate || "0",
      isUp: false, // Occupancy rising is a warning in parking context
      color: "bg-[#FA8112]",
    },
    {
      title: "Completed",
      value: data.completedBookings?.toLocaleString() || "0",
      icon: CheckCircle,
      trend: data.completionTrend || "0",
      isUp: (data.completionTrend || 0) >= 0,
      color: "bg-[#FA8112]",
    },
  ];

  return (
    // Grid container remains responsive, spacing adjusted for [2rem] rounded cards
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {stats.map((s, i) => (
        <StatsCard key={i} {...s} />
      ))}
    </div>
  );
};

export default DashboardStats;
