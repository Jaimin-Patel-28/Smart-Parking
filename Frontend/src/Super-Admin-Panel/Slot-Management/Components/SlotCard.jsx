import React from "react";
import { Car, Lock, ShieldCheck, ArrowUpRight, Cpu } from "lucide-react";

const SlotCard = ({ slot, onAction }) => {
  const isOccupied = slot.status?.toLowerCase() === "occupied";
  const isMaintenance = slot.status?.toLowerCase() === "maintenance";
  const isAvailable = !isOccupied && !isMaintenance;

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div
      className={`relative p-6 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center gap-4 group overflow-hidden
        ${
          isOccupied
            ? "bg-[#FAF3E1]/[0.01] border-rose-500/10 shadow-lg shadow-rose-500/[0.02]"
            : isMaintenance
              ? "bg-[#FAF3E1]/[0.01] border-amber-500/10"
              : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/5 hover:border-[#FA8112]/30 hover:bg-[#FAF3E1]/[0.04] shadow-sm"
        }`}
    >
      {/* 1. SLOT IDENTIFIER: Technical Mono Style */}
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span
          className={`text-[10px] font-mono font-bold tracking-tighter transition-colors ${isAvailable ? "text-[#FAF3E1]/20 group-hover:text-[#FA8112]" : "text-[#FAF3E1]/10"}`}
        >
          BAY-{slot.label.padStart(3, "0")}
        </span>
      </div>

      {/* 2. VISUAL TELEMETRY: Status Icon */}
      <div className="relative py-2 transition-transform duration-500 group-hover:scale-110">
        {isOccupied ? (
          <div className="relative">
            <Car className="text-rose-500/40" size={32} strokeWidth={1.5} />
            <div className="absolute inset-0 bg-rose-500/10 blur-xl rounded-full animate-pulse" />
          </div>
        ) : isMaintenance ? (
          <Lock className="text-amber-500/30" size={28} strokeWidth={1.5} />
        ) : (
          <div className="relative">
            <ShieldCheck
              className="text-[#FA8112]/20 group-hover:text-[#FA8112]/40 transition-colors"
              size={28}
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 m-auto h-1 w-1 rounded-full bg-[#FA8112] shadow-[0_0_8px_#FA8112] animate-ping" />
          </div>
        )}
      </div>

      {/* 3. DATA MODULE: Status & Vehicle Info */}
      <div className="text-center space-y-3 z-10">
        <div className="flex flex-col items-center">
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${
              isOccupied
                ? "text-rose-400/50"
                : isMaintenance
                  ? "text-amber-400/50"
                  : "text-[#FA8112]"
            }`}
          >
            {slot.status}
          </span>
        </div>

        {slot.vehicleNumber && (
          <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 px-3 py-1.5 rounded-md shadow-inner">
            <p className="text-[11px] font-mono font-bold text-[#FAF3E1]/80 tracking-widest">
              {slot.vehicleNumber.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      {/* 4. ACTION INTERFACE */}
      <button
        onClick={() => onAction(slot)}
        className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#FAF3E1]/20 hover:text-[#FA8112] uppercase tracking-[0.2em] transition-all group/btn"
      >
        Manage Node
        <ArrowUpRight
          size={12}
          className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"
        />
      </button>

      {/* Background Micro-Texture */}
      <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <Cpu size={40} />
      </div>

      {/* Active Selection Indicator */}
      {isAvailable && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#FA8112] rounded-t-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
      )}
    </div>
  );
};

export default SlotCard;
