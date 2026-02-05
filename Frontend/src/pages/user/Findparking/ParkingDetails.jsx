import React from "react";
import {
  Info,
  ShieldAlert,
  Clock,
  CreditCard,
  Sparkles,
  LayoutGrid,
  CheckCircle2,
  Map,
} from "lucide-react";

const ParkingDetails = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden">
      {/* 1. HEADER: Small & Perfect metadata */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
            <Info size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Location Details
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Intelligence Node v2.0
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <CheckCircle2 size={10} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            Open Node
          </span>
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        {/* 2. OVERVIEW: High-density descriptive text */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Map size={12} className="text-blue-400" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Overview
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider leading-relaxed">
            Premium multi-level parking facility located at Anand Hub. Features
            real-time occupancy tracking and 24/7 security surveillance.
          </p>
        </div>

        {/* 3. CORE STATS GRID: Horizontal split for scannability */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <DetailStat
            icon={Clock}
            label="Operating Hours"
            value="24/7 Access"
            color="text-amber-400"
          />
          <DetailStat
            icon={CreditCard}
            label="Pricing Start"
            value="₹20.00 /hr"
            color="text-emerald-400"
          />
        </div>

        {/* 4. FACILITIES & AMENITIES: Content-rich tags */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-indigo-400" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Node Amenities
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["EV Charging", "CCTV 24/7", "Valet Node", "Disabled Access"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        {/* 5. DYNAMIC SUMMARY: Final slot audit */}
        <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutGrid size={16} className="text-blue-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Inventory Summary
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-blue-400 uppercase tracking-tighter">
              124 Slots Total
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

/* REUSABLE STAT COMPONENT */
const DetailStat = ({ icon: Icon, label, value, color }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
      <Icon size={12} className={color} />
      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <p className="text-xs font-black text-white uppercase tracking-tight">
      {value}
    </p>
  </div>
);

export default ParkingDetails;
