import React from "react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import { useBookings } from "../Hooks/useBookings";
import {
  MapPin,
  Hash,
  ReceiptIndianRupee,
  Calendar,
  ArrowRight,
  Loader2,
  Terminal,
  Activity,
  Database,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookings, loading } = useBookings(user?._id);

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="relative">
          <Loader2
            className="animate-spin text-[#FA8112]/20"
            size={48}
            strokeWidth={1}
          />
          <Database
            size={16}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FA8112] animate-pulse"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
          Synchronizing_Ledger_Data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-24 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. REGISTRY HEADER */}
      <header className="px-1 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#FA8112]">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Financial_Archive_Monitor
            </span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] tracking-tight uppercase">
              Past <span className="text-[#FA8112]">Logs</span>
            </h1>
          </div>
          <p className="text-[#FAF3E1]/20 font-bold uppercase text-[9px] tracking-[0.3em] ml-1">
            Immutable record of historical spatial allocations
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 px-8 py-4 rounded-xl shadow-inner min-w-[180px]">
          <p className="text-[8px] font-bold uppercase text-[#FAF3E1]/10 tracking-[0.4em] mb-2">
            Archive_Total_Entries
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#FAF3E1] tabular-nums leading-none tracking-tighter">
              {bookings.length.toString().padStart(3, "0")}
            </span>
            <Activity size={14} className="text-[#FA8112]/20" />
          </div>
        </div>
      </header>

      {/* 2. REGISTRY LIST AREA */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/5 rounded-xl text-center">
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#F5E7C6]/5 text-[#FAF3E1]/10 mb-8">
            <Database size={48} strokeWidth={1} />
          </div>
          <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight mb-3">
            Archive_Zero_State
          </h3>
          <button
            onClick={() => navigate("/user/find-parking")}
            className="text-[#FA8112] text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[#FAF3E1] transition-colors"
          >
            Initialize_First_Allocation →
          </button>
        </div>
      ) : (
        <div className="space-y-3 px-1">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group relative overflow-hidden bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-6 transition-all duration-500 hover:bg-[#FAF3E1]/[0.03] hover:border-[#FA8112]/20"
            >
              <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between relative z-10">
                {/* LEFT: TEMPORAL DATA */}
                <div className="flex items-center gap-6">
                  {/* Recessed Date Node */}
                  <div className="h-16 w-16 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-[#FA8112]/20 transition-colors">
                    <span className="text-2xl font-bold text-[#FAF3E1] tabular-nums leading-none tracking-tighter">
                      {format(new Date(booking.startTime), "dd")}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FA8112] mt-1">
                      {format(new Date(booking.startTime), "MMM")}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-bold text-[#FAF3E1] uppercase tracking-tight text-lg group-hover:text-[#FA8112] transition-colors">
                      {booking.parking?.name || "SPATIAL_NODE_NULL"}
                    </h3>
                    <div className="flex items-center gap-4 text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.25em]">
                      <span className="flex items-center gap-2">
                        <MapPin size={10} className="text-[#FA8112]/40" />
                        {booking.parking?.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: SETTLEMENT TELEMETRY */}
                <div className="flex items-center justify-between md:justify-end gap-12 pt-6 md:pt-0 border-t md:border-t-0 border-[#F5E7C6]/5">
                  <div className="text-left md:text-right space-y-1">
                    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/10">
                      Assigned_Node
                    </p>
                    <div className="flex items-center gap-2 text-[#FA8112]/60">
                      <Hash size={10} />
                      <span className="text-[11px] font-mono font-bold text-[#FAF3E1]/60 tracking-widest uppercase">
                        {booking.slot?.label || "TBD"}
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right space-y-1">
                    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/10">
                      Settlement_Val
                    </p>
                    <p className="text-xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter">
                      ₹
                      {Number(booking.totalAmount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    <button
                      onClick={() => navigate(`/user/bookings/${booking._id}`)}
                      className="p-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1]/10 group-hover:text-[#FA8112] group-hover:border-[#FA8112]/40 transition-all shadow-xl"
                    >
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* HUD SCANLINE UNDERLAY */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FA8112]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      )}

      {/* 3. SYSTEM FOOTER */}
      <div className="flex flex-col items-center gap-4 pt-12 opacity-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Database size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Archive Registry Verified • Node: Ledger_Main
        </p>
      </div>
    </div>
  );
};

export default BookingHistory;
