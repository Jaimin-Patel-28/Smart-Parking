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
      <div className="p-10 text-center animate-pulse text-slate-500">
        Loading Parking Details...
      </div>
    );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ChevronLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-black text-slate-800">
              {parking.name}
            </h1>

            <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
              <MapPin size={14} />
              {parking.location}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Manage Slots */}
          <button
            onClick={() => navigate(`/super-admin/slots/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md"
          >
            <Grid size={18} />
            Manage Slots
          </button>

          {/* Edit Parking */}
          <button
            onClick={() => navigate(`/super-admin/parking/edit/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
          >
            <Settings size={18} />
            Zone Settings
          </button>
        </div>
      </div>

      {/* Grid Display */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Info size={18} className="text-emerald-500" />
            Live Floor Plan
          </h3>

          <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1 text-emerald-600">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Available
            </span>

            <span className="flex items-center gap-1 text-red-600">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              Occupied
            </span>
          </div>
        </div>

        <ParkingGrid
          slots={parking.slots || []}
          onSlotClick={(slot) => setSelectedSlot(slot)}
        />
      </div>

      {/* Future Slot Modal */}
      {selectedSlot && (
        <div className="fixed bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border text-sm">
          Slot: {selectedSlot.label}
        </div>
      )}
    </div>
  );
};

export default ParkingDetails;
