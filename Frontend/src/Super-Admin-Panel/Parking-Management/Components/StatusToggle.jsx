import React, { useState } from "react";
import { Loader2, Activity } from "lucide-react";

const StatusToggle = ({ initialStatus, onToggle }) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const handleToggle = async (e) => {
    e.stopPropagation();
    const newStatus = status === "Active" ? "Maintenance" : "Active";
    setLoading(true);
    try {
      await onToggle(newStatus);
      setStatus(newStatus);
    } catch (error) {
      // Error handled by parent or toast
    } finally {
      setLoading(false);
    }
  };

  const isActive = status === "Active";

  return (
    <div className="flex items-center gap-3 group">
      {/* 1. TECHNICAL STATUS LABEL */}
      <span
        className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/20"}`}
      >
        {isActive ? "Online" : "Paused"}
      </span>

      {/* 2. SWITCH ENGINE */}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`
          relative inline-flex h-5 w-10 items-center rounded-md border transition-all duration-500 outline-none
          ${loading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
          ${
            isActive
              ? "bg-[#FA8112]/10 border-[#FA8112]/30 shadow-[0_0_10px_rgba(250,129,18,0.05)]"
              : "bg-[#FAF3E1]/5 border-[#F5E7C6]/10"
          }
        `}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <Loader2 className="animate-spin text-[#FA8112]" size={10} />
          </div>
        ) : (
          <>
            {/* The Toggle Knob: Refined to a sharper square-ish look */}
            <span
              className={`
                absolute h-3 w-3 rounded-sm transition-all duration-500 ease-spring
                ${
                  isActive
                    ? "translate-x-6 bg-[#FA8112] shadow-[0_0_8px_#FA8112]"
                    : "translate-x-1 bg-[#FAF3E1]/20"
                }
              `}
            />

            {/* Background Texture/Grid for a technical feel */}
            <div className="absolute inset-0 flex justify-around items-center px-1 opacity-20 pointer-events-none">
              <div className="w-[1px] h-1 bg-[#FAF3E1]/20" />
              <div className="w-[1px] h-1 bg-[#FAF3E1]/20" />
            </div>
          </>
        )}
      </button>

      {/* 3. PULSE INDICATOR (Mobile/Small Desktop) */}
      <div
        className={`hidden sm:block w-1 h-1 rounded-full ${isActive ? "bg-[#FA8112] animate-pulse" : "bg-[#FAF3E1]/10"}`}
      />
    </div>
  );
};

export default StatusToggle;
