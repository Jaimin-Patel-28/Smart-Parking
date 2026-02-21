import React from "react";
import { Car, History, Wallet, MapPin, ArrowUpRight } from "lucide-react";

const SummaryCards = () => {
  const stats = [
    {
      label: "Active Booking",
      value: "P-104",
      sub: "Anand Central",
      icon: Car,
    },
    {
      label: "Total Bookings",
      value: "24",
      sub: "Lifetime",
      icon: History,
    },
    {
      label: "Wallet Balance",
      value: "₹450",
      sub: "INR Credits",
      icon: Wallet,
    },
    {
      label: "Saved Locations",
      value: "08",
      sub: "Gujarat Hub",
      icon: MapPin,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 border border-[#F5E7C6] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-11 h-11 rounded-xl bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
              <stat.icon size={20} />
            </div>

            <ArrowUpRight
              size={18}
              className="text-[#6B6B6B] opacity-0 group-hover:opacity-100 transition"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm text-[#6B6B6B]">{stat.label}</p>

            <h4 className="text-2xl font-semibold text-[#222222] mt-1">
              {stat.value}
            </h4>

            <p className="text-xs text-[#6B6B6B] mt-1">{stat.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
