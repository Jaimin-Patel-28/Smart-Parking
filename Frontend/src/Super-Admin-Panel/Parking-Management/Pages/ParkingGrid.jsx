import React from "react";
import { Car, Lock } from "lucide-react";

const ParkingGrid = ({ slots, onSlotClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
      {slots.map((slot) => (
        <button
          key={slot._id}
          onClick={() => onSlotClick(slot)}
          className={`relative h-24 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 group
            ${
              slot.status === "available"
                ? "bg-white border-emerald-100 hover:border-emerald-500 hover:shadow-md"
                : slot.status === "occupied"
                  ? "bg-red-50 border-red-200 cursor-default"
                  : "bg-amber-50 border-amber-200"
            }`}
        >
          {/* Slot Number Label */}
          <span className="absolute top-1 left-2 text-[10px] font-black text-slate-400 group-hover:text-emerald-600">
            {slot.label}
          </span>

          {/* Icon logic */}
          {slot.status === "occupied" ? (
            <Car className="text-red-500" size={28} />
          ) : slot.status === "maintenance" ? (
            <Lock className="text-amber-500" size={24} />
          ) : (
            <div className="h-6 w-6 rounded-full border-2 border-dashed border-emerald-200 group-hover:border-emerald-500 group-hover:border-solid" />
          )}

          <span
            className={`text-[11px] font-bold ${
              slot.status === "available"
                ? "text-emerald-600"
                : slot.status === "occupied"
                  ? "text-red-600"
                  : "text-amber-600"
            }`}
          >
            {slot.status}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ParkingGrid;
