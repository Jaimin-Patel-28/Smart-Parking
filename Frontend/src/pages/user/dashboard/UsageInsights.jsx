import React from "react";
import { BarChart3, TrendingUp, Clock, CreditCard } from "lucide-react";

const UsageInsights = () => {
  const insights = [
    {
      label: "Monthly Bookings",
      value: "18 / 25",
      percent: 72,
      icon: TrendingUp,
    },
    {
      label: "Average Duration",
      value: "3.5 hrs",
      percent: 45,
      icon: Clock,
    },
    {
      label: "Wallet Usage",
      value: "₹1,240 spent",
      percent: 85,
      icon: CreditCard,
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
          <BarChart3 size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#222222]">
            Usage Insights
          </h2>
          <p className="text-sm text-[#6B6B6B]">Overview for February 2026</p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-6">
        {insights.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                  <item.icon size={14} />
                </div>
                <span className="text-sm text-[#222222]">{item.label}</span>
              </div>

              <span className="text-sm font-medium text-[#FA8112]">
                {item.value}
              </span>
            </div>

            <div className="w-full h-2 bg-[#FAF3E1] rounded-full overflow-hidden border border-[#F5E7C6]">
              <div
                className="h-full bg-[#FA8112] rounded-full transition-all duration-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsageInsights;
