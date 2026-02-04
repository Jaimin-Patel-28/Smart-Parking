import React from "react";
import {
  Search,
  MapPin,
  Sparkles,
  Navigation,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

const EmptyState = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-12 lg:p-20 shadow-2xl relative overflow-hidden flex flex-col items-center text-center group">
      {/* 1. VISUAL ANCHOR: Animated background and icon */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-150 animate-pulse" />
        <div className="relative z-10 w-24 h-24 bg-slate-950 border border-white/10 rounded-4xl flex items-center justify-center text-blue-400 shadow-2xl group-hover:rotate-12 transition-transform duration-700">
          <Navigation size={40} className="fill-blue-400/10" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-400 animate-bounce">
          <Sparkles size={16} />
        </div>
      </div>

      {/* 2. CONTENT HUB: High-density typography */}
      <div className="max-w-md space-y-4 mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            System Node Idle
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
          No Bookings <br /> <span className="text-blue-500">Detected Yet</span>
        </h2>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed px-6">
          Your parking history is empty. Start exploring the Anand Smart City
          network to secure your first node.
        </p>
      </div>

      {/* 3. ACTION HUB: Horizontal responsive buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg relative z-10">
        <button className="w-full sm:flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest transition-all active:scale-95 group/btn">
          <Search size={16} className="text-blue-400" />
          Find Parking
        </button>

        <button className="w-full sm:flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 group/main">
          <PlusCircle size={16} />
          Book Your First Slot
          <ArrowRight
            size={14}
            className="group-hover/main:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Decorative Network Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-white/20 rounded-tl-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-white/20 rounded-br-3xl" />
      </div>
    </section>
  );
};

export default EmptyState;
