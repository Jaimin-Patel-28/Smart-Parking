import React from "react";
import { Lock, Ban, CheckCircle2, Terminal, Activity, Zap } from "lucide-react";

const SlotGrid = ({ slots, selectedSlot, onSelect, isTimeSelected }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 animate-in fade-in duration-700">
      {slots.map((slot) => {
        const isSelected = selectedSlot?._id === slot._id;
        const hasValidTime = slot.isAvailableForTime !== undefined;
        const slotStatus = slot.status?.toLowerCase();

        // Physical and logic-based availability states
        const isOccupied =
          slotStatus === "occupied" || slotStatus === "maintenance";
        const isUnavailable = hasValidTime && !slot.isAvailableForTime;
        const timeSelected = isTimeSelected || hasValidTime;

        // Final Engine States
        const displayLocked = !timeSelected;
        const displayUnavailable =
          timeSelected && (isOccupied || isUnavailable);

        const getButtonStyles = () => {
          if (isSelected)
            return "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.2)] scale-[1.02] z-10";

          if (displayUnavailable)
            return "bg-rose-500/[0.02] border-rose-500/10 opacity-30 cursor-not-allowed grayscale";

          if (displayLocked)
            return "bg-amber-500/[0.02] border-amber-500/10 opacity-40 cursor-not-allowed";

          return "bg-[#1a1a1a] border-[#F5E7C6]/5 hover:border-[#FA8112]/40 hover:bg-[#FAF3E1]/[0.02] group/slot shadow-inner";
        };

        return (
          <button
            key={slot._id}
            disabled={displayLocked || displayUnavailable}
            onClick={() => onSelect(slot)}
            className={`relative h-20 flex flex-col items-center justify-center rounded-xl border transition-all duration-500 ${getButtonStyles()}`}
          >
            {/* 1. NODE IDENTIFIER */}
            <span
              className={`text-[9px] font-bold uppercase tracking-[0.25em] mb-2 transition-colors duration-500 ${
                isSelected
                  ? "text-[#222222]"
                  : "text-[#FAF3E1]/10 group-hover/slot:text-[#FA8112]/60"
              }`}
            >
              {slot.label}
            </span>

            {/* 2. SIGNAL ICON */}
            <div className="relative">
              {displayUnavailable ? (
                <Ban size={14} strokeWidth={1.5} className="text-rose-500/30" />
              ) : displayLocked ? (
                <Lock
                  size={12}
                  strokeWidth={1.5}
                  className="text-amber-500/20"
                />
              ) : isSelected ? (
                <CheckCircle2
                  size={16}
                  strokeWidth={3}
                  className="animate-in zoom-in duration-300"
                />
              ) : (
                <Zap
                  size={14}
                  strokeWidth={1.5}
                  className="text-[#FAF3E1]/5 group-hover/slot:text-[#FA8112]/40 transition-colors"
                />
              )}
            </div>

            {/* 3. CALIBRATED INDICATOR BAR */}
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

            {/* 4. METADATA OVERLAY (Selected State) */}
            {isSelected && (
              <div className="absolute top-1 right-1 opacity-20">
                <Terminal size={8} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SlotGrid;
