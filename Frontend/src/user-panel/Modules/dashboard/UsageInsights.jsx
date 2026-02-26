import React from "react";
import { BarChart3 } from "lucide-react";

const UsageInsights = ({ stats }) => {
  const insights = [
    {
      label: "Monthly Bookings",
      value: stats.monthlyBookings,
      percent: stats.monthlyBookings * 10,
    },
    {
      label: "Avg Duration",
      value: `${stats.avgDuration} hrs`,
      percent: stats.avgDuration * 15,
    },
    {
      label: "Wallet Usage",
      value: `₹${stats.walletUsage}`,
      percent: 85,
    },
  ];

  return (
    <section className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-3">
        <BarChart3 size={20} className="text-[#FA8112]" />
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
          Analytics Board
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 grow">
        {insights.map((i, idx) => (
          <div
            key={idx}
            className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-4"
          >
            <span className="text-[10px] uppercase text-[#FAF3E1]/30">
              {i.label}
            </span>

            <p className="text-xl font-black">{i.value}</p>

            <div className="h-1.5 bg-[#FAF3E1]/10 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-[#FA8112]"
                style={{ width: `${i.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsageInsights;
