import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Info, Settings, MapPin, Grid } from "lucide-react";
import ParkingGrid from "../Pages/ParkingGrid";
import { parkingService } from "../Services/parkingService";

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parking, setParking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const res = await parkingService.getById(id);
        setParking(res.data);
      } catch (err) {
        console.error("Failed to load parking", err);
        navigate("/super-admin/parking");
      }
    };

    fetchParking();
  }, [id, navigate]);

  if (!parking)
    return (
      <div className="p-20 text-center animate-pulse text-[#FAF3E1]/40 font-black uppercase tracking-[0.2em] text-xs">
        Initializing Floor Plan Data...
      </div>
    );

  return (
    <div className="space-y-8 max-w-350 mx-auto pb-10 bg-[#222222]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-[#FAF3E1]/5 hover:bg-[#FA8112] text-[#FAF3E1] hover:text-[#222222] rounded-2xl transition-all border border-[#F5E7C6]/10 shadow-sm group"
          >
            <ChevronLeft
              size={22}
              className="group-active:scale-90 transition-transform"
            />
          </button>

          <div>
            <h1 className="text-3xl font-black text-[#FAF3E1] tracking-tighter uppercase">
              {parking.name}
            </h1>

            <div className="flex items-center gap-2 text-[#FAF3E1]/40 text-xs font-black uppercase tracking-widest mt-1">
              <MapPin size={14} className="text-[#FA8112]" />
              {parking.location}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Manage Slots */}
          <button
            onClick={() => navigate(`/super-admin/slots/${id}`)}
            className="flex items-center gap-3 px-6 py-3 bg-[#FA8112] text-[#222222] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FAF3E1] transition-all shadow-lg shadow-[#FA8112]/10"
          >
            <Grid size={18} />
            Manage Slots
          </button>

          {/* Edit Parking */}
          <button
            onClick={() => navigate(`/super-admin/parking/edit/${id}`)}
            className="flex items-center gap-3 px-6 py-3 bg-[#FAF3E1]/5 text-[#FAF3E1] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#FAF3E1]/10 border border-[#F5E7C6]/10 transition-all"
          >
            <Settings size={18} />
            Zone Settings
          </button>
        </div>
      </div>

      {/* Grid Display Container */}
      <div className="bg-[#FAF3E1]/2 p-10 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FA8112]/5 blur-[100px] pointer-events-none" />

        <div className="flex items-center justify-between mb-10 relative z-10">
          <h3 className="text-xs font-black text-[#FAF3E1] uppercase tracking-[0.2em] flex items-center gap-3">
            <div className="h-6 w-1 bg-[#FA8112] rounded-full" />
            Live Floor Plan
          </h3>

          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.15em]">
            <span className="flex items-center gap-2 text-[#FA8112]">
              <div className="h-2 w-2 rounded-full bg-[#FA8112] shadow-[0_0_8px_#FA8112]" />
              Available
            </span>

            <span className="flex items-center gap-2 text-rose-500">
              <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              Occupied
            </span>
          </div>
        </div>

        {/* The Grid Component */}
        <div className="relative z-10">
          <ParkingGrid
            slots={parking.slots || []}
            onSlotClick={(slot) => setSelectedSlot(slot)}
          />
        </div>
      </div>

      {/* Pop-over Slot Info */}
      {selectedSlot && (
        <div className="fixed bottom-10 right-10 bg-[#FA8112] text-[#222222] p-5 rounded-2xl shadow-2xl border border-[#FAF3E1]/20 animate-in slide-in-from-right-4 duration-300">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
            Selected Unit
          </p>
          <p className="text-lg font-black tracking-tighter">
            Slot: {selectedSlot.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParkingDetails;
