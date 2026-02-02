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
    <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 lg:p-8 shadow-2xl overflow-hidden group">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400">
            <Heart size={22} className="fill-rose-400/20" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Favorite Spot
          </h2>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={14} className="fill-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Top Rated
          </span>
        </div>
      </div>

      {/* CONTENT TILE */}
      <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 mb-6 transition-all group-hover:border-rose-500/20">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <MapPin size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Most Visited
              </span>
            </div>
            <p className="text-lg font-black text-white tracking-tight leading-tight">
              {favoriteLocation.name}
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              {favoriteLocation.zone} • {favoriteLocation.lastUsed}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-black text-emerald-400">
              {favoriteLocation.avgPrice}
            </p>
            <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-1">
              Avg. Rate
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 group/btn">
          <Zap size={16} className="text-white fill-white" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Quick Book
          </span>
        </button>

        <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white hover:border-white/10 transition-all">
          <Navigation size={18} />
        </button>
      </div>
    </section>
  );
};

export default Favorites;
