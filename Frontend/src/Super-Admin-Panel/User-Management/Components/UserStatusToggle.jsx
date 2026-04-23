import React from "react";
import { Loader2 } from "lucide-react";

const UserStatusToggle = ({ status, onToggle, processing }) => {
  const isActive = status === "active";

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="flex items-center gap-3 group">
      {/* 1. STATUS SIGNAL LABEL */}
      <span
        className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 w-12 text-right ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/20"}`}
      >
        {isActive ? "Online" : "Paused"}
      </span>

      {/* 2. PRECISION SWITCH ENGINE */}
      <button
        disabled={processing}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`
          relative inline-flex h-5 w-10 items-center rounded-md border transition-all duration-500 outline-none
          ${processing ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
          ${
            isActive
              ? "bg-[#FA8112]/10 border-[#FA8112]/30 shadow-[0_0_10px_rgba(250,129,18,0.05)]"
              : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/10"
          }
        `}
      >
        {processing ? (
          <div className="w-full flex justify-center">
            <Loader2 className="animate-spin text-[#FA8112]" size={10} />
          </div>
        ) : (
          <>
            {/* The Switch Knob: Technical Square Geometry */}
            <span
              className={`
                absolute h-3 w-3 rounded-sm transition-all duration-500 ease-in-out
                ${
                  isActive
                    ? "translate-x-6 bg-[#FA8112] shadow-[0_0_8px_#FA8112]"
                    : "translate-x-1 bg-[#FAF3E1]/20"
                }
              `}
            />

            {/* Background Texture: Architectural Ticks */}
            <div className="absolute inset-0 flex justify-around items-center px-1 opacity-10 pointer-events-none">
              <div className="w-[1px] h-1 bg-[#FAF3E1]" />
              <div className="w-[1px] h-1 bg-[#FAF3E1]" />
            </div>
          </>
        )}
      </button>

      {/* 3. HEARTBEAT INDICATOR */}
      <div
        className={`w-1 h-1 rounded-full transition-all duration-700 ${isActive ? "bg-[#FA8112] animate-pulse shadow-[0_0_5px_#FA8112]" : "bg-[#FAF3E1]/10"}`}
      />
    </div>
  );
};

export default UserStatusToggle;
