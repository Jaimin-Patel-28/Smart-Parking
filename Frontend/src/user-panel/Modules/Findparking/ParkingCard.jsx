import React from "react";
import {
  MapPin,
  ShieldCheck,
  Zap,
  ChevronRight,
  Star,
  Globe,
} from "lucide-react";

const ParkingCard = ({
  name = "City Center Parking",
  slots = "12",
  distance = "0.8 km",
}) => {
  return (
    <div className="group relative bg-slate-900/40 border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:bg-slate-900 hover:border-blue-500/30 shadow-xl overflow-hidden">
      {/* 1. INTERACTIVE GLOW: Cinematic background effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* 2. PRIMARY INFO: Node & Slot Data */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
            <Globe size={24} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.3em]">
                Parking Node
              </span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                <ShieldCheck size={8} className="text-emerald-500" />
                <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tighter truncate leading-none">
              {name}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-amber-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {slots} Available Slots
                </span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                <MapPin size={12} className="text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                  {distance}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PERFORMANCE STATS & ACTION: Content-rich buttons */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
          <div className="hidden lg:block text-right pr-4">
            <div className="flex items-center justify-end gap-1 mb-1">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={8}
                  className="fill-blue-500 text-blue-500"
                />
              ))}
              <Star size={8} className="text-slate-700" />
            </div>
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
              Reliability Node
            </p>
          </div>

          <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 group/btn">
            <span className="text-[10px] font-black uppercase tracking-widest">
              View Details
            </span>
            <ChevronRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
