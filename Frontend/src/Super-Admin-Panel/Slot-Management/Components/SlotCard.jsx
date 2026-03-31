import React from "react";
import { Car, Lock, CheckCircle } from "lucide-react";

const SlotCard = ({ slot, onAction }) => {
  const isOccupied = slot.status?.toLowerCase() === "occupied";
  const isMaintenance = slot.status?.toLowerCase() === "maintenance";

  return (

    <div
      className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 group
        ${
          isOccupied
            ? "bg-red-50 border-red-100"
            : isMaintenance
              ? "bg-amber-50 border-amber-100"
              : "bg-white border-slate-100 hover:border-emerald-500 shadow-sm"
        }`}
    >
      <span className="absolute top-2 left-3 text-[10px] font-black text-slate-400">
        {slot.label}
      </span>

      <div className="py-2">
        {isOccupied ? (
          <Car className="text-red-500" size={28} />
        ) : isMaintenance ? (
          <Lock className="text-amber-500" size={24} />
        ) : (
          <CheckCircle
            className="text-emerald-100 group-hover:text-emerald-500"
            size={24}
          />
        )}
      </div>

      <div className="text-center">
        <p
          className={`text-xs font-bold ${isOccupied ? "text-red-600" : isMaintenance ? "text-amber-600" : "text-emerald-600"}`}
        >
          {slot.status}
        </p>
        {slot.vehicleNumber && (
          <p className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border mt-1">
            {slot.vehicleNumber}
          </p>
        )}
      </div>

      {/* Quick Action Overlay */}
      <button
        onClick={() => onAction(slot)}
        className="mt-2 text-[10px] font-bold text-slate-500 hover:text-indigo-600 underline"
      >
        Manage
      </button>
    </div>
  );
};

export default SlotCard;
