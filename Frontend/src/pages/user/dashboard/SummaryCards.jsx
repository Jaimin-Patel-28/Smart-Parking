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
    /* Grid layout optimized for zoom-safety and high-density content */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative overflow-hidden bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-5 rounded-3xl hover:border-white/10 transition-all cursor-pointer shadow-xl"
        >
          {/* Subtle Background Icon Glow */}
          <stat.icon
            className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-5 transition-transform group-hover:scale-110 group-hover:rotate-12 ${stat.color}`}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              {/* Canonical shrink-0 applied to avoid editor warnings */}
              <div
                className={`shrink-0 p-2.5 rounded-2xl ${stat.bg} ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <ArrowUpRight
                size={14}
                className="text-slate-600 group-hover:text-white transition-colors"
              />
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </p>
              <h4 className="text-2xl font-black text-white tracking-tighter">
                {stat.value}
              </h4>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
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
