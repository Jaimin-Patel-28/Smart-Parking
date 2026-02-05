import React from "react";
import ParkingCard from "./ParkingCard";
import { LayoutGrid, ListFilter, Activity, Sparkles } from "lucide-react";

const ParkingResults = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl backdrop-blur-xl group transition-all duration-500 relative overflow-hidden">
      {/* 1. SECTION HEADER: Cinematic metadata for the feed */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              Parking Locations
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
                Active Inventory Node
              </p>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <Activity size={10} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                  Live Updates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FEED METRICS: High-density quick stats */}
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/60 border border-white/5 rounded-xl whitespace-nowrap">
            <Sparkles size={12} className="text-amber-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              24 Nodes Found
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-400 transition-all">
            <ListFilter size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Filter Stream
            </span>
          </button>
        </div>
      </div>

      {/* 2. RESULTS STACK: Clean vertical alignment */}
      <div className="space-y-6 relative z-10">
        <ParkingCard name="Anand Central Hub" slots="42" distance="0.4 km" />
        <ParkingCard name="Gujarat Square Node" slots="18" distance="1.2 km" />
        <ParkingCard name="V.V. Nagar Terminal" slots="08" distance="2.5 km" />
      </div>

      {/* 3. LOAD MORE / FOOTER: Professional pagination placeholder */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4 opacity-40">
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">
          End of Current Inventory Stream
        </p>
        <div className="w-12 h-px bg-slate-800" />
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
};

export default ParkingResults;
