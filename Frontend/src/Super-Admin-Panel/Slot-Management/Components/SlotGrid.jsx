import React from "react";
import SlotCard from "./SlotCard";
import { LayoutGrid } from "lucide-react";

const SlotGrid = ({ slots, onSlotAction }) => {
  // Theme: BG #222222 | Accent #FA8112 | Grid Line #F5E7C6/5

  return (
    <div className="relative">
      {/* 1. TECHNICAL GRID BACKGROUND: Mimics an architectural floor plan */}
      <div className="absolute inset-0 bg-[radial-gradient(#FAF3E1_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02] pointer-events-none" />

      {/* 2. THE SLOT CONSTELLATION */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-5 lg:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {slots.map((slot) => (
          <SlotCard key={slot._id} slot={slot} onAction={onSlotAction} />
        ))}
      </div>

      {/* 3. GRID METADATA: Bottom-right registry count */}
      <div className="mt-10 pt-6 border-t border-[#F5E7C6]/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LayoutGrid size={14} className="text-[#FA8112]/20" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
            Spatial Registry Map • Sector_Alpha
          </span>
        </div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/10">
          Total Units: {slots.length}
        </p>
      </div>
    </div>
  );
};

export default SlotGrid;
