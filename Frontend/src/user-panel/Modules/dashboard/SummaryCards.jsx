import React from "react";
import { Car, History, Wallet, MapPin, ArrowUpRight } from "lucide-react";

const SummaryCards = () => {
  // We keep the stats local for now, but structured for easy API integration later
  const stats = [
    {
      label: "Active Booking",
      value: "P-104",
      icon: Car,
      unit: "Slot ID",
      color: "text-[#FA8112]",
    },
    {
      label: "Total Bookings",
      value: "24",
      icon: History,
      unit: "Sessions",
      color: "text-blue-400",
    },
    {
      label: "Wallet Balance",
      value: "₹450",
      icon: Wallet,
      unit: "INR",
      color: "text-emerald-400",
    },
    {
      label: "Saved Locations",
      value: "08",
      icon: MapPin,
      unit: "Nodes",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative bg-[#222222] border border-[#F5E7C6]/10 rounded-[2rem] p-5 transition-all duration-500 hover:border-[#FA8112]/40 hover:-translate-y-1 overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#FA8112]/5 blur-[50px] group-hover:bg-[#FA8112]/10 transition-colors" />

          {/* Header Area */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`p-3 rounded-2xl bg-[#111111] border border-[#F5E7C6]/5 ${stat.color} transition-transform duration-500 group-hover:scale-110`}
            >
              <stat.icon size={22} />
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F5E7C6]/20">
                Metric Unit
              </p>
              <p className="text-[10px] font-mono font-bold text-[#FA8112]">
                {stat.unit}
              </p>
            </div>
          </div>

          {/* Value Section */}
          <div className="space-y-3">
            <h3 className="text-3xl font-black tracking-tighter text-[#FAF3E1]">
              {stat.value}
            </h3>

            <div className="flex items-center justify-between pt-2 border-t border-[#F5E7C6]/5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FAF3E1]/40 group-hover:text-[#FAF3E1]/70 transition-colors">
                {stat.label}
              </p>
              <div className="p-1 rounded-full bg-[#FAF3E1]/5 text-[#FAF3E1]/20 group-hover:bg-[#FA8112]/20 group-hover:text-[#FA8112] transition-all">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
