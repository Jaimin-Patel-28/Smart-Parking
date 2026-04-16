import React from "react";
import { Car, Lock, Circle } from "lucide-react";

const ParkingGrid = ({ slots, onSlotClick }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 p-8 bg-[#FAF3E1]/[0.01] rounded-[2.5rem] border border-[#F5E7C6]/5 shadow-inner">
      {slots.map((slot) => (
        <button
          key={slot._id}
          onClick={() => onSlotClick(slot)}
          className={`relative h-28 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 group
            ${
              slot.status === "available"
                ? "bg-[#FAF3E1]/[0.03] border-[#F5E7C6]/10 hover:border-[#FA8112] hover:bg-[#FA8112]/5 hover:shadow-[0_0_15px_rgba(250,129,18,0.1)]"
                : slot.status === "occupied"
                  ? "bg-rose-500/5 border-rose-500/20 cursor-default"
                  : "bg-amber-500/5 border-amber-500/20"
            }`}
        >
          {/* Slot Number Label */}
          <span className="absolute top-2 left-3 text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-tighter group-hover:text-[#FA8112]">
            {slot.label}
          </span>

          {/* Icon logic */}
          <div className="transition-transform duration-300 group-hover:scale-110">
            {slot.status === "occupied" ? (
              <Car className="text-rose-500 opacity-80" size={28} />
            ) : slot.status === "maintenance" ? (
              <Lock className="text-amber-400 opacity-80" size={24} />
            ) : (
              <div className="relative">
                <Circle
                  className="text-[#FA8112]/20 group-hover:text-[#FA8112] transition-colors"
                  size={28}
                  strokeWidth={1}
                />
                <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse" />
              </div>
            )}
          </div>

          <span
            className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
              slot.status === "available"
                ? "text-[#FA8112]"
                : slot.status === "occupied"
                  ? "text-rose-500/60"
                  : "text-amber-400/60"
            }`}
          >
            {slot.status}
          </span>

          {/* Hover Glow Effect for Available Slots */}
          {slot.status === "available" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#FA8112] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ParkingGrid;
