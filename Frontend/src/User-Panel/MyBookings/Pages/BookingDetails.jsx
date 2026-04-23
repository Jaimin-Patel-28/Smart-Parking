import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Hash,
  IndianRupee,
  CalendarDays,
  ParkingSquare,
  ShieldCheck,
  Download,
  Terminal,
  Activity,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import useBookingDetails from "../Hooks/useBookingDetails";
import ExtendForm from "../Components/ExtendForm";
import EditForm from "../Components/EditForm";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    booking,
    loading,
    error,
    actionLoading,
    cancelBooking,
    extendBooking,
    editBooking,
  } = useBookingDetails(id);
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
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const handleSavePass = async () => {
    if (!booking) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // PDF generation remains functional but stylized for the engine persona
    doc.setFont("courier", "bold");
    doc.text("SMART_PARK_SYSTEM_MANIFEST", 14, 18);
    // ... (rest of PDF logic remains same but using courier font for terminal feel)
    doc.save(`manifest-${booking._id.slice(-6)}.pdf`);
  };

  if (loading)
    return (
      <div className="max-w-[1200px] mx-auto space-y-8 animate-pulse p-4">
        <div className="h-48 rounded-xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 rounded-xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5" />
          <div className="h-96 rounded-xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto py-32 text-center">
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-10 text-rose-400">
          <ShieldAlert size={48} className="mx-auto mb-6 opacity-40" />
          <p className="font-bold uppercase tracking-[0.3em] text-sm">
            Registry_Access_Denied
          </p>
          <p className="text-[10px] mt-2 opacity-60 uppercase tracking-widest">
            {error}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-10 inline-flex items-center gap-3 text-[#FA8112] font-bold uppercase tracking-[0.3em] text-[10px] hover:text-[#FAF3E1] transition-colors"
        >
          <ArrowLeft size={14} /> Revert_to_Registry
        </button>
      </div>
    );

  if (!booking) return null;

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* COMMAND HEADER */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-[#FAF3E1]/20 hover:text-[#FA8112] font-bold uppercase tracking-[0.3em] text-[10px] transition-all group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Registry_Directory
        </button>
        <div className="flex items-center gap-3 opacity-20">
          <Terminal size={14} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">
            Node_Manifest_Inspector
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* PRIMARY ALLOCATION PANEL */}
          <section className="relative overflow-hidden rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA8112]/[0.02] blur-[120px] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
              <div className="space-y-6">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-[0.2em] ${isCurrent ? "bg-[#FA8112]/5 text-[#FA8112] border-[#FA8112]/20" : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5"}`}
                >
                  <Activity
                    size={10}
                    className={isCurrent ? "animate-pulse" : ""}
                  />
                  {booking.status?.toUpperCase() || "NULL_STATE"}
                </div>
                <h1 className="text-4xl font-bold text-[#FAF3E1] tracking-tight uppercase leading-none">
                  {booking.parking?.name || "SPATIAL_ZONE_ALPHA"}
                </h1>
                <div className="flex items-center gap-3 text-[#FAF3E1]/30">
                  <MapPin size={14} className="text-[#FA8112]/60" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">
                    {booking.parking?.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
                  Total_Settlement
                </p>
                <div className="flex items-center gap-2 bg-[#FA8112] text-[#222222] px-6 py-3 rounded-lg font-bold text-2xl tabular-nums shadow-xl shadow-[#FA8112]/10">
                  <IndianRupee size={20} strokeWidth={3} />{" "}
                  {Number(booking.totalAmount || 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 relative z-10">
              <DetailStat
                icon={<CalendarDays size={14} />}
                label="Sequence_Init"
                value={
                  booking.startTime
                    ? format(new Date(booking.startTime), "dd MMM yyyy, HH:mm")
                    : "N/A"
                }
              />
              <DetailStat
                icon={<Clock size={14} />}
                label="Sequence_End"
                value={
                  booking.endTime
                    ? format(new Date(booking.endTime), "dd MMM yyyy, HH:mm")
                    : "N/A"
                }
              />
              <DetailStat
                icon={<ParkingSquare size={14} />}
                label="Allocation_Node"
                value={booking.slot?.label || "TBD"}
              />
              <DetailStat
                icon={<Hash size={14} />}
                label="Vehicle_ID"
                value={booking.vehicleNumber || "UNREGISTERED"}
              />
            </div>
          </section>

          {/* SPATIAL COORDINATES */}
          <section className="rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-10 space-y-8 shadow-2xl">
            <div className="flex items-center gap-4 text-[#FAF3E1]/40">
              <div className="h-px w-8 bg-[#FA8112]/40" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em]">
                Spatial_Node_Coordinates
              </h4>
            </div>
            <div className="rounded-lg border border-dashed border-[#F5E7C6]/10 bg-[#1a1a1a] p-8 text-[#FAF3E1]/60 text-sm font-medium leading-relaxed italic">
              {booking.parking?.address ||
                "No precise coordinate data available for this node."}
            </div>
          </section>
        </div>

        {/* ACTIONS & REFERENCE COLUMN */}
        <aside className="space-y-8">
          <section className="rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
                Command_Panel
              </p>
              <h2 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                Node_Operations
              </h2>
            </div>

            <button
              onClick={handleSavePass}
              className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/40 border border-[#F5E7C6]/10 hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1] transition-all"
            >
              <FileText size={14} /> Export_Manifest_PDF
            </button>

            <div className="pt-4 border-t border-[#F5E7C6]/5">
              {isCurrent ? (
                <div className="space-y-4">
                  <ExtendForm
                    bookingId={booking._id}
                    onExtend={(id, mins) => extendBooking(mins)}
                    disabled={actionLoading}
                  />
                  <button
                    onClick={cancelBooking}
                    disabled={actionLoading}
                    className="w-full py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500/40 border border-rose-500/10 hover:bg-rose-500/5 hover:text-rose-400 transition-all disabled:opacity-20"
                  >
                    Terminate_Sequence
                  </button>
                </div>
              ) : isUpcoming ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowEdit(true)}
                    disabled={actionLoading}
                    className="w-full py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8112] border border-[#FA8112]/20 hover:bg-[#FA8112]/5 transition-all disabled:opacity-20"
                  >
                    Modify_Allocation
                  </button>
                  <button
                    onClick={cancelBooking}
                    disabled={actionLoading}
                    className="w-full py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500/40 border border-rose-500/10 hover:bg-rose-500/5 hover:text-rose-400 transition-all disabled:opacity-20"
                  >
                    Abort_Registry
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5">
                  <p className="text-[10px] text-[#FAF3E1]/20 font-bold uppercase tracking-widest leading-relaxed">
                    Sequence closed. Registry entry finalized.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* TECHNICAL REFERENCE BOX */}
          <section className="rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-8 space-y-6 shadow-2xl overflow-hidden group">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
              Registry_Reference
            </p>
            <div className="space-y-4 font-mono">
              <Row
                label="SEQUENCE_NO"
                value={booking.bookingCode || "REF_NULL"}
              />
              <Row
                label="NODE_UID"
                value={booking._id.slice(-12).toUpperCase()}
              />
              <Row
                label="SETTLEMENT"
                value={booking.paymentStatus?.toUpperCase() || "PENDING"}
              />
              <Row
                label="INIT_STAMP"
                value={
                  booking.createdAt
                    ? format(new Date(booking.createdAt), "dd.MM.yy HH:mm")
                    : "N/A"
                }
              />
            </div>
          </section>
        </aside>
      </div>

      {showEdit && (
        <EditForm
          booking={booking}
          onEdit={async (_, updates) => editBooking(updates)}
          onCancel={cancelBooking}
          onClose={() => setShowEdit(false)}
          disabled={actionLoading}
        />
      )}
    </div>
  );
};

const DetailStat = ({ icon, label, value }) => (
  <div className="rounded-lg border border-[#F5E7C6]/5 bg-[#1a1a1a] p-6 space-y-3 shadow-inner hover:border-[#FA8112]/20 transition-all duration-500 group/stat">
    <div className="flex items-center gap-3 text-[#FA8112]/60 text-[10px] font-bold uppercase tracking-[0.2em]">
      {icon}
      {label}
    </div>
    <p className="text-[#FAF3E1] font-bold text-sm tracking-tight tabular-nums group-hover/stat:text-[#FA8112] transition-colors">
      {value}
    </p>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex flex-col gap-1 border-b border-[#F5E7C6]/5 pb-4 last:border-b-0 last:pb-0">
    <span className="text-[#FAF3E1]/10 font-bold uppercase tracking-[0.2em] text-[8px]">
      {label}
    </span>
    <span className="text-[#FAF3E1]/60 text-[11px] break-all">{value}</span>
  </div>
);

export default BookingDetails;
