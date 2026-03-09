import React from "react";
import {
  MapPin,
  ShieldCheck,
  Zap,
  ChevronRight,
  Star,
  Globe,
  Navigation,
} from "lucide-react";

const ParkingCard = ({
  name = "City Center Parking",
  slots = "12",
  distance = "0.8 km",
  onSelect, // Triggered by the "View Details" button
}) => {
  const isFull = parseInt(slots) === 0;

  return (
    <div className="group relative bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[2rem] p-5 hover:bg-[#FAF3E1]/[0.06] hover:border-[#FA8112]/30 transition-all duration-300 overflow-hidden">
      {/* 🟢 Top Badge Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 bg-[#222222] px-3 py-1 rounded-full border border-[#F5E7C6]/10">
          <Globe size={12} className="text-[#FA8112]" />
          <span className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/60 font-bold">
            Parking Node
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-1 rounded-md">
          <ShieldCheck size={12} />
          <span className="text-[10px] uppercase font-black">Verified</span>
        </div>
      </div>

      {/* 🟢 Main Info */}
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-bold text-[#FAF3E1] group-hover:text-[#FA8112] transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-[#FAF3E1]/40 text-xs">
          <MapPin size={14} className="text-[#FA8112]" />
          <span>Located {distance} from your position</span>
        </div>
      </div>

      {/* 🟢 Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          className={`flex items-center gap-3 p-3 rounded-2xl border ${isFull ? "bg-red-500/10 border-red-500/20" : "bg-[#FA8112]/5 border-[#FA8112]/10"}`}
        >
          <Zap
            size={18}
            className={isFull ? "text-red-500" : "text-[#FA8112]"}
          />
          <div>
            <p
              className={`text-sm font-black ${isFull ? "text-red-500" : "text-[#FAF3E1]"}`}
            >
              {slots}
            </p>
            <p className="text-[10px] uppercase opacity-40">Slots Left</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10">
          <div className="flex gap-0.5 text-[#FA8112]">
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
            <Star size={10} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] uppercase opacity-40 leading-none">
              Reliability
            </p>
            <p className="text-[10px] font-bold text-[#FAF3E1]/80">
              Node Level 4
            </p>
          </div>
        </div>
      </div>

      {/* 🟢 Action Button */}
      <button
        onClick={onSelect}
        className="w-full flex items-center justify-between bg-[#FAF3E1]/[0.05] hover:bg-[#FA8112] text-[#FAF3E1] hover:text-[#222222] font-bold py-4 px-6 rounded-2xl transition-all group/btn"
      >
        <span className="text-sm uppercase tracking-widest">View Details</span>
        <div className="bg-[#222222]/20 p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
          <ChevronRight size={18} />
        </div>
      </button>

      {/* Decorative Navigation Icon */}
      <Navigation
        className="absolute -bottom-4 -right-4 text-[#FAF3E1]/5 rotate-45"
        size={80}
      />
    </div>
  );
};

export default ParkingCard;
