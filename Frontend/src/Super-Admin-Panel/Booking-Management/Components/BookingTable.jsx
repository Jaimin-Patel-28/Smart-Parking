import React from "react";
import { Eye, Clock, User, Hash, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingTable = ({ bookings }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto custom-scrollbar bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-1.5 px-1">
        <thead>
          <tr className="text-[#FAF3E1]/20 text-[9px] uppercase font-bold tracking-[0.4em]">
            <th className="py-5 px-8">Operational Subject</th>
            <th className="py-5 px-6">Terminal Site</th>
            <th className="py-5 px-6">Session Window</th>
            <th className="py-5 px-6">Revenue Asset</th>
            <th className="py-5 px-6">Status Log</th>
            <th className="py-5 px-8 text-right">Audit</th>
          </tr>
        </thead>

        <tbody className="space-y-2">
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              onClick={() => navigate(`/super-admin/bookings/${booking._id}`)}
              className="group cursor-pointer bg-[#FAF3E1]/[0.01] hover:bg-[#FAF3E1]/[0.03] transition-all duration-500 border-y border-[#F5E7C6]/5"
            >
              {/* 1. Subject & Vehicle */}
              <td className="py-6 px-8 rounded-l-lg border-l border-[#F5E7C6]/5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 flex items-center justify-center text-[#FA8112]/40 group-hover:text-[#FA8112] transition-colors">
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#FAF3E1] text-sm tracking-tight leading-none">
                      {booking.user?.fullName || "Registry Guest"}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FA8112]/5 border border-[#FA8112]/10">
                      <Hash size={10} className="text-[#FA8112]/60" />
                      <span className="text-[10px] font-mono font-bold text-[#FA8112] uppercase tracking-tighter">
                        {booking.vehicleNumber || "NO-PLATE"}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              {/* 2. Terminal Info */}
              <td className="py-6 px-6">
                <p className="font-bold text-[#FAF3E1] text-[13px] tracking-tight">
                  {booking.parking?.name}
                </p>
                <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.2em] mt-1">
                  {booking.parking?.location}
                </p>
              </td>

              {/* 3. Session Window */}
              <td className="py-6 px-6">
                <div className="flex items-center gap-2 text-[11px] text-[#FAF3E1]/60 font-bold tabular-nums">
                  <Clock size={12} className="text-[#FA8112]/40" />
                  {new Date(booking.startTime).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase mt-1 tracking-widest">
                  Duration:{" "}
                  <span className="text-[#FAF3E1]/40">{booking.duration}H</span>
                </p>
              </td>

              {/* 4. Revenue Asset */}
              <td className="py-6 px-6">
                <p className="font-bold text-[#FAF3E1] text-base tabular-nums tracking-tighter">
                  ₹{Number(booking.totalAmount).toLocaleString()}
                </p>
                <p
                  className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${
                    booking.paymentStatus === "paid"
                      ? "text-[#FA8112]/60"
                      : "text-amber-500/60"
                  }`}
                >
                  {booking.paymentStatus}
                </p>
              </td>

              {/* 5. Status Log */}
              <td className="py-6 px-6">
                <BookingStatusBadge status={booking.status} />
              </td>

              {/* 6. Audit Action */}
              <td className="py-6 px-8 text-right rounded-r-lg border-r border-[#F5E7C6]/5">
                <div className="inline-flex items-center justify-center p-2 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:border-[#FA8112]/20 transition-all">
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
