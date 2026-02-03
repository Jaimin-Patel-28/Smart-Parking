import React from "react";
import { Heart, MapPin, Zap, Star, Navigation } from "lucide-react";

const Favorites = () => {
  // Mock data representing the user's most used Anand Hub location
  const favoriteLocation = {
    name: "Anand Central Mall",
    zone: "Zone A-1",
    lastUsed: "2 days ago",
    avgPrice: "₹20/hr",
  };

  return (
    /* FIXED: Using 'rounded-3xl' and increased padding 'p-8 lg:p-10' for proper spacing */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden group transition-all duration-500 hover:border-rose-500/20">
      {/* 1. HEADER: Increased margin-bottom (mb-10) for better separation */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-rose-500/10 rounded-2xl text-rose-400">
            <Heart size={26} className="fill-rose-400/20" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">
              Favorite Spot
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
              Personal Recommendation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400 shadow-sm">
          <Star size={14} className="fill-amber-400" />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Top Rated
          </span>
        </div>
      </div>

      {/* 2. CONTENT TILE: Balanced internal padding and clear typography */}
      <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 mb-8 transition-all group-hover:bg-slate-950/80 group-hover:border-rose-500/20 shadow-inner">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <MapPin size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                Most Visited
              </span>
            </div>
            <p className="text-xl font-black text-white tracking-tight leading-tight">
              {favoriteLocation.name}
            </p>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">
              {favoriteLocation.zone} <span className="mx-2 opacity-20">|</span>{" "}
              {favoriteLocation.lastUsed}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-lg font-black text-emerald-400">
              {favoriteLocation.avgPrice}
            </p>
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] mt-1.5">
              Avg. Rate
            </p>
          </div>
        </div>
      </div>

      {/* 3. ACTION BUTTONS: Enhanced sizing and breathing room */}
      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 group/btn">
          <Zap size={18} className="text-white fill-white shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            Quick Book
          </span>
        </button>

        <button className="p-4 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:border-white/20 transition-all shadow-sm active:scale-95">
          <Navigation size={22} />
        </button>
      </div>
    </section>
  );
};

export default Favorites;
