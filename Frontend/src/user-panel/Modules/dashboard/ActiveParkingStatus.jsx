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
  const progressValue = 65;

  return (
    <div className="relative overflow-hidden bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 hover:border-[#FA8112]/30">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FA8112]/5 blur-[80px] -z-10" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 blur-[60px] -z-10" />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#FA8112] animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FA8112]">
              Live Session Active
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[#FAF3E1]">
            Active <span className="text-[#FA8112]/80">Parking</span>
          </h2>
          <p className="text-[#FAF3E1]/40 text-xs font-medium flex items-center gap-1.5">
            <Activity size={12} className="text-[#FA8112]/40" />
            Node: Anand Central Mall • Sensor v4.2
          </p>
        </div>

        <button
          onClick={() => navigate("/user/bookings/edit-session")}
          className="group flex items-center gap-2 bg-[#FAF3E1]/5 hover:bg-[#FA8112] border border-[#F5E7C6]/10 hover:border-[#FA8112] px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 hover:text-[#222222] hover:shadow-[0_0_20px_rgba(250,129,18,0.3)]"
        >
          Modify Session{" "}
          <ChevronRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* --- DATA GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#111111]/40 border border-[#F5E7C6]/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[#FA8112]/10 rounded-xl text-[#FA8112]">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 font-bold">
              Location
            </p>
            <p className="text-sm font-bold text-[#FAF3E1]">Level 2, Zone B</p>
            <p className="text-[10px] text-[#FAF3E1]/40">
              Central Mall Parking
            </p>
          </div>
        </div>

        <div className="bg-[#111111]/40 border border-[#F5E7C6]/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
            <Hash size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 font-bold">
              Slot ID
            </p>
            <p className="text-sm font-bold text-[#FAF3E1]">P-104</p>
            <p className="text-[10px] text-blue-400/60 font-mono tracking-tighter">
              SECURE_LINK_STABLE
            </p>
          </div>
        </div>

        <div className="bg-[#111111]/40 border border-[#F5E7C6]/5 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 font-bold">
              Remaining
            </p>
            <p className="text-sm font-mono font-black text-[#FAF3E1]">
              02:45:12
            </p>
            <p className="text-[10px] text-[#FAF3E1]/40 tracking-tight">
              Auto-checkout: 16:30
            </p>
          </div>
        </div>
      </div>

      {/* --- PROGRESS FOOTER --- */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <div className="flex items-center gap-2 text-[#FAF3E1]/60 text-xs font-bold uppercase tracking-widest">
              <Timer size={14} className="text-[#FA8112]" />
              Session Progress
            </div>
            <span className="text-lg font-black text-[#FA8112]">
              {progressValue}%
            </span>
          </div>

          <div className="h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-[#F5E7C6]/5">
            <div
              className="h-full bg-gradient-to-r from-[#FA8112] to-[#f5a623] transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(250,129,18,0.4)]"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
            <CheckCircle2 size={12} className="text-green-500" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">
              Hardware Link Verified
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF3E1]/5 rounded-full border border-[#FAF3E1]/10">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-wider">
              Cloud Sync: Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveParkingStatus;
