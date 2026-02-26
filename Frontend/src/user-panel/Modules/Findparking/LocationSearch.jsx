import React from "react";
import {
  Search,
  MapPin,
  Navigation,
  History,
  ChevronDown,
  Crosshair,
} from "lucide-react";

const LocationSearch = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center gap-4 mb-10">
        <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
          <Search size={22} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
            Search Location
          </h2>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
            Discovery Node
          </p>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* 2. PRIMARY SEARCH INPUT: Cinematic focus */}
        <div className="relative group/input">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-blue-400 transition-colors">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by location name..."
            className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
          />
        </div>

        {/* 3. CITY SELECTOR: Custom glassmorphism dropdown */}
        <div className="relative cursor-pointer">
          <div className="flex items-center justify-between w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 px-5 group/select hover:border-white/10 transition-all shadow-inner">
            <div className="flex items-center gap-3">
              <Navigation
                size={16}
                className="text-slate-500 group-hover/select:text-indigo-400"
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Select City / Area
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-700" />
          </div>
        </div>

        {/* 4. GEOLOCATION ACTION: High-performance micro-interaction */}
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-2xl text-blue-400 transition-all active:scale-[0.98] group/geo">
          <Crosshair
            size={16}
            className="group-hover/geo:rotate-180 transition-transform duration-500"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Use Current Location
          </span>
        </button>

        {/* 5. RECENT SEARCHES: Content-rich tag cloud */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <History size={12} className="text-slate-600" />
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
              Recent Node Access
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Anand Hub", "Central Mall", "V.V. Nagar"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-bold text-slate-400 hover:text-white transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

export default LocationSearch;
