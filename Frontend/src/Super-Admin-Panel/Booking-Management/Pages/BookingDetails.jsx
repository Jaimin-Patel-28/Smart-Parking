import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { bookingService } from "../Services/bookingService";
import BookingStatusBadge from "../Components/BookingStatusBadge";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getById(id).then((res) => {
      setBooking(res.data.data);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (!window.confirm(`Change booking status to ${newStatus}?`)) return;
    try {
      await bookingService.updateStatus(id, newStatus);
      const updated = await bookingService.getById(id);
      setBooking(updated.data.data);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-slate-400">
        Loading details...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition-colors"
      >
        <ChevronLeft size={20} /> Back to List
      </button>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800 underline decoration-emerald-500/30 underline-offset-8">
              Booking Ticket
            </h2>
            <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-tighter">
              {booking._id}
            </p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-12">
          {/* Left Column: User & Vehicle */}
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase">
                Customer Information
              </label>
              <div className="mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="font-bold text-slate-800">{booking.user?.name}</p>
                <p className="text-sm text-slate-500">{booking.user?.email}</p>
                <p className="text-sm text-slate-500">{booking.user?.phone}</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase">
                Vehicle Detail
              </label>
              <p className="text-2xl font-black text-emerald-600 tracking-wider mt-1">
                {booking.vehicleNumber}
              </p>
            </div>
          </div>

          {/* Right Column: Reservation details */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <label className="text-[10px] font-black text-slate-400 uppercase italic">
                  Entry Time
                </label>
                <p className="font-bold text-slate-700 text-sm mt-1">
                  {new Date(booking.startTime).toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <label className="text-[10px] font-black text-slate-400 uppercase italic">
                  Exit Time
                </label>
                <p className="font-bold text-slate-700 text-sm mt-1">
                  {new Date(booking.endTime).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-6 bg-emerald-600 rounded-3xl text-white flex justify-between items-center shadow-lg shadow-emerald-900/20">
              <div>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">
                  Grand Total
                </p>
                <h3 className="text-3xl font-black">${booking.totalAmount}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold opacity-70 uppercase">
                  Payment
                </p>
                <p className="font-black italic">
                  {booking.paymentStatus.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-4">
          {booking.status === "pending" && (
            <button
              onClick={() => handleStatusChange("confirmed")}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-md hover:bg-emerald-700 transition-all"
            >
              <CheckCircle size={18} /> Confirm Booking
            </button>
          )}
          {booking.status === "confirmed" && (
            <button
              onClick={() => handleStatusChange("active")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-md hover:bg-blue-700 transition-all"
            >
              Mark as Active (Check-in)
            </button>
          )}
          {booking.status === "active" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold shadow-md hover:bg-slate-900 transition-all"
            >
              Mark as Completed (Check-out)
            </button>
          )}
          {["pending", "confirmed"].includes(booking.status) && (
            <button
              onClick={() => handleStatusChange("cancelled")}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-red-200 text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all"
            >
              <XCircle size={18} /> Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
