import React from "react";
import {
  Car,
  Bike,
  PlusCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
} from "lucide-react";

const VehicleSelector = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/20 relative overflow-hidden h-full flex flex-col justify-between">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform duration-500">
            <Car size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Select Vehicle
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Asset Node
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <ShieldCheck size={10} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            Verified
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* 2. CUSTOM DROPDOWN: High-end selection UI */}
        <div className="relative group/select cursor-pointer">
          <div className="flex items-center justify-between w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 px-5 hover:border-white/10 transition-all shadow-inner">
            <div className="flex items-center gap-3">
              <Zap
                size={16}
                className="text-slate-500 group-hover/select:text-emerald-400"
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Saved Vehicle (GJ-23-...)
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-700" />
          </div>
        </div>

        {/* 3. QUICK TYPE TOGGLE: Cinematic selection buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 py-4 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl group/car">
            <Car size={20} className="text-emerald-400" />
            <span className="text-[8px] font-black text-white uppercase tracking-widest">
              4 Wheeler
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group/bike">
            <Bike
              size={20}
              className="text-slate-500 group-hover/bike:text-emerald-400"
            />
            <span className="text-[8px] font-black text-slate-500 group-hover/bike:text-white uppercase tracking-widest">
              2 Wheeler
            </span>
          </button>
        </div>

        {/* 4. ADD ACTION: Clean interactive button */}
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-[0.98] group/add">
          <PlusCircle
            size={16}
            className="group-hover/add:scale-110 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Add New Vehicle
          </span>
        </button>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-700" />
    </section>
  );
};

export default VehicleSelector;
