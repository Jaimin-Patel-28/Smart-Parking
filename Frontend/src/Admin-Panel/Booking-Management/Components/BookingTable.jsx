import React from "react";
import { Eye, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingTable = ({ bookings, onEntry, onExit, processingId = null }) => {
  const navigate = useNavigate();

  if (!Array.isArray(bookings)) {
    return (
      <div className="text-[#FAF3E1] p-6 text-center">Loading bookings...</div>
    );
  }

  return (
    <div className="w-full bg-[#222222] rounded-xl overflow-hidden">
      {/* DESKTOP TABLE VIEW: Hidden on mobile, visible on md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3 px-4">
          <thead>
            <tr className="text-[#FAF3E1]/40 text-[11px] uppercase tracking-wider font-semibold">
              <th className="py-4 px-4">Ticket</th>
              <th className="py-4 px-4">User & Vehicle</th>
              <th className="py-4 px-4">Location</th>
              <th className="py-4 px-4">Time Period</th>
              <th className="py-4 px-4">Amount</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="bg-[#FAF3E1]/5 hover:bg-[#FAF3E1]/10 transition-all duration-300 group"
              >
                <td className="py-4 px-4 rounded-l-xl border-y border-l border-[#F5E7C6]/10">
                  <p className="text-[12px] font-bold text-[#FA8112] tracking-wide">
                    {booking.bookingCode || "N/A"}
                  </p>
                </td>

                <td className="py-4 px-4 border-y border-[#F5E7C6]/10">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#FAF3E1] text-sm">
                        {booking.user?.fullName || "System User"}
                      </p>
                      <p className="text-[10px] font-mono font-bold text-[#FA8112] mt-0.5 uppercase">
                        {booking.vehicleNumber || "NO-PLATE"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 border-y border-[#F5E7C6]/10">
                  <p className="font-medium text-[#FAF3E1]/90 text-sm">
                    {booking.parking?.name}
                  </p>
                  <p className="text-[10px] text-[#FAF3E1]/40 uppercase mt-0.5">
                    {booking.parking?.location}
                  </p>
                </td>

                <td className="py-4 px-4 border-y border-[#F5E7C6]/10">
                  <div className="flex items-center gap-2 text-xs text-[#FAF3E1]/70">
                    <Clock size={13} className="text-[#FA8112]" />
                    {new Date(booking.startTime).toLocaleDateString()}
                  </div>
                  <p className="text-[10px] text-[#FAF3E1]/40 mt-1">
                    {booking.duration} hrs duration
                  </p>
                </td>

                <td className="py-4 px-4 border-y border-[#F5E7C6]/10">
                  <p className="font-bold text-[#FAF3E1] text-base">
                    ₹{booking.totalAmount}
                  </p>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-tighter mt-0.5 ${
                      booking.paymentStatus === "paid"
                        ? "text-[#FA8112]"
                        : "text-amber-400"
                    }`}
                  >
                    {booking.paymentStatus}
                  </p>
                </td>

                <td className="py-4 px-4 border-y border-[#F5E7C6]/10">
                  <BookingStatusBadge status={booking.status} />
                </td>

                <td className="py-4 px-4 text-right rounded-r-xl border-y border-r border-[#F5E7C6]/10">
                  <div className="flex items-center justify-end gap-2">
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => onEntry?.(booking._id)}
                        disabled={processingId === booking._id}
                        className="px-3 py-1.5 text-[10px] font-bold uppercase text-[#FA8112] border border-[#FA8112]/30 rounded-md hover:bg-[#FA8112] hover:text-[#222222] transition-all disabled:opacity-50"
                      >
                        Entry
                      </button>
                    )}
                    {booking.status === "active" && (
                      <button
                        onClick={() => onExit?.(booking._id)}
                        disabled={processingId === booking._id}
                        className="px-3 py-1.5 text-[10px] font-bold uppercase text-amber-400 border border-amber-400/30 rounded-md hover:bg-amber-400 hover:text-[#222222] transition-all disabled:opacity-50"
                      >
                        Exit
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                      className="p-2 bg-[#FAF3E1]/5 hover:bg-[#FA8112] text-[#FAF3E1]/40 hover:text-[#222222] rounded-lg transition-all border border-[#F5E7C6]/5"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW: Visible on small screens, hidden on md+ */}
      <div className="md:hidden flex flex-col gap-4 p-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-xl p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-[#FA8112] uppercase tracking-widest">
                  {booking.bookingCode || "N/A"}
                </p>
                <h4 className="text-[#FAF3E1] font-semibold text-base mt-1">
                  {booking.user?.fullName || "System User"}
                </h4>
              </div>
              <BookingStatusBadge status={booking.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#F5E7C6]/5">
              <div>
                <p className="text-[10px] text-[#FAF3E1]/40 uppercase">
                  Vehicle
                </p>
                <p className="text-xs font-bold text-[#FA8112] mt-1">
                  {booking.vehicleNumber}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#FAF3E1]/40 uppercase">
                  Amount
                </p>
                <p className="text-xs font-bold text-[#FAF3E1] mt-1">
                  ₹{booking.totalAmount}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[11px] text-[#FAF3E1]/60">
                  <Clock size={12} className="text-[#FA8112]" />
                  {new Date(booking.startTime).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => onEntry?.(booking._id)}
                    className="px-4 py-2 text-[10px] font-bold uppercase bg-[#FA8112] text-[#222222] rounded-md"
                  >
                    Entry
                  </button>
                )}
                {booking.status === "active" && (
                  <button
                    onClick={() => onExit?.(booking._id)}
                    className="px-4 py-2 text-[10px] font-bold uppercase bg-amber-400 text-[#222222] rounded-md"
                  >
                    Exit
                  </button>
                )}
                <button
                  onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                  className="p-2 bg-[#FAF3E1]/10 text-[#FAF3E1] rounded-md"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTable;
