import React from "react";
import {
  MapPin,
  Hash,
  Clock,
  Timer,
  CheckCircle2,
  ChevronRight,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActiveParkingStatus = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#222222] text-white rounded-2xl p-8 lg:p-10 overflow-hidden">
      {/* Orange Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FA8112]" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FA8112]/20 flex items-center justify-center text-[#FA8112]">
            <Activity size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Active Parking Session
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Your vehicle is currently parked and secured.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-sm rounded-lg transition">
          View Details
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Location */}
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <MapPin size={16} />
            Location
          </div>
          <p className="text-lg font-medium">Anand Central Mall</p>
          <p className="text-sm text-gray-400">Gujarat Hub • Area A-1</p>
        </div>

        {/* Slot */}
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Hash size={16} />
            Parking Slot
          </div>
          <p className="text-lg font-medium text-[#FA8112]">P-104 (L2)</p>
          <p className="text-sm text-gray-400">Premium Reserved</p>
        </div>

        {/* Schedule */}
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Clock size={16} />
            Schedule
          </div>
          <p className="text-lg font-medium">09:00 – 18:00</p>
          <p className="text-sm text-gray-400">Monday, Feb 2, 2026</p>
        </div>

        {/* Remaining Time */}
        <div className="bg-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <Timer size={16} />
            Remaining Time
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">02:45</span>
            <span className="text-sm text-gray-400">hrs left</span>
          </div>

          <div className="mt-3 h-1 w-full bg-white/10 rounded-full">
            <div className="h-full w-[45%] bg-[#FA8112] rounded-full" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-[#FA8112] text-sm">
          <CheckCircle2 size={18} />
          Session Active
        </div>

        <button
          onClick={() => navigate(`/user/bookings/edit-session`)}
          className="px-6 py-2 bg-[#FA8112] hover:bg-[#e6730f] text-white text-sm rounded-lg transition"
        >
          Modify Session
        </button>
      </div>
    </section>
  );
};

export default ActiveParkingStatus;
