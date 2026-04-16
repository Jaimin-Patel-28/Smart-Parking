import React from "react";
import { Car, Lock, CheckCircle, ArrowRight } from "lucide-react";

const SlotCard = ({ slot, onAction }) => {
  const isOccupied = slot.status?.toLowerCase() === "occupied";
  const isMaintenance = slot.status?.toLowerCase() === "maintenance";

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div
      className={`relative p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center justify-center gap-3 group
        ${
          isOccupied
            ? "bg-rose-500/5 border-rose-500/20 shadow-lg shadow-rose-500/5"
            : isMaintenance
              ? "bg-amber-500/5 border-amber-500/20 shadow-lg shadow-amber-500/5"
              : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/10 hover:border-[#FA8112] hover:bg-[#FA8112]/5 shadow-sm hover:shadow-xl hover:shadow-[#FA8112]/5"
        }`}
    >
      {/* Slot ID Badge */}
      <span className="absolute top-3 left-4 text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest group-hover:text-[#FA8112] transition-colors">
        {slot.label}
      </span>

      {/* Visual Indicator Icon */}
      <div className="py-3 transform group-hover:scale-110 transition-transform duration-300">
        {isOccupied ? (
          <Car className="text-rose-500 opacity-80" size={32} />
        ) : isMaintenance ? (
          <Lock className="text-amber-400 opacity-80" size={28} />
        ) : (
          <CheckCircle
            className="text-[#FAF3E1]/10 group-hover:text-[#FA8112] transition-colors"
            size={28}
          />
        )}
      </div>

      {/* Status & Data Section */}
      <div className="text-center space-y-2">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] ${
            isOccupied
              ? "text-rose-400"
              : isMaintenance
                ? "text-amber-400"
                : "text-[#FA8112]"
          }`}
        >
          {slot.status}
        </p>

        {slot.vehicleNumber && (
          <p className="text-[11px] font-mono font-black text-[#FAF3E1] bg-[#FAF3E1]/[0.05] px-3 py-1 rounded-lg border border-[#F5E7C6]/10 mt-2 shadow-inner">
            {slot.vehicleNumber}
          </p>
        )}
      </div>

      {/* Manage Button - Styled as a high-tech action */}
      <button
        onClick={() => onAction(slot)}
        className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-[#FAF3E1]/30 hover:text-[#FA8112] uppercase tracking-[0.2em] transition-all group/btn"
      >
        Manage{" "}
        <ArrowRight
          size={10}
          className="group-hover/btn:translate-x-1 transition-transform"
        />
      </button>

      {/* Subtle bottom accent line for available slots */}
      {!isOccupied && !isMaintenance && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#FA8112] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

export default SlotCard;
