import React from "react";
import { CheckCircle2, Search, Bell, Sparkles } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
      {/* 1. WELCOME SECTION: Enhanced tracking and alignment */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="shrink-0 p-2 bg-blue-500/10 rounded-lg">
            <Sparkles size={16} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Dashboard
          </h1>
          <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md shrink-0">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              v1.0
            </span>
          </div>
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest pl-11">
          Welcome, <span className="text-blue-400">Jaimin Patel</span>
          <span className="hidden sm:inline opacity-30 ml-2">
            // Anand Smart City Node
          </span>
        </p>
      </div>

      {/* 2. UTILITY AREA: Clean spacing and glass effects */}
      <div className="flex items-center gap-4">
        {/* Search Bar: Updated to use Canonical rounded-xl */}
        <div className="hidden xl:flex items-center gap-3 bg-white/3 border border-white/5 px-4 py-2.5 rounded-xl focus-within:border-blue-500/40 transition-all w-72 shadow-2xl">
          <Search size={14} className="text-slate-600" />
          <input
            type="text"
            placeholder="Search parking slots..."
            className="bg-transparent border-none outline-none text-[11px] font-medium text-white placeholder:text-slate-700 w-full"
          />
        </div>

        {/* Global Node Status: Integrated Verified Badge */}
        <div className="flex items-center gap-6 bg-white/2 backdrop-blur-3xl border border-white/5 px-6 py-3 rounded-2xl shadow-2xl">
          {/* Node Indicator */}
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                Verified
              </span>
              <CheckCircle2 size={14} className="text-emerald-400" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                Anand Hub Active
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/5" />

          {/* Notifications Trigger: Updated to use shrink-0 */}
          <button className="relative shrink-0 p-2 text-slate-500 hover:text-white transition-all active:scale-90">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-600 rounded-full border-2 border-slate-950 shadow-[0_0_10px_rgba(225,29,72,0.5)]"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
