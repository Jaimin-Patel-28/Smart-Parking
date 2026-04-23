import React, { useState } from "react";
import {
  Search,
  Loader2,
  MapPin,
  Compass,
  SlidersHorizontal,
  Terminal,
  Activity,
  Database,
  Radar,
} from "lucide-react";
import { useParkings } from "../Hooks/useParkings";
import ParkingCard from "../Components/ParkingCard";

const FindParking = () => {
  const { parkings, loading } = useParkings();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParkings = parkings.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. SECTOR SCANNER HEADER */}
      <header className="px-1 flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#FA8112]">
            <Compass className="animate-spin-slow" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Sector_Discovery_v2
            </span>
          </div>
          <div className="flex items-center gap-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] tracking-tight uppercase">
              Nearby <span className="text-[#FA8112]">Zones</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/20 font-bold uppercase text-[9px] tracking-[0.3em] ml-1">
            Node_Status: Online • Analyzing geographical clusters for spatial
            availability
          </p>
        </div>

        {/* SPATIAL QUERY TERMINAL */}
        <div className="relative w-full xl:w-[500px] group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
            <Search
              className="text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
              size={18}
            />
          </div>
          <input
            type="text"
            placeholder="QUERY_SECTOR (Area, Mall, Landmark)"
            className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl py-5 pl-16 pr-20 text-sm font-bold text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.02] transition-all uppercase tracking-wider shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-3 bg-[#222222] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1]/20 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all active:scale-95">
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. REGISTRY VIEWPORT */}
      <div className="relative min-h-[500px] px-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="relative">
              <Loader2
                className="animate-spin text-[#FA8112]/20"
                size={64}
                strokeWidth={1}
              />
              <Radar
                size={24}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FA8112] animate-pulse"
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/20">
                Scanning_Local_Grid
              </p>
              <p className="text-[8px] font-mono font-bold text-[#FAF3E1]/5 uppercase tracking-[0.2em]">
                Retrieving_Coordinate_Data...
              </p>
            </div>
          </div>
        ) : filteredParkings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/5 rounded-xl text-center max-w-2xl mx-auto group">
            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#F5E7C6]/5 text-[#FAF3E1]/10 mb-8 group-hover:border-[#FA8112]/20 transition-all duration-700">
              <Database size={48} strokeWidth={1} />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                Zero_Clusters_<span className="text-[#FA8112]">Identified</span>
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 leading-relaxed">
                System failed to synchronize with nearby spatial nodes. Adjust
                query parameters or verify GPS linkage.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both">
            {filteredParkings.map((parking) => (
              <ParkingCard key={parking._id} parking={parking} />
            ))}
          </div>
        )}
      </div>

      {/* 3. SYSTEM HUD ELEMENTS */}
      <div className="fixed bottom-10 right-10 z-40 hidden xl:block">
        <button className="group relative overflow-hidden bg-[#1a1a1a] border border-[#F5E7C6]/10 text-[#FAF3E1]/40 px-8 py-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 hover:border-[#FA8112]/40 hover:text-[#FA8112] transition-all shadow-2xl shadow-black">
          <div className="absolute inset-0 bg-[#FA8112]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <MapPin size={14} className="group-hover:animate-bounce" />
          Switch_Visual_Map
        </button>
      </div>

      {/* FOOTER TELEMETRY */}
      <div className="flex flex-col items-center gap-4 pt-12 opacity-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Activity size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Sector Exploration HUD • 2026 SmartPark_Engine
        </p>
      </div>
    </div>
  );
};

export default FindParking;
