import React from "react";
import { History, CalendarCheck, MapPin, Sparkles, Filter } from "lucide-react";

const PageHeader = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 border-b border-white/5 pb-12">
      {/* 1. CINEMATIC BACKGROUND: Mesh gradients for "Best Ever" UI */}
      <div className="absolute inset-0 h-48 md:h-64 bg-linear-to-r from-blue-600/20 via-indigo-600/10 to-slate-950">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER: Responsive padding for widescreen impact */}
      <div className="relative max-w-400 mx-auto px-6 md:px-12 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-10">
          {/* HEADER CONTENT: High-density typography */}
          <div className="space-y-4 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">
                Asset Management Node
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              My Bookings
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <CalendarCheck size={14} className="text-blue-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Session Overview
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                <MapPin size={14} className="text-indigo-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Anand Smart City
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">
                  Live Tracking Active
                </span>
              </div>
            </div>
          </div>

          {/* ACTION HUB: Responsive buttons for quick navigation */}
          <div className="flex items-center gap-3 w-full md:w-auto pb-2">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              <History size={16} />
              Archive
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95">
              <Filter size={16} />
              Filter Results
            </button>
          </div>
        </div>

        {/* 3. QUICK STATS: Subtle content-rich row below header */}
        <div className="mt-12 flex gap-8 border-t border-white/5 pt-8 opacity-60">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Total Parking Hours
            </p>
            <p className="text-xl font-black text-white uppercase tracking-tighter">
              142.5 hrs
            </p>
          </div>
          <div className="border-l border-white/10 pl-8">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Credits Saved
            </p>
            <p className="text-xl font-black text-white uppercase tracking-tighter">
              ₹1,240
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
