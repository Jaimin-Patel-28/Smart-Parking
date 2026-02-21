import React from "react";
import { Heart, MapPin, Star, Navigation, Zap } from "lucide-react";

const Favorites = () => {
  const favoriteLocation = {
    name: "Anand Central Mall",
    zone: "Zone A-1",
    lastUsed: "2 days ago",
    avgPrice: "₹20/hr",
  };

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
            <Heart size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#222222]">
              Favorite Spot
            </h2>
            <p className="text-sm text-[#6B6B6B]">Your most visited location</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#FA8112] bg-[#FA8112]/10 px-3 py-1 rounded-full">
          <Star size={14} />
          Top Rated
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-[#FAF3E1] rounded-xl p-5 mb-6 border border-[#F5E7C6]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-1">
              <MapPin size={14} />
              Most Visited
            </div>

            <p className="text-base font-medium text-[#222222]">
              {favoriteLocation.name}
            </p>

            <p className="text-sm text-[#6B6B6B] mt-1">
              {favoriteLocation.zone} • {favoriteLocation.lastUsed}
            </p>
          </div>

          <div className="text-right">
            <p className="text-base font-semibold text-[#FA8112]">
              {favoriteLocation.avgPrice}
            </p>
            <p className="text-xs text-[#6B6B6B]">Avg. Rate</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FA8112] hover:bg-[#e6730f] text-white rounded-lg text-sm transition">
          <Zap size={16} />
          Quick Book
        </button>

        <button className="p-3 border border-[#F5E7C6] rounded-lg text-[#6B6B6B] hover:bg-[#FAF3E1] transition">
          <Navigation size={18} />
        </button>
      </div>
    </section>
  );
};

export default Favorites;
