import React from "react";
import { Lock, Ban, CheckCircle2, MousePointer2 } from "lucide-react";

const SlotCard = ({ slot, isSelected, onSelect, isTimeSelected }) => {
  const slotStatus = slot.status?.toLowerCase();
  const hasValidTime = slot.isAvailableForTime !== undefined;

  // ✅ Real physical states only
  const isOccupied = slotStatus === "occupied" || slotStatus === "maintenance";

  // ✅ Time-based availability (MAIN FIX)
  const isUnavailable = hasValidTime && !slot.isAvailableForTime;

  // ✅ Time selection check
  const timeSelected = isTimeSelected || hasValidTime;

  const displayLocked = !timeSelected;
  const displayUnavailable = timeSelected && (isOccupied || isUnavailable);

  const getStatusStyles = () => {
    if (isSelected)
      return "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.3)] scale-105 z-10 italic";

    if (displayUnavailable)
      return "bg-red-500/5 border-red-500/10 opacity-40 cursor-not-allowed grayscale-[0.5]";

    if (displayLocked)
      return "bg-amber-500/5 border-amber-500/10 opacity-60 cursor-not-allowed";

    return "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/10 hover:border-[#FA8112]/50 hover:bg-[#FAF3E1]/[0.05] group/slot";
  };
  return (
    <button
      disabled={displayLocked || displayUnavailable}
      onClick={() => onSelect(slot)}
      className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 h-24 ${getStatusStyles()}`}
    >
      {/* Label */}
      <span
        className={`text-xs font-black uppercase tracking-[0.2em] ${
          isSelected
            ? "text-[#222222]"
            : "text-[#FAF3E1]/40 group-hover/slot:text-[#FA8112]"
        }`}
      >
        {slot.label}
      </span>

      {/* Icon */}
      <div className="flex items-center justify-center">
        {isSelected ? (
          <CheckCircle2 size={16} strokeWidth={3} />
        ) : displayUnavailable ? (
          <Ban size={14} className="text-red-500/50" />
        ) : displayLocked ? (
          <Lock size={14} className="text-amber-500/50" />
        ) : (
          <MousePointer2
            size={14}
            className="text-[#FAF3E1]/10 group-hover/slot:text-[#FA8112]/50 transition-colors"
          />
        )}
      </div>

      <div className="absolute bottom-2 left-3 right-3 h-[2px] rounded-full overflow-hidden bg-white/5">
        <div
          className={`h-full transition-all duration-500 ${
            isSelected
              ? "bg-[#222222] w-full"
              : displayUnavailable
                ? "bg-red-500 w-full"
                : displayLocked
                  ? "bg-amber-500 w-1/2"
                  : "bg-[#FA8112]/20 group-hover/slot:bg-[#FA8112] w-1/4 group-hover/slot:w-full"
          }`}
        />
      </div>
    </button>
  );
};

export default SlotCard;
