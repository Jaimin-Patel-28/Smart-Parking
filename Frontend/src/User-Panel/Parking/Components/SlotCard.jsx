import React from "react";
import {
  Lock,
  Ban,
  CheckCircle2,
  MousePointer2,
  Terminal,
  Activity,
} from "lucide-react";

const SlotCard = ({ slot, isSelected, onSelect, isTimeSelected }) => {
  const slotStatus = slot.status?.toLowerCase();
  const hasValidTime = slot.isAvailableForTime !== undefined;

  // Real physical states
  const isOccupied = slotStatus === "occupied" || slotStatus === "maintenance";
  // Time-based availability
  const isUnavailable = hasValidTime && !slot.isAvailableForTime;
  // Time selection check
  const timeSelected = isTimeSelected || hasValidTime;

  const displayLocked = !timeSelected;
  const displayUnavailable = timeSelected && (isOccupied || isUnavailable);

  const getStatusStyles = () => {
    if (isSelected)
      return "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.3)] scale-[1.02] z-10";

    if (displayUnavailable)
      return "bg-rose-500/[0.02] border-rose-500/10 opacity-30 cursor-not-allowed grayscale";

    if (displayLocked)
      return "bg-amber-500/[0.02] border-amber-500/10 opacity-40 cursor-not-allowed";

    return "bg-[#1a1a1a] border-[#F5E7C6]/5 hover:border-[#FA8112]/40 hover:bg-[#FAF3E1]/[0.02] group/slot shadow-inner";
  };

  return (
    <button
      disabled={displayLocked || displayUnavailable}
      onClick={() => onSelect(slot)}
      className={`relative p-4 rounded-lg border transition-all duration-500 flex flex-col items-center justify-center gap-2 h-24 w-full ${getStatusStyles()}`}
    >
      {/* 1. SECTOR LABEL */}
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
          isSelected
            ? "text-[#222222]"
            : "text-[#FAF3E1]/20 group-hover/slot:text-[#FA8112]"
        }`}
      >
        {slot.label || "NODE_NULL"}
      </span>

      {/* 2. STATE ICON: Signal status */}
      <div className="flex items-center justify-center transition-transform duration-500 group-hover/slot:scale-110">
        {isSelected ? (
          <CheckCircle2 size={18} strokeWidth={3} />
        ) : displayUnavailable ? (
          <Ban size={14} className="text-rose-500/40" />
        ) : displayLocked ? (
          <Lock size={14} className="text-amber-500/40" />
        ) : (
          <Activity
            size={14}
            className="text-[#FAF3E1]/5 group-hover/slot:text-[#FA8112]/40 transition-colors"
          />
        )}
      </div>

      {/* 3. TECHNICAL PROGRESS: Calibrated bar */}
      <div className="absolute bottom-2 left-2 right-2 h-[2px] rounded-full overflow-hidden bg-[#FAF3E1]/5">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            isSelected
              ? "bg-[#222222] w-full"
              : displayUnavailable
                ? "bg-rose-500 w-full opacity-40"
                : displayLocked
                  ? "bg-amber-500 w-1/3 opacity-20"
                  : "bg-[#FA8112]/10 group-hover/slot:bg-[#FA8112] w-0 group-hover/slot:w-full"
          }`}
        />
      </div>

      {/* 4. UNDERLAY DECOR: Monospaced ID */}
      {isSelected && (
        <div className="absolute top-1 right-1 opacity-20">
          <Terminal size={8} />
        </div>
      )}
    </button>
  );
};

export default SlotCard;
