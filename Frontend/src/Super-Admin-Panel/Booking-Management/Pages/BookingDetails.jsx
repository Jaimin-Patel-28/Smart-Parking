import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  ShieldCheck,
  Terminal,
  Activity,
} from "lucide-react";
import { bookingService } from "../Services/bookingService";
import BookingStatusBadge from "../Components/BookingStatusBadge";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    bookingService.getById(id).then((res) => {
      setBooking(res.data.data);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setPendingStatus(newStatus);
    setShowConfirm(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;
    const newStatus = pendingStatus;
    setShowConfirm(false);
    setPendingStatus(null);

    try {
      await bookingService.updateStatus(id, newStatus);
      const updated = await bookingService.getById(id);
      setBooking(updated.data.data);
      toast.success(`Protocol: Status Updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Terminal update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Activity
          className="h-10 w-10 animate-spin text-[#FA8112]/40"
          strokeWidth={1}
        />
        <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
          Decrypting Session Manifest...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. NAVIGATION */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
      >
        <ChevronLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Registry Archive
      </button>

      {/* 2. MAIN TICKET CONTAINER */}
      <div className="bg-[#FAF3E1]/[0.01] rounded-xl border border-[#F5E7C6]/5 shadow-2xl overflow-hidden relative">
        {/* Ticket Header */}
        <div className="p-8 md:p-10 border-b border-[#F5E7C6]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#FAF3E1]/[0.01]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-5 w-[2px] bg-[#FA8112] shadow-[0_0_8px_#FA8112]" />
              <h2 className="text-2xl font-bold text-[#FAF3E1] tracking-tight uppercase">
                Session <span className="text-[#FA8112]">Manifest</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
              <Terminal size={12} />
              Ref: {booking._id.toUpperCase()}
            </div>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Ticket Body */}
        <div className="p-8 md:p-10 grid md:grid-cols-2 gap-12">
          {/* Left Column: Entity Identity */}
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em] flex items-center gap-2">
                <User size={12} className="text-[#FA8112]" /> Identity Metadata
              </label>
              <div className="p-6 bg-[#FAF3E1]/[0.02] rounded-lg border border-[#F5E7C6]/5 space-y-1">
                <p className="font-bold text-[#FAF3E1] text-lg tracking-tight">
                  {booking.user?.name}
                </p>
                <p className="text-xs text-[#FAF3E1]/40 font-medium tabular-nums">
                  {booking.user?.email}
                </p>
                <p className="text-[11px] text-[#FAF3E1]/30 font-mono">
                  {booking.user?.phone}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em] flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#FA8112]" /> Registered
                Identifier
              </label>
              <p className="text-5xl font-bold text-[#FA8112] tracking-tighter font-mono uppercase">
                {booking.vehicleNumber}
              </p>
            </div>
          </div>

          {/* Right Column: Temporal & Financial Data */}
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-[#FAF3E1]/[0.02] rounded-lg border border-[#F5E7C6]/5 space-y-2">
                <label className="text-[8px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest block">
                  Initialization
                </label>
                <p className="font-bold text-[#FAF3E1] text-[11px] tabular-nums leading-none">
                  {new Date(booking.startTime).toLocaleString()}
                </p>
              </div>
              <div className="p-5 bg-[#FAF3E1]/[0.02] rounded-lg border border-[#F5E7C6]/5 space-y-2">
                <label className="text-[8px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest block">
                  Termination
                </label>
                <p className="font-bold text-[#FAF3E1] text-[11px] tabular-nums leading-none">
                  {new Date(booking.endTime).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Settlement Engine Visualization */}
            <div className="p-8 bg-[#FA8112] rounded-xl text-[#222222] flex justify-between items-center shadow-2xl shadow-[#FA8112]/10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Clock size={160} strokeWidth={1} />
              </div>
              <div className="relative z-10 space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">
                  Revenue Settlement
                </p>
                <h3 className="text-5xl font-bold tracking-tighter tabular-nums">
                  ₹{booking.totalAmount}
                </h3>
              </div>
              <div className="text-right relative z-10 space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                  Protocol
                </p>
                <p className="font-bold text-xl uppercase tracking-tighter italic">
                  {booking.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Footer: Action Console */}
        <div className="p-8 md:p-10 bg-[#FAF3E1]/[0.01] border-t border-[#F5E7C6]/5 flex flex-wrap gap-4">
          {booking.status === "pending" && (
            <button
              onClick={() => handleStatusChange("confirmed")}
              className="flex items-center gap-3 px-8 py-3 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all active:scale-95 shadow-lg shadow-[#FA8112]/5"
            >
              <CheckCircle size={16} /> Authorize Unit
            </button>
          )}
          {booking.status === "confirmed" && (
            <button
              onClick={() => handleStatusChange("active")}
              className="flex items-center gap-3 px-8 py-3 bg-cyan-500/80 text-[#222222] rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1] transition-all active:scale-95"
            >
              Initialize Node
            </button>
          )}
          {booking.status === "active" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="flex items-center gap-3 px-8 py-3 bg-[#FAF3E1]/5 text-[#FAF3E1] border border-[#F5E7C6]/5 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-[#FA8112] hover:text-[#222222] transition-all active:scale-95"
            >
              Terminate Session
            </button>
          )}
          {["pending", "confirmed"].includes(booking.status) && (
            <button
              onClick={() => handleStatusChange("cancelled")}
              className="flex items-center gap-3 px-8 py-3 bg-rose-500/5 text-rose-400 border border-rose-500/20 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-[#222222] transition-all"
            >
              <XCircle size={16} /> Void Manifest
            </button>
          )}
        </div>
      </div>

      {/* 3. TECHNICAL METADATA */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 opacity-10">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Terminal size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.6em]">
          Automated Billing & Reservation Node • v1.0.8
        </p>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="Protocol Override"
        message={`Authorize status transition to ${pendingStatus?.toUpperCase() || "NULL"}?`}
        confirmLabel="Acknowledge"
        intent="default"
        onConfirm={confirmStatusChange}
        onCancel={() => {
          setShowConfirm(false);
          setPendingStatus(null);
        }}
      />
    </div>
  );
};

export default BookingDetails;
