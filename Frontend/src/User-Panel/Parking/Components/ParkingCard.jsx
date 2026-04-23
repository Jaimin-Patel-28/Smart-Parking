import React from "react";
import {
  MapPin,
  ArrowRight,
  Hash,
  Zap,
  Navigation,
  Terminal,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParkingCard = ({ parking }) => {
  const navigate = useNavigate();
  const available =
    parking.liveAvailableSlots ?? parking.totalSlots - parking.occupiedSlots;
  const occupied = parking.totalSlots - available;
  const occupancyPercentage =
    parking.totalSlots > 0 ? (occupied / parking.totalSlots) * 100 : 0;

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="group relative overflow-hidden bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-6 transition-all duration-500 hover:bg-[#FAF3E1]/[0.03] hover:border-[#FA8112]/20 flex flex-col justify-between h-full shadow-2xl">
      {/* 1. NODE IDENTITY: Name & Unit Price */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="space-y-1.5 max-w-[70%]">
          <div className="flex items-center gap-2 text-[#FA8112]/60">
            <Terminal size={12} />
            <span className="text-[8px] font-bold uppercase tracking-[0.4em]">
              Sector_Entry
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight leading-none truncate group-hover:text-[#FA8112] transition-colors">
            {parking.name}
          </h3>
          <p className="flex items-center gap-1.5 text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest truncate">
            <MapPin size={10} className="text-[#FA8112]/40" />{" "}
            {parking.location}
          </p>
        </div>

        <div className="flex flex-col items-end bg-[#1a1a1a] p-2 rounded border border-[#F5E7C6]/5 shadow-inner">
          <span className="text-lg font-bold text-[#FAF3E1] tabular-nums leading-none">
            ₹{parking.basePrice}
          </span>
          <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#FA8112]/60 mt-1">
            RATE/HR
          </span>
        </div>
      </div>

      {/* 2. CAPACITY TELEMETRY: Occupancy Monitor */}
      <div className="space-y-5 mb-10 relative z-10">
        <div className="flex justify-between items-end px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity size={10} className="text-[#FA8112] animate-pulse" />
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
                Live_Availability
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter leading-none">
                {available}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase text-[#FAF3E1]/10 tracking-widest">
                / {parking.totalSlots} UNITS_TOTAL
              </span>
            </div>
          </div>

          <button className="bg-[#1a1a1a] p-2.5 rounded-lg border border-[#F5E7C6]/5 text-[#FAF3E1]/10 group-hover:text-[#FA8112] group-hover:border-[#FA8112]/20 transition-all duration-500 shadow-xl">
            <Navigation size={16} />
          </button>
        </div>

        {/* CALIBRATED CAPACITY BAR */}
        <div className="h-[4px] w-full bg-[#1a1a1a] rounded-full overflow-hidden border border-[#F5E7C6]/5">
          <div
            className={`h-full transition-all duration-1000 ease-out shadow-[0_0_8px] ${
              occupancyPercentage > 90
                ? "bg-rose-500 shadow-rose-500/20"
                : "bg-[#FA8112] shadow-[#FA8112]/20"
            }`}
            style={{ width: `${100 - occupancyPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. SYSTEM COMMAND: Reservation Trigger */}
      <button
        onClick={() => navigate(`/user/parking/${parking._id}`)}
        disabled={available === 0}
        className={`relative overflow-hidden w-full flex items-center justify-center gap-3 py-3.5 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border shadow-2xl group/btn active:scale-[0.98]
          ${
            available > 0
              ? "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/5 text-[#FAF3E1]/40 hover:bg-[#FA8112] hover:text-[#222222] hover:border-[#FA8112]"
              : "bg-transparent border-rose-500/10 text-rose-500/30 cursor-not-allowed"
          }`}
      >
        <Zap
          size={14}
          className={`${available > 0 ? "text-[#FA8112] group-hover/btn:text-[#222222]" : "hidden"}`}
        />
        {available > 0 ? "INITIATE_RESERVATION" : "CAPACITY_EXCEEDED"}
        <ArrowRight
          size={14}
          strokeWidth={3}
          className={`ml-1 -rotate-45 group-hover/btn:rotate-0 transition-transform ${available > 0 ? "" : "hidden"}`}
        />
      </button>

      {/* 4. UNDERLAY DECOR */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FA8112]/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </div>
  );
};

export default ParkingCard;
