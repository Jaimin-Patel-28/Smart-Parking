import React from "react";
import {
  Calendar,
  ChevronRight,
  Hash,
  MapPin,
  Activity,
  Terminal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentBookings = ({ recentBookings }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500/5 text-emerald-400 border-emerald-500/20";
      case "active":
        return "bg-[#FA8112]/5 text-[#FA8112] border-[#FA8112]/20";
      case "pending":
        return "bg-amber-500/5 text-amber-400 border-amber-500/20";
      default:
        return "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#FAF3E1]/10";
    }
  };

  if (!recentBookings || recentBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#FAF3E1]/[0.01] rounded-xl border border-dashed border-[#F5E7C6]/5 group">
        <div className="bg-[#FAF3E1]/[0.02] p-5 rounded-lg mb-4 text-[#FAF3E1]/5 group-hover:text-[#FA8112]/20 transition-colors duration-500">
          <Calendar size={32} strokeWidth={1} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
          Zero_Activity_Detected
        </p>
        <p className="text-[#FAF3E1]/10 text-[9px] uppercase tracking-widest mt-2">
          Awaiting system sequence initiation
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentBookings.slice(0, 5).map((booking) => (
        <div
          key={booking._id}
          onClick={() => navigate(`/user/bookings/${booking._id}`)}
          className="group relative overflow-hidden flex items-center justify-between p-4 bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl transition-all duration-500 hover:bg-[#FAF3E1]/[0.03] hover:border-[#FA8112]/20 cursor-pointer"
        >
          {/* Edge Accent Indicator */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FA8112] opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center gap-5 relative z-10">
            {/* 1. DATE STAMP: Precision Geometry */}
            <div className="h-12 w-12 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg flex flex-col items-center justify-center shadow-inner group-hover:border-[#FA8112]/20 transition-colors">
              <span className="text-base font-bold text-[#FAF3E1] leading-none tabular-nums">
                {new Date(booking.createdAt).getDate()}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#FA8112]/60">
                {new Date(booking.createdAt)
                  .toLocaleString("en", { month: "short" })
                  .toUpperCase()}
              </span>
            </div>

            {/* 2. ENTITY DETAILS */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-[#FAF3E1] text-[13px] uppercase tracking-tight group-hover:text-[#FA8112] transition-colors">
                  {booking.parking?.name || "Terminal_Null"}
                </p>
                {booking.status?.toLowerCase() === "active" && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse shadow-[0_0_5px_#FA8112]" />
                )}
              </div>
              <div className="flex items-center gap-4 text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={10} className="text-[#FA8112]/40" />
                  {booking.slot?.label || "UNSET"}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Hash size={10} className="text-[#FA8112]/40" />
                  {booking.qrNumber || "---"}
                </span>
              </div>
            </div>
          </div>

          {/* 3. SETTLEMENT & STATUS */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-sm font-bold text-[#FAF3E1] tabular-nums tracking-tighter group-hover:scale-105 transition-transform">
                ₹
                {Number(booking.totalAmount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <div
                className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase tracking-widest ${getStatusStyle(booking.status)}`}
              >
                {booking.status}
              </div>
            </div>

            {/* Navigation Hint */}
            <div className="text-[#FAF3E1]/5 group-hover:text-[#FA8112] transition-colors">
              <ChevronRight size={16} strokeWidth={3} />
            </div>
          </div>
        </div>
      ))}

      {recentBookings.length > 5 && (
        <button
          onClick={() => navigate("/user/bookings")}
          className="w-full pt-4 pb-2 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 hover:text-[#FA8112] transition-all group"
        >
          <Terminal
            size={10}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          Access_Full_Registry
        </button>
      )}
    </div>
  );
};

export default RecentBookings;
