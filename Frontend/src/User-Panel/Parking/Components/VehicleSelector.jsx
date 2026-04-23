import React from "react";
import { Car, CheckCircle2, ShieldAlert, Hash, Terminal } from "lucide-react";

const VehicleSelector = ({ selectedVehicle, onSelect, vehicles = [] }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 1. REGISTRY METADATA */}
      <div className="flex items-end justify-between px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]/60">
            <Terminal size={12} />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em]">
              Asset_Registry
            </span>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#FAF3E1] flex items-center gap-2">
            Linked_Vehicles
          </h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
            {vehicles.length.toString().padStart(2, "0")} UNIT(S)_IDENTIFIED
          </span>
        </div>
      </div>

      {/* 2. SELECTION MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vehicles.map((v, index) => {
          const isActive = selectedVehicle === v;

          return (
            <button
              key={index}
              onClick={() => onSelect(v)}
              className={`group relative overflow-hidden flex items-center justify-between p-5 rounded-xl border transition-all duration-500 shadow-2xl ${
                isActive
                  ? "bg-[#FA8112]/5 border-[#FA8112] shadow-[#FA8112]/5"
                  : "bg-[#1a1a1a] border-[#F5E7C6]/5 hover:border-[#FA8112]/30 hover:bg-[#FAF3E1]/[0.02]"
              }`}
            >
              {/* Asset Core Details */}
              <div className="flex items-center gap-5 relative z-10">
                <div
                  className={`p-3 rounded-lg border transition-all duration-500 ${
                    isActive
                      ? "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-[0_0_15px_rgba(250,129,18,0.3)]"
                      : "bg-[#222222] border-[#F5E7C6]/5 text-[#FAF3E1]/10 group-hover:text-[#FA8112]/60 group-hover:border-[#FA8112]/20"
                  }`}
                >
                  <Hash size={16} strokeWidth={isActive ? 3 : 2} />
                </div>

                <div className="text-left space-y-1">
                  <p
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/10"
                    }`}
                  >
                    IDENTIFIER_TAG
                  </p>
                  <span
                    className={`text-lg font-bold tabular-nums tracking-tight transition-colors duration-500 ${
                      isActive ? "text-[#FAF3E1]" : "text-[#FAF3E1]/40"
                    }`}
                  >
                    {v.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* SIGNAL STATUS */}
              <div className="relative z-10 pr-1">
                {isActive ? (
                  <div className="text-[#FA8112] animate-in zoom-in duration-500">
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/40 transition-all duration-500 shadow-inner" />
                )}
              </div>

              {/* HUD UNDERLAY DECOR */}
              <Car
                className={`absolute -right-4 -bottom-4 w-20 h-20 transition-all duration-1000 pointer-events-none ${
                  isActive
                    ? "text-[#FA8112] opacity-[0.03] scale-110 rotate-[-12deg]"
                    : "opacity-0 scale-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 3. SYSTEM FAULT GUARD */}
      {vehicles.length === 0 && (
        <div className="bg-rose-500/[0.02] border border-dashed border-rose-500/20 p-8 rounded-xl flex flex-col items-center justify-center gap-4 text-center group">
          <div className="p-4 bg-rose-500/5 rounded-full text-rose-500/40 group-hover:text-rose-500/60 transition-colors">
            <ShieldAlert size={32} strokeWidth={1} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500/60">
              Zero_Registered_Units
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/10">
              Please link an asset via User_Settings
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;
