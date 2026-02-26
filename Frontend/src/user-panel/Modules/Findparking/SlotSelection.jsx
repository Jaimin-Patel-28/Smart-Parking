import React from "react";
import {
  LayoutGrid,
  Info,
  ShieldCheck,
  Zap,
  MousePointer2,
} from "lucide-react";

const SlotSelection = () => {
  // Mock data for the spatial grid
  const slots = Array.from({ length: 24 }, (_, i) => ({
    id: `P-${100 + i}`,
    status:
      i === 4
        ? "selected"
        : i % 7 === 0
          ? "booked"
          : i % 5 === 0
            ? "reserved"
            : "available",
  }));

  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden">
      {/* 1. HEADER: Small & Perfect metadata */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              Select Slot
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Spatial Node v4.0
            </p>
          </div>
        </div>

        {/* 2. LEGEND: Status-driven color nodes */}
        <div className="flex flex-wrap items-center gap-4 px-5 py-3 bg-slate-950/60 border border-white/5 rounded-2xl shadow-inner">
          <LegendItem color="bg-blue-500" label="Available" />
          <LegendItem color="bg-rose-500" label="Booked" />
          <LegendItem color="bg-amber-500" label="Reserved" />
          <LegendItem
            color="bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            label="Selected"
          />
        </div>
      </div>

      {/* 3. SPATIAL GRID: High-density 12-column logic */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 relative z-10 mb-10">
        {slots.map((slot) => (
          <button
            key={slot.id}
            disabled={slot.status === "booked" || slot.status === "reserved"}
            className={`
              relative h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 group/slot
              ${slot.status === "available" ? "bg-white/5 border-white/10 hover:bg-blue-500/10 hover:border-blue-500/50" : ""}
              ${slot.status === "booked" ? "bg-rose-500/5 border-rose-500/10 opacity-30 cursor-not-allowed" : ""}
              ${slot.status === "reserved" ? "bg-amber-500/5 border-amber-500/10 opacity-40 cursor-not-allowed" : ""}
              ${slot.status === "selected" ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : ""}
            `}
          >
            <span
              className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${slot.status === "selected" ? "text-emerald-400" : "text-slate-500 group-hover/slot:text-blue-400"}`}
            >
              {slot.id}
            </span>
            {slot.status === "selected" && (
              <Zap size={10} className="text-emerald-500 mt-1 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* 4. FOOTER: Real-time selection audit */}
      <div className="flex items-center justify-between p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl relative z-10">
        <div className="flex items-center gap-3">
          <MousePointer2 size={16} className="text-blue-400" />
          <p className="text-[10px] font-black text-white uppercase tracking-widest">
            Target: <span className="text-blue-400">P-104</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Info size={12} className="text-slate-600" />
          <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
            Verified Level 2 Hub
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
};

/* REUSABLE LEGEND ITEM */
const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default SlotSelection;
