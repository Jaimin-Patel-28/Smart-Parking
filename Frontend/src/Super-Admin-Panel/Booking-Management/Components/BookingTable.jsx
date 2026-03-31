import React from "react";
import { Eye, Clock, User, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingStatusBadge from "./BookingStatusBadge";

const BookingTable = ({ bookings }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-widest font-black px-4">
            <th className="py-3 px-4">User & Vehicle</th>
            <th className="py-3 px-4">Location</th>
            <th className="py-3 px-4">Time Period</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="bg-white hover:bg-slate-50 transition-colors group border border-slate-100 shadow-sm rounded-2xl"
            >
              <td className="py-4 px-4 rounded-l-2xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {booking.user?.fullName || "Deleted User"}
                    </p>
                    <p className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded inline-block uppercase">
                      {booking.vehicleNumber || "N/A"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <p className="font-bold text-slate-700 text-sm">
                  {booking.parking?.name}
                </p>
                <p className="text-xs text-slate-400">
                  {booking.parking?.location}
                </p>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Clock size={14} className="text-slate-400" />
                  {new Date(booking.startTime).toLocaleDateString()}
                </div>
                <p className="text-[10px] text-slate-400">
                  Duration: {booking.duration} hrs
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-black text-slate-800">
                  ${booking.totalAmount}
                </p>
                <p
                  className={`text-[10px] font-bold ${booking.paymentStatus === "paid" ? "text-emerald-500" : "text-amber-500"}`}
                >
                  {booking.paymentStatus.toUpperCase()}
                </p>
              </td>
              <td className="py-4 px-4">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="py-4 px-4 text-right rounded-r-2xl">
                <button
                  onClick={() => navigate(`/super-admin/bookings/${booking._id}`)}
                  className="p-2 hover:bg-emerald-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-all"
                >
                  <Eye size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
