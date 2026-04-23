import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Grid,
  Settings2,
  Activity,
  Terminal,
} from "lucide-react";
import ParkingGrid from "../Pages/ParkingGrid";
import { parkingService } from "../Services/parkingService";

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parking, setParking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const res = await parkingService.getById(id);
        setParking(res.data);
      } catch (err) {
        navigate("/super-admin/parking");
      }
    };
    fetchParking();
  }, [id, navigate]);

  if (!parking)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Activity className="h-8 w-8 animate-pulse text-[#FA8112]/40" />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
          Syncing Floor Plan Data...
        </p>
      </div>
    );

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-16 animate-in fade-in duration-700">
      {/* 1. TOP COMMAND BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#FAF3E1]/[0.01] p-6 rounded-xl border border-[#F5E7C6]/5">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-[#FAF3E1]/5 hover:bg-[#FA8112] text-[#FAF3E1] hover:text-[#222222] rounded-lg transition-all border border-[#F5E7C6]/5 shadow-lg group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
              {parking.name}
            </h1>
            <div className="flex items-center gap-2 text-[#FAF3E1]/30 text-[10px] font-bold uppercase tracking-[0.2em]">
              <MapPin size={12} className="text-[#FA8112]" />
              {parking.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/super-admin/slots/${id}`)}
            className="flex items-center gap-3 px-6 py-2.5 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all shadow-lg shadow-[#FA8112]/10 active:scale-95"
          >
            <Grid size={16} /> Configuration
          </button>

          <button
            onClick={() => navigate(`/super-admin/parking/edit/${id}`)}
            className="flex items-center gap-3 px-6 py-2.5 bg-[#FAF3E1]/5 text-[#FAF3E1]/60 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1]/10 border border-[#F5E7C6]/5 transition-all active:scale-95"
          >
            <Settings2 size={16} /> Zone Logic
          </button>
        </div>
      </div>

      {/* 2. GRID VISUALIZER ENGINE */}
      <div className="bg-[#FAF3E1]/[0.01] p-8 md:p-12 rounded-xl border border-[#F5E7C6]/5 shadow-2xl relative overflow-hidden">
        {/* Architectural Background Decoration */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FA8112]/[0.03] blur-[120px] pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 relative z-10 border-b border-[#F5E7C6]/5 pb-8">
          <div className="space-y-1">
            <h3 className="text-[11px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="h-4 w-[2px] bg-[#FA8112] shadow-[0_0_8px_#FA8112]" />
              Telemetry: Live Spatial Map
            </h3>
            <p className="text-[9px] text-[#FAF3E1]/10 uppercase font-bold tracking-widest ml-4">
              Node: {id.slice(-8).toUpperCase()}
            </p>
          </div>

          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5">
            <span className="flex items-center gap-3 text-[#FA8112]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FA8112] shadow-[0_0_8px_#FA8112] animate-pulse" />
              Available Bays
            </span>

            <span className="flex items-center gap-3 text-rose-500/60">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-500/40 border border-rose-500/20" />
              Occupied Status
            </span>
          </div>
        </div>

        {/* The Grid Component */}
        <div className="relative z-10 min-h-[400px]">
          <ParkingGrid
            slots={parking.slots || []}
            onSlotClick={(slot) => setSelectedSlot(slot)}
          />
        </div>
      </div>

      {/* 3. SELECTED UNIT TELEMETRY (Pop-over) */}
      {selectedSlot && (
        <div className="fixed bottom-12 right-12 bg-[#222222] border border-[#FA8112]/30 p-6 rounded-lg shadow-2xl animate-in slide-in-from-right-8 duration-500 w-64">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#FA8112]/10 rounded border border-[#FA8112]/20 text-[#FA8112]">
              <Terminal size={14} />
            </div>
            <button
              onClick={() => setSelectedSlot(null)}
              className="text-[#FAF3E1]/20 hover:text-[#FAF3E1]"
            >
              <ChevronLeft size={16} className="rotate-180" />
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
              Registry Label
            </p>
            <p className="text-xl font-bold tracking-tight text-[#FAF3E1]">
              Unit: {selectedSlot.label}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#F5E7C6]/5 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/20">
            <span>Status</span>
            <span
              className={
                selectedSlot.isOccupied ? "text-rose-500" : "text-[#FA8112]"
              }
            >
              {selectedSlot.isOccupied ? "Engaged" : "Open"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingDetails;
