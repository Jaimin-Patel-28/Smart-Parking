import React from "react";
import { Car, Lock, Circle, Zap } from "lucide-react";

const ParkingGrid = ({ slots, onSlotClick }) => {
  // Theme: BG #222222 | Accent #FA8112 | Status: Rose/Amber

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-3 p-1 animate-in fade-in duration-700">
      {slots.map((slot) => {
        const isAvailable = slot.status === "available";
        const isOccupied = slot.status === "occupied";
        const isMaintenance = slot.status === "maintenance";

        return (
          <button
            key={slot._id}
            onClick={() => onSlotClick(slot)}
            disabled={isMaintenance}
            className={`
              relative h-32 rounded-lg border flex flex-col items-center justify-center gap-3 transition-all duration-500 group overflow-hidden
              ${
                isAvailable
                  ? "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/5 hover:border-[#FA8112]/40 hover:bg-[#FA8112]/5 hover:shadow-[0_0_20px_rgba(250,129,18,0.05)]"
                  : isOccupied
                    ? "bg-[#FAF3E1]/[0.01] border-rose-500/10 cursor-default"
                    : "bg-[#FAF3E1]/[0.01] border-amber-500/10 opacity-50 cursor-not-allowed"
              }
            `}
          >
            {/* 1. SLOT TECHNICAL LABEL */}
            <span
              className={`
              absolute top-2 left-3 font-mono text-[10px] font-bold transition-colors duration-300 tracking-tighter
              ${isAvailable ? "text-[#FAF3E1]/20 group-hover:text-[#FA8112]" : "text-[#FAF3E1]/10"}
            `}
            >
              {slot.label.padStart(3, "0")}
            </span>

            {/* 2. CENTER VISUALIZER */}
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
              {isOccupied ? (
                <div className="relative">
                  <Car
                    className="text-rose-500/40"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full animate-pulse" />
                </div>
              ) : isMaintenance ? (
                <Lock
                  className="text-amber-500/30"
                  size={24}
                  strokeWidth={1.5}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Circle
                    className="text-[#FA8112]/10 group-hover:text-[#FA8112]/20 transition-colors"
                    size={32}
                    strokeWidth={1}
                  />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-[#FA8112] shadow-[0_0_8px_#FA8112] animate-pulse" />
                </div>
              )}
            </div>

            {/* 3. STATUS SIGNAL */}
            <div className="space-y-1 text-center relative z-10">
              <span
                className={`
                text-[9px] font-bold uppercase tracking-[0.2em] transition-colors
                ${isAvailable ? "text-[#FA8112]" : isOccupied ? "text-rose-500/40" : "text-amber-500/40"}
              `}
              >
                {slot.status}
              </span>
              {isAvailable && (
                <div className="text-[8px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Ready
                </div>
              )}
            </div>

            {/* 4. TECHNICAL OVERLAY: Corner scan effect */}
            {isAvailable && (
              <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={10} className="text-[#FA8112]/40" />
              </div>
            )}

            {/* Background Texture for a "Machined" feel */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          </button>
        );
      })}
    </div>
  );
};

export default ParkingGrid;
