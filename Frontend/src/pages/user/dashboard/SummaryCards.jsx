import React from "react";
import { Car, History, Wallet, MapPin, ArrowUpRight } from "lucide-react";

const SummaryCards = () => {
  const stats = [
    {
      label: "Active Booking",
      value: "P-104",
      sub: "Anand Central",
      icon: Car,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Bookings",
      value: "24",
      sub: "Lifetime",
      icon: History,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Wallet Balance",
      value: "₹450",
      sub: "INR Credits",
      icon: Wallet,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Saved Locations",
      value: "08",
      sub: "Gujarat Hub",
      icon: MapPin,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    /* 1. GRID SPACING: Increased gap from 4 to 8 for a breathable layout */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          /* 2. CARD PADDING: Increased to p-8 for professional depth.
             Removed backdrop-blur to resolve UI lag. */
          className="group relative overflow-hidden bg-white/2 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-500 cursor-pointer shadow-2xl"
        >
          {/* Subtle Background Icon Glow: Positioned to avoid overlapping text */}
          <stat.icon
            className={`absolute -right-6 -bottom-6 w-32 h-32 opacity-5 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 ${stat.color}`}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              {/* Canonical shrink-0 applied to resolve editor warnings */}
              <div
                className={`shrink-0 p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-lg`}
              >
                <stat.icon size={24} />
              </div>
              <div className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                {stat.label}
              </p>
              <h4 className="text-3xl font-black text-white tracking-tighter uppercase">
                {stat.value}
              </h4>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest pt-1">
                {stat.sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
