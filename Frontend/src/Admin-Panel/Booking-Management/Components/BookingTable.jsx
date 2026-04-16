import React from "react";
import { Eye, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingTable = ({ bookings, onEntry, onExit, processingId = null }) => {
  const navigate = useNavigate();

  if (!Array.isArray(bookings)) {
    return <div className="text-[#FAF3E1]">Loading bookings...</div>;
  }

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="overflow-x-auto bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-black px-4">
            <th className="py-4 px-6">Ticket Code</th>
            <th className="py-4 px-6">User & Vehicle</th>
            <th className="py-4 px-6">Location</th>
            <th className="py-4 px-6">Time Period</th>
            <th className="py-4 px-6">Amount</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="bg-[#FAF3E1]/2 hover:bg-[#FAF3E1]/4 transition-all duration-300 group border border-[#F5E7C6]/10 shadow-sm"
            >
              <td className="py-5 px-6 rounded-l-3xl">
                <p className="text-[11px] font-black text-[#FA8112] tracking-wider">
                  {booking.bookingCode || "N/A"}
                </p>
              </td>

              {/* User & Vehicle Info */}
              <td className="py-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 flex items-center justify-center text-[#FA8112]">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-black text-[#FAF3E1] text-sm tracking-tight">
                      {booking.user?.fullName || "System User"}
                    </p>
                    <p className="text-[10px] font-mono font-black text-[#FA8112] bg-[#FA8112]/10 px-2 py-0.5 rounded-md inline-block uppercase mt-1 tracking-tighter border border-[#FA8112]/10">
                      {booking.vehicleNumber || "NO-PLATE"}
                    </p>
                  </div>
                </div>
              </td>

              {/* Location Info */}
              <td className="py-5 px-6">
                <p className="font-bold text-[#FAF3E1]/90 text-sm">
                  {booking.parking?.name}
                </p>
                <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-widest mt-0.5">
                  {booking.parking?.location}
                </p>
              </td>

              {/* Time Period */}
              <td className="py-5 px-6">
                <div className="flex items-center gap-2 text-xs text-[#FAF3E1]/70 font-bold">
                  <Clock size={14} className="text-[#FA8112]" />
                  {new Date(booking.startTime).toLocaleDateString()}
                </div>
                <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase mt-1 tracking-tighter">
                  Duration: {booking.duration} hrs
                </p>
              </td>

              {/* Amount & Payment Status */}
              <td className="py-5 px-6">
                <p className="font-black text-[#FAF3E1] text-lg tracking-tighter">
                  ₹{booking.totalAmount}
                </p>
                <p
                  className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                    booking.paymentStatus === "paid"
                      ? "text-[#FA8112]"
                      : "text-amber-400"
                  }`}
                >
                  {booking.paymentStatus}
                </p>
              </td>

              {/* Status Badge */}
              <td className="py-5 px-6">
                <BookingStatusBadge status={booking.status} />
              </td>

              {/* Action Button */}
              <td className="py-5 px-6 text-right rounded-r-3xl">
                <div className="flex items-center justify-end gap-2">
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => onEntry && onEntry(booking._id)}
                      disabled={processingId === booking._id}
                      className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#FA8112] border border-[#FA8112]/30 rounded-lg hover:bg-[#FA8112] hover:text-[#222222] disabled:opacity-50"
                    >
                      Entry
                    </button>
                  )}

                  {booking.status === "active" && (
                    <button
                      onClick={() => onExit && onExit(booking._id)}
                      disabled={processingId === booking._id}
                      className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-amber-400 border border-amber-400/30 rounded-lg hover:bg-amber-400 hover:text-[#222222] disabled:opacity-50"
                    >
                      Exit
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate(`/admin/bookings/${booking._id}`)
                    }
                    className="p-3 bg-[#FAF3E1]/5 hover:bg-[#FA8112] text-[#FAF3E1]/20 hover:text-[#222222] rounded-xl transition-all border border-[#F5E7C6]/5"
                  >
                    <Eye size={18} />
                  </button>
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
