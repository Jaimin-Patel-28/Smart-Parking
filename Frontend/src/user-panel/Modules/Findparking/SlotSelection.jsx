import React, { memo } from "react"; // 🟢 Added memo for performance
import { LayoutGrid, Zap, MousePointer2, ShieldCheck, Cpu } from "lucide-react";

// 🟢 Wrapped in memo to prevent unnecessary grid re-renders
const SlotSelection = memo(({ selectedSlot, onSlotSelect }) => {
  // Mock slot data
  const slots = [
    { id: "P-100", status: "available", type: "standard" },
    { id: "P-101", status: "booked", type: "standard" },
    { id: "P-102", status: "reserved", type: "standard" },
    { id: "P-103", status: "available", type: "standard" },
    { id: "P-104", status: "available", type: "ev" },
    { id: "P-105", status: "available", type: "standard" },
  ];

  // 🟢 Guard: Only notify parent if the selection actually changes
  const handleSlotClick = (id) => {
    if (id !== selectedSlot) {
      onSlotSelect(id);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b border-[#F5E7C6]/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-[#FA8112]/20 rounded-xl text-[#FA8112]">
            <LayoutGrid size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#FAF3E1]">
              Select Slot
            </h2>
            <p className="text-[#FAF3E1]/40 text-[10px] uppercase tracking-[0.3em] font-bold text-left">
              Spatial Node v4.0
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-[#FAF3E1]/[0.03] px-3 py-1.5 rounded-lg border border-[#F5E7C6]/10">
          <Cpu size={14} className="text-[#FA8112]" />
          <span className="text-[10px] font-bold text-[#FAF3E1]/60 uppercase">
            System: L-02 Floor
          </span>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="flex flex-wrap gap-6 px-2">
        <LegendItem label="Available" color="bg-[#FAF3E1]/10" />
        <LegendItem label="Booked" color="bg-red-500/20" />
        <LegendItem label="Reserved" color="bg-blue-500/20" />
        <LegendItem label="Selected" color="bg-[#FA8112]" glow />
      </div>

      {/* 🟢 Interactive Spatial Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.id;
          const isBooked =
            slot.status === "booked" || slot.status === "reserved";

          return (
            <button
              key={slot.id}
              disabled={isBooked}
              onClick={() => handleSlotClick(slot.id)} // 🟢 Now using the guard handler
              className={`
                relative group aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300
                ${isBooked ? "bg-[#222222]/50 border-[#F5E7C6]/5 opacity-40 cursor-not-allowed" : ""}
                ${!isBooked && !isSelected ? "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/10 hover:border-[#FA8112]/40" : ""}
                ${isSelected ? "bg-[#FA8112] border-[#FA8112] text-[#222222] scale-105 shadow-[0_0_20px_rgba(250,129,18,0.4)]" : ""}
              `}
            >
              <span
                className={`text-xs font-black tracking-tighter ${isSelected ? "text-[#222222]" : "text-[#FAF3E1]/60"}`}
              >
                {slot.id}
              </span>
              {slot.type === "ev" && (
                <Zap
                  size={12}
                  className={
                    isSelected
                      ? "text-[#222222]"
                      : "text-[#FA8112] animate-pulse"
                  }
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selection Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 p-6 rounded-[2rem]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#222222] rounded-full text-[#FA8112] border border-[#FA8112]/20">
            <MousePointer2 size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 tracking-widest">
              Active Target Node
            </p>
            <p className="text-xl font-black text-[#FAF3E1]">
              Target:{" "}
              <span className="text-[#FA8112]">{selectedSlot || "---"}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#FAF3E1]/40 bg-[#222222] px-4 py-2 rounded-xl border border-[#F5E7C6]/5">
          <ShieldCheck size={16} className="text-[#4ADE80]" />
          <span className="text-xs font-bold uppercase tracking-tighter">
            Verified Level 2 Hub
          </span>
        </div>
      </div>
    </div>
  );
});

// Helper component
const LegendItem = ({ label, color, glow }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-3 h-3 rounded-full border border-white/5 ${color} ${glow ? "shadow-[0_0_8px_#FA8112]" : ""}`}
    />
    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF3E1]/40">
      {label}
    </span>
  </div>
);

SlotSelection.displayName = "SlotSelection"; // Good practice for memo components

export default SlotSelection;
