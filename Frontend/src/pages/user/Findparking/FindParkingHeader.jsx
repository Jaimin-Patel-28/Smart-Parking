import React from "react";
import {
  Search,
  MapPin,
  Sparkles,
  Navigation,
  ShieldCheck,
} from "lucide-react";

const FindParkingHeader = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 border-b border-white/5 pb-16">
      {/* 1. CINEMATIC BACKGROUND: Mesh gradients for high-end UI */}
      <div className="absolute inset-0 h-64 md:h-80 bg-linear-to-br from-blue-600/20 via-indigo-600/10 to-slate-950">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-slate-950 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER: Fluid padding for widescreen monitors */}
      <div className="relative max-w-400 mx-auto px-6 md:px-12 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 lg:gap-12">
          {/* HEADER CONTENT: Content-rich typography */}
          <div className="space-y-6 pb-2">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em]">
                  Resource Discovery Node
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                  Live Inventory
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Find <br /> <span className="text-blue-500">Parking</span>
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <Navigation size={14} className="text-blue-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                  Global Asset Search
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <MapPin size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                  Anand Smart City
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  AI Slot Suggestion
                </span>
              </div>
            </div>
          </div>

          {/* QUICK STATS: Real-time node data */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto pb-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Available Slots
              </p>
              <p className="text-2xl font-black text-white uppercase tracking-tighter">
                1,248+
              </p>
            </div>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-md">
              <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">
                Active Hubs
              </p>
              <p className="text-2xl font-black text-white uppercase tracking-tighter">
                24 Nodes
              </p>
            </div>
          </div>
        </div>

        {/* 3. PROGRESS TRACKER: Subtle visual guide for the booking funnel */}
        <div className="mt-16 flex items-center gap-12 border-t border-white/5 pt-8 opacity-40">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
              1
            </span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Discovery
            </span>
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full border border-white/20 text-white flex items-center justify-center text-[10px] font-black">
              2
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Selection
            </span>
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full border border-white/20 text-white flex items-center justify-center text-[10px] font-black">
              3
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Confirm
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindParkingHeader;
