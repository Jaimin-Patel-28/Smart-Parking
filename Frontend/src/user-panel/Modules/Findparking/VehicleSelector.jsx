import React, { useState } from "react";
import {
  Car,
  Bike,
  PlusCircle,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const VehicleSelector = () => {
  const [vehicleType, setVehicleType] = useState("4-wheeler"); // Default selection
  const [showSaved, setShowSaved] = useState(false);
  const [selectedPlate, setSelectedPlate] = useState("GJ-23-AB-1234");

  const savedVehicles = [
    { id: 1, plate: "GJ-23-AB-1234", type: "4-wheeler" },
    { id: 2, plate: "GJ-23-XY-5678", type: "2-wheeler" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FA8112]/20 rounded-lg text-[#FA8112]">
            {vehicleType === "4-wheeler" ? (
              <Car size={20} />
            ) : (
              <Bike size={20} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#FAF3E1]">
              Select Vehicle
            </h2>
            <p className="text-[#FAF3E1]/40 text-xs uppercase tracking-widest font-semibold">
              Asset Node v2.1
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#FA8112]/60 text-[10px] font-bold uppercase tracking-tighter">
          <ShieldCheck size={12} />
          <span>Verified Hub</span>
        </div>
      </div>

      {/* Saved Vehicle Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSaved(!showSaved)}
          className="w-full flex items-center justify-between bg-[#222222] border border-[#F5E7C6]/10 rounded-2xl py-4 px-5 group hover:border-[#FA8112]/30 transition-all"
        >
          <div className="flex flex-col items-start">
            <span className="text-[10px] uppercase text-[#FAF3E1]/30 tracking-widest">
              Active License Plate
            </span>
            <span className="text-[#FAF3E1] font-mono font-bold tracking-wider">
              {selectedPlate}
            </span>
          </div>
          <ChevronDown
            className={`text-[#FA8112] transition-transform duration-300 ${showSaved ? "rotate-180" : ""}`}
            size={20}
          />
        </button>

        {showSaved && (
          <div className="absolute top-full left-0 w-full mt-2 bg-[#2d2d2d] border border-[#F5E7C6]/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
            {savedVehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedPlate(v.plate);
                  setVehicleType(v.type);
                  setShowSaved(false);
                }}
                className="w-full flex items-center justify-between px-5 py-4 text-[#FAF3E1]/70 hover:bg-[#FA8112] hover:text-[#222222] transition-colors"
              >
                <span className="font-mono">{v.plate}</span>
                <span className="text-[10px] uppercase font-bold">
                  {v.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Vehicle Type Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setVehicleType("4-wheeler")}
          className={`relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
            vehicleType === "4-wheeler"
              ? "bg-[#FA8112]/10 border-[#FA8112] text-[#FA8112]"
              : "bg-[#222222] border-[#F5E7C6]/10 text-[#FAF3E1]/40 hover:border-[#F5E7C6]/30"
          }`}
        >
          <Car size={24} />
          <div className="text-left">
            <p className="font-bold text-sm">4 Wheeler</p>
            <p className="text-[10px] opacity-60">Sedan/SUV/Hatch</p>
          </div>
          {vehicleType === "4-wheeler" && (
            <CheckCircle2 className="absolute top-3 right-3" size={14} />
          )}
        </button>

        <button
          onClick={() => setVehicleType("2-wheeler")}
          className={`relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
            vehicleType === "2-wheeler"
              ? "bg-[#FA8112]/10 border-[#FA8112] text-[#FA8112]"
              : "bg-[#222222] border-[#F5E7C6]/10 text-[#FAF3E1]/40 hover:border-[#F5E7C6]/30"
          }`}
        >
          <Bike size={24} />
          <div className="text-left">
            <p className="font-bold text-sm">2 Wheeler</p>
            <p className="text-[10px] opacity-60">Bike/Scooter</p>
          </div>
          {vehicleType === "2-wheeler" && (
            <CheckCircle2 className="absolute top-3 right-3" size={14} />
          )}
        </button>
      </div>

      {/* Add New Action */}
      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-[#F5E7C6]/10 text-[#FAF3E1]/30 hover:border-[#FA8112]/40 hover:text-[#FA8112] transition-all group">
        <PlusCircle
          size={18}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
        <span className="text-sm font-bold uppercase tracking-widest">
          Register New Vehicle
        </span>
      </button>
    </div>
  );
};

export default VehicleSelector;
