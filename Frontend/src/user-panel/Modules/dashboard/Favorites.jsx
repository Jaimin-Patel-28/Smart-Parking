import React from "react";
import { Heart, MapPin, Navigation, Zap } from "lucide-react";

const Favorites = () => {
  const favoriteLocation = {
    name: "Anand Central Mall",
    zone: "Zone A-1",
    price: "₹20/hr",
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Heart size={18} className="text-[#FA8112]" />
        <h3 className="text-lg font-black uppercase tracking-tight">
          Priority Node
        </h3>
      </div>

      <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase text-[#FAF3E1]/30">
              Favorite Location
            </p>
            <h4 className="text-lg font-black">{favoriteLocation.name}</h4>
            <p className="text-[10px] uppercase text-[#FAF3E1]/30 mt-1">
              {favoriteLocation.zone}
            </p>
          </div>

          <span className="text-[#FA8112] font-black text-sm">
            {favoriteLocation.price}
          </span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#FAF3E1] text-[#222222] py-3 rounded-xl font-black text-[10px] uppercase hover:bg-[#FA8112] hover:text-white">
            <Zap size={14} /> Quick Book
          </button>

          <button className="px-4 flex items-center justify-center bg-[#222222] border border-[#F5E7C6]/10 rounded-xl hover:border-[#FA8112]">
            <Navigation size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
