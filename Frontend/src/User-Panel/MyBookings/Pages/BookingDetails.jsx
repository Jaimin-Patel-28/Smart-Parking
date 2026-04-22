import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Hash, IndianRupee, CalendarDays, ParkingSquare, ShieldCheck, Download } from "lucide-react";
import { format } from "date-fns";
import useBookingDetails from "../Hooks/useBookingDetails";
import ExtendForm from "../Components/ExtendForm";
import EditForm from "../Components/EditForm";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, loading, error, actionLoading, cancelBooking, extendBooking, editBooking } = useBookingDetails(id);
  const [showEdit, setShowEdit] = useState(false);

  const bookingStatus = (booking?.status || "").toLowerCase();
  const now = new Date();
  const startAt = booking?.startTime ? new Date(booking.startTime) : null;
  const endAt = booking?.endTime ? new Date(booking.endTime) : null;
  const isCurrent =
    ["active", "confirmed", "current"].includes(bookingStatus) &&
    startAt &&
    endAt &&
    startAt <= now &&
    endAt >= now;
  const isUpcoming =
    ["confirmed", "active", "upcoming", "scheduled"].includes(bookingStatus) &&
    startAt &&
    startAt > now;

  const formatDuration = (hoursValue) => {
    if (!hoursValue || Number(hoursValue) <= 0) return "N/A";

    const totalMinutes = Math.round(Number(hoursValue) * 60);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
    if (hrs > 0) return `${hrs}h`;
    return `${mins}m`;
  };

  const handleSavePass = async () => {
    if (!booking) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    let y = 18;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Smart Parking - Booking Receipt", 14, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated: ${format(new Date(), "dd MMM yyyy, hh:mm a")}`, 14, y);

    y += 10;
    doc.setDrawColor(240, 240, 240);
    doc.line(14, y, 196, y);

    const rows = [
      ["Booking Code", booking.bookingCode || "PRK-0000"],
      ["Booking ID", booking._id || "N/A"],
      ["User", booking.user?.fullName || "N/A"],
      ["Vehicle Number", booking.vehicleNumber || booking.user?.vehicleNumber || "N/A"],
      ["Parking Zone", booking.parking?.name || "N/A"],
      ["Parking Location", booking.parking?.location || booking.parking?.address || "N/A"],
      ["Slot", booking.slot?.label || "N/A"],
      ["Start Time", booking.startTime ? format(new Date(booking.startTime), "dd MMM yyyy, hh:mm a") : "N/A"],
      ["End Time", booking.endTime ? format(new Date(booking.endTime), "dd MMM yyyy, hh:mm a") : "N/A"],
      ["Duration", formatDuration(booking.duration)],
      ["Total Amount", `INR ${Number(booking.totalAmount || 0).toFixed(2)}`],
      ["Payment Status", booking.paymentStatus || "N/A"],
      ["Booking Status", booking.status || "N/A"],
      ["Created", booking.createdAt ? format(new Date(booking.createdAt), "dd MMM yyyy, hh:mm a") : "N/A"],
    ];

    y += 10;
    rows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`${label}:`, 14, y);

      doc.setFont("helvetica", "normal");
      const wrappedValue = doc.splitTextToSize(String(value), 120);
      doc.text(wrappedValue, 72, y);
      y += Math.max(7, wrappedValue.length * 5);

      if (y > 275) {
        doc.addPage();
        y = 20;
      }
    });

    y += 6;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank you for choosing Smart Parking.", 14, y);

    const safeCode = (booking.bookingCode || "booking-pass").replace(/[^a-zA-Z0-9-_]/g, "");
    const fileName = `${safeCode}-receipt-${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto animate-pulse space-y-6 pb-10">
        <div className="h-40 rounded-[2.5rem] bg-[#FAF3E1]/3 border border-[#F5E7C6]/10" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 rounded-[2.5rem] bg-[#FAF3E1]/3 border border-[#F5E7C6]/10" />
          <div className="h-80 rounded-[2.5rem] bg-[#FAF3E1]/3 border border-[#F5E7C6]/10" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-4xl p-8 text-red-400 font-bold">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-2 text-[#FA8112] font-black uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#FAF3E1]/60 hover:text-[#FA8112] font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} /> Back to bookings
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF3E1]/20">
          Booking Details
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="relative overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/3 p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${isCurrent ? "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20" : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#FAF3E1]/10"}`}>
                  <ShieldCheck size={12} /> {booking.status || "Booking"}
                </div>
                <h1 className="text-4xl font-black text-[#FAF3E1] tracking-tight uppercase">
                  {booking.parking?.name || "Smart Parking"}
                </h1>
                <p className="text-sm text-[#FAF3E1]/40 max-w-2xl leading-relaxed">
                  {booking.parking?.location || "Location unavailable"}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#FA8112] text-[#222222] px-4 py-3 rounded-2xl font-black text-lg">
                <IndianRupee size={18} /> {Number(booking.totalAmount || 0).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <DetailStat icon={<CalendarDays size={16} />} label="Start Time" value={booking.startTime ? format(new Date(booking.startTime), "dd MMM yyyy, HH:mm") : "N/A"} />
              <DetailStat icon={<Clock size={16} />} label="End Time" value={booking.endTime ? format(new Date(booking.endTime), "dd MMM yyyy, HH:mm") : "N/A"} />
              <DetailStat icon={<ParkingSquare size={16} />} label="Slot" value={booking.slot?.label || "TBD"} />
              <DetailStat icon={<Hash size={16} />} label="Vehicle" value={booking.vehicleNumber || booking.vehicle?.number || "N/A"} />
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/3 p-8 space-y-6">
            <div className="flex items-center gap-3 text-[#FAF3E1] font-black uppercase tracking-[0.2em] text-xs">
              <MapPin size={16} className="text-[#FA8112]" /> Parking Location
            </div>
            <div className="rounded-4xl border border-dashed border-[#F5E7C6]/10 bg-[#222222] p-6 text-[#FAF3E1]/70 text-sm leading-relaxed">
              {booking.parking?.address || booking.parking?.location || "No detailed address available for this booking."}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/3 p-6 space-y-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF3E1]/20">Actions</p>
              <h2 className="text-2xl font-black text-[#FAF3E1] mt-2">Manage booking</h2>
            </div>

            <button
              onClick={handleSavePass}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#FAF3E1]/70 border border-[#F5E7C6]/10 hover:bg-[#FAF3E1]/10 transition-all"
            >
              <Download size={15} /> Save Pass (PDF)
            </button>

            {isCurrent ? (
              <div className="space-y-3">
                <ExtendForm bookingId={booking._id} onExtend={(bookingId, adjustmentMinutes) => extendBooking(adjustmentMinutes)} disabled={actionLoading} />
                <button
                  onClick={cancelBooking}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-400 border border-red-400/30 hover:bg-red-500/10 transition-all disabled:opacity-50"
                >
                  Cancel Booking
                </button>
              </div>
            ) : isUpcoming ? (
              <div className="space-y-3">
                <button
                  onClick={() => setShowEdit(true)}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#FA8112] border border-[#FA8112]/30 hover:bg-[#FA8112]/10 transition-all disabled:opacity-50"
                >
                  Edit Booking
                </button>
                <button
                  onClick={cancelBooking}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest text-red-400 border border-red-400/30 hover:bg-red-500/10 transition-all disabled:opacity-50"
                >
                  Cancel Upcoming
                </button>
              </div>
            ) : (
              <p className="text-sm text-[#FAF3E1]/40 leading-relaxed">
                This booking is closed. You can still review the record and payment summary.
              </p>
            )}
          </section>

          <section className="rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/3 p-6 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF3E1]/20">Reference</p>
            <div className="space-y-3 text-sm text-[#FAF3E1]/70">
              <Row label="Booking Number" value={booking.bookingCode || booking.accessCode || "N/A"} />
              <Row label="Booking ID" value={booking._id} />
              <Row label="Payment" value={booking.paymentStatus || "pending"} />
              <Row label="Created" value={booking.createdAt ? format(new Date(booking.createdAt), "dd MMM yyyy, HH:mm") : "N/A"} />
            </div>
          </section>
        </aside>
      </div>

      {showEdit ? (
        <EditForm
          booking={booking}
          onEdit={async (_, updates) => editBooking(updates)}
          onCancel={cancelBooking}
          onClose={() => setShowEdit(false)}
          disabled={actionLoading}
        />
      ) : null}
    </div>
  );
};

const DetailStat = ({ icon, label, value }) => (
  <div className="rounded-[1.75rem] border border-[#F5E7C6]/10 bg-[#222222]/40 p-5 space-y-2">
    <div className="flex items-center gap-2 text-[#FA8112] text-xs font-black uppercase tracking-widest">
      {icon}
      {label}
    </div>
    <p className="text-[#FAF3E1] font-black text-sm leading-relaxed wrap-break-word">{value}</p>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-[#F5E7C6]/5 pb-3 last:border-b-0 last:pb-0">
    <span className="text-[#FAF3E1]/30 font-black uppercase tracking-[0.2em] text-[10px]">{label}</span>
    <span className="text-[#FAF3E1] font-bold text-right break-all max-w-[60%]">{value}</span>
  </div>
);

export default BookingDetails;
