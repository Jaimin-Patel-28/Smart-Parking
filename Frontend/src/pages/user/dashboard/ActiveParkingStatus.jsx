import React from "react";
import { MapPin, Hash, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const ActiveParkingStatus = ({ activeSession }) => {
  const navigate = useNavigate();

  const progress =
    ((activeSession.totalDuration - activeSession.remaining) /
      activeSession.totalDuration) *
    100;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">
            Active <span className="text-[#FA8112]">Parking</span>
          </h2>
          <p className="text-[10px] text-[#FAF3E1]/40 uppercase mt-1">
            {activeSession.location}
          </p>
        </div>

        <button
          onClick={() => navigate("/user/bookings/edit-session")}
          className="flex items-center gap-2 bg-[#FAF3E1] text-[#222222] px-5 py-3 rounded-xl font-black text-[10px] uppercase hover:bg-[#FA8112] hover:text-white"
        >
          Modify <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-4">
          <MapPin size={14} className="text-[#FA8112] mb-2" />
          <p className="text-xs uppercase text-[#FAF3E1]/30">Location</p>
          <p className="text-lg font-black">{activeSession.zone}</p>
        </div>

        <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-4">
          <Hash size={14} className="text-[#FA8112] mb-2" />
          <p className="text-xs uppercase text-[#FAF3E1]/30">Slot ID</p>
          <p className="text-2xl font-black text-[#FA8112]">
            {activeSession.slotId}
          </p>
        </div>

        <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-4">
          <Clock size={14} className="text-[#FA8112] mb-2" />
          <p className="text-xs uppercase text-[#FAF3E1]/30">Remaining</p>
          <p className="text-xl font-black">
            {formatTime(activeSession.remaining)}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] uppercase text-[#FAF3E1]/40">
          <span>Session Progress</span>
          <span className="text-[#FA8112] font-black">
            {Math.floor(progress)}%
          </span>
        </div>

        <div className="h-1.5 bg-[#FAF3E1]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FA8112]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default ActiveParkingStatus;
