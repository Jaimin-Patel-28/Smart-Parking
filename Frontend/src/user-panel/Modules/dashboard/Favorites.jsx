import React from "react";
import {
  Heart,
  MapPin,
  Star,
  Zap,
  Navigation,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const Favorites = () => {
  return (
    <div className="relative overflow-hidden bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 transition-all duration-500 hover:border-red-500/30 group">
      {/* --- BACKGROUND ACCENT --- */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/5 blur-3xl rounded-full group-hover:bg-red-500/10 transition-colors" />

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 transition-transform group-hover:scale-110">
            <Heart size={20} fill="currentColor" className="opacity-80" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/30">
              Priority Spot
            </p>
            <h3 className="text-lg font-black text-[#FAF3E1] leading-none tracking-tight">
              Favorite Node
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <Star size={10} className="text-amber-500 fill-amber-500" />
          <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">
            Top Rated
          </span>
        </div>
      </div>

      {/* --- RECENT ACCESS DATA --- */}
      <div className="bg-[#111111]/40 border border-[#F5E7C6]/5 rounded-2xl p-4 mb-6 relative">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#FAF3E1]/20">
              <MapPin size={12} className="text-[#FA8112]" />
              <span className="text-[9px] uppercase tracking-widest font-bold">
                Recent Node Access
              </span>
            </div>
            <div>
              <h4 className="text-base font-black text-[#FAF3E1] tracking-tight">
                Anand Central Mall
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[10px] font-bold text-[#FAF3E1]/40">
                  Zone A-1
                </p>
                <span className="w-1 h-1 rounded-full bg-[#FAF3E1]/10" />
                <div className="flex items-center gap-1">
                  <Clock size={10} className="text-[#FAF3E1]/20" />
                  <p className="text-[10px] font-bold text-[#FAF3E1]/40">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[#FA8112] font-mono font-bold text-sm">
              ₹20<span className="text-[10px] opacity-40">/hr</span>
            </div>
            <p className="text-[8px] uppercase tracking-tighter text-[#FAF3E1]/20 font-bold">
              Avg Rate
            </p>
          </div>
        </div>

        <ArrowUpRight
          className="absolute bottom-4 right-4 text-[#FAF3E1]/10 group-hover:text-[#FA8112] transition-colors"
          size={16}
        />
      </div>

      {/* --- ACTION FOOTER --- */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#FA8112] hover:bg-[#FA8112]/90 text-[#222222] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(250,129,18,0.1)] active:scale-95">
          <Zap size={14} fill="currentColor" /> Quick Book
        </button>
        <button className="w-12 flex items-center justify-center bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1]/40 hover:text-[#FA8112] hover:bg-[#FA8112]/10 transition-all">
          <Navigation size={18} />
        </button>
      </div>
    </div>
  );
};

export default Favorites;
