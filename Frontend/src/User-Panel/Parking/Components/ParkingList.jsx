import React from "react";
import ParkingCard from "./ParkingCard";
import {
  Radar,
  SearchX,
  Loader2,
  Terminal,
  Activity,
  Database,
} from "lucide-react";

const ParkingList = ({ parkings, loading }) => {
  // 1. REFINED SKELETON: Workstation Module Style
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-72 rounded-xl bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 relative overflow-hidden shadow-2xl"
          >
            {/* High-Intensity Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF3E1]/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

            <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-3 w-1/2">
                  <div className="h-4 bg-[#FAF3E1]/5 rounded w-full" />
                  <div className="h-2 bg-[#FAF3E1]/5 rounded w-2/3" />
                </div>
                <div className="h-10 w-20 bg-[#FAF3E1]/5 rounded-lg border border-[#F5E7C6]/5" />
              </div>
              <div className="space-y-4 pt-6">
                <div className="h-1 bg-[#FAF3E1]/5 rounded-full w-full" />
                <div className="h-12 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-lg w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. SIGNAL VOID: High-Fidelity Empty State
  if (parkings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/5 rounded-xl text-center relative overflow-hidden group mx-1">
        {/* Radar Telemetry Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 border border-[#FA8112]/5 rounded-full animate-ping duration-[3s]" />
          <div className="absolute w-64 h-64 border border-[#FA8112]/5 rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="bg-[#1a1a1a] p-6 rounded-xl inline-flex border border-[#F5E7C6]/5 group-hover:border-[#FA8112]/20 transition-all duration-700 shadow-2xl">
            <SearchX
              size={42}
              strokeWidth={1}
              className="text-[#FAF3E1]/10 group-hover:text-[#FA8112]/40 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Terminal size={14} className="text-[#FA8112]/40" />
              <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                Zero_Nodes_<span className="text-[#FA8112]">Detected</span>
              </h3>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 max-w-xs mx-auto leading-relaxed">
              Adjust sector radius or verify geographical coordinates to
              re-initialize search.
            </p>
          </div>

          <div className="pt-4 opacity-10 flex items-center justify-center gap-3">
            <Activity size={12} />
            <span className="text-[8px] font-mono font-bold uppercase tracking-[0.4em]">
              Awaiting_Signal_Sync
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. SECTOR GRID VIEW
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-1 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both">
      {parkings.map((parking) => (
        <ParkingCard key={parking._id} parking={parking} />
      ))}
    </div>
  );
};

export default ParkingList;
