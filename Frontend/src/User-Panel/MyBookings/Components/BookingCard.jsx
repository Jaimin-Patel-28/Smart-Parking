import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Hash,
  IndianRupee,
  Clock,
  ShieldCheck,
  Terminal,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";
import ExtendForm from "./ExtendForm";
import EditForm from "./EditForm";

const BookingCard = ({
  booking,
  onExtend,
  onEdit,
  onCancel,
  isCurrent = false,
  isUpcoming = false,
  extendingId = null,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const navigate = useNavigate();

  const remaining = formatDistanceToNow(new Date(booking.endTime), {
    addSuffix: true,
  });

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancelBooking = () => {
    onCancel(booking._id);
    setShowCancelConfirm(false);
  };

  return (
    <div className="group relative overflow-hidden bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-6 transition-all duration-500 hover:bg-[#FAF3E1]/[0.03] hover:border-[#FA8112]/20 shadow-2xl">
      {/* 1. STATUS HEADER: Registry Metadata */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex flex-col gap-1">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-[0.2em] ${
              isCurrent
                ? "bg-[#FA8112]/5 text-[#FA8112] border-[#FA8112]/20 shadow-[0_0_15px_rgba(250,129,18,0.1)]"
                : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#FAF3E1]/10"
            }`}
          >
            <Activity size={10} className={isCurrent ? "animate-pulse" : ""} />
            {isCurrent ? "Active_Session" : "Scheduled_Registry"}
          </div>
          <span className="text-[7px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-[0.4em] ml-1">
            Ref_ID: {booking._id.slice(-8).toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#F5E7C6]/5 px-3 py-1.5 rounded-lg shadow-inner">
            <IndianRupee size={12} className="text-[#FA8112]" />
            <span className="text-sm font-bold text-[#FAF3E1] tabular-nums">
              {Number(booking.totalAmount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. CORE LOGISTICS: Spatial Data */}
      <div className="flex gap-5 items-start mb-10 relative z-10">
        <div className="h-12 w-12 bg-[#FA8112]/5 rounded-lg border border-[#FA8112]/10 flex items-center justify-center shrink-0 group-hover:border-[#FA8112]/40 transition-colors duration-500 shadow-xl">
          <MapPin className="h-5 w-5 text-[#FA8112]" strokeWidth={1.5} />
        </div>
        <div className="space-y-1.5 overflow-hidden">
          <h3 className="font-bold text-[#FAF3E1] text-lg uppercase tracking-tight truncate leading-none">
            {booking.parking?.name || "ZONE_NULL"}
          </h3>
          <div className="flex items-center gap-2">
            <Terminal size={10} className="text-[#FA8112]/40" />
            <p className="text-[#FAF3E1]/20 text-[9px] font-bold uppercase truncate tracking-[0.2em]">
              {booking.parking?.location || "GEN_SPATIAL_CLUSTER"}
            </p>
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL TELEMETRY: Timing & Slot */}
      <div className="grid grid-cols-2 gap-6 p-4 bg-[#1a1a1a]/40 border border-[#F5E7C6]/5 rounded-lg mb-8 relative z-10">
        <div className="space-y-2 border-r border-[#F5E7C6]/5">
          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
            {isCurrent ? "Expiration_T-Minus" : "Registry_Entry"}
          </p>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-[#FA8112]/60" />
            <span className="text-[11px] font-mono font-bold text-[#FAF3E1]/80 uppercase">
              {isCurrent
                ? remaining.replace("about ", "")
                : format(new Date(booking.startTime), "HH:mm | MMM dd")}
            </span>
          </div>
        </div>

        <div className="space-y-2 pl-2">
          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
            Designated_Node
          </p>
          <div className="flex items-center gap-2">
            <Hash size={12} className="text-[#FA8112]/60" />
            <span className="text-[11px] font-mono font-bold text-[#FA8112] uppercase tracking-widest">
              {booking.slot?.label || "PENDING"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. ACTIONS CONSOLE */}
      <div className="space-y-3 relative z-10">
        <button
          onClick={() => navigate(`/user/bookings/${booking._id}`)}
          className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/60 border border-[#F5E7C6]/10 py-3 rounded-lg hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1] transition-all duration-300"
        >
          Access_Full_Manifest
        </button>

        {(isCurrent || isUpcoming) && (
          <div className="grid grid-cols-2 gap-3">
            {isCurrent ? (
              <div className="col-span-2 space-y-3">
                <ExtendForm
                  bookingId={booking._id}
                  onExtend={onExtend}
                  disabled={extendingId === booking._id}
                />
                <button
                  onClick={handleCancelClick}
                  className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500/60 border border-rose-500/10 py-3 rounded-lg hover:bg-rose-500/5 hover:text-rose-400 transition-all"
                >
                  <AlertTriangle size={12} /> Terminate_Session
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowEdit(true)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8112] border border-[#FA8112]/20 py-3 rounded-lg hover:bg-[#FA8112]/5 transition-all"
                >
                  Modify_Entry
                </button>
                <button
                  onClick={handleCancelClick}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500/60 border border-rose-500/10 py-3 rounded-lg hover:bg-rose-500/5 hover:text-rose-400 transition-all"
                >
                  Abort_Registry
                </button>
              </>
            )}
          </div>
        )}

        {showEdit && (
          <EditForm
            booking={booking}
            onEdit={onEdit}
            onCancel={onCancel}
            onClose={() => setShowEdit(false)}
            disabled={extendingId === booking._id}
          />
        )}
      </div>

      {/* 5. BACKGROUND AUTHENTICATOR: Structural Underlay */}
      <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-[#FA8112]/5 -rotate-12 pointer-events-none group-hover:text-[#FA8112]/10 transition-colors duration-1000" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FA8112]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <ConfirmDialog
        open={showCancelConfirm}
        title="Protocol_Abort_Sequence"
        message="Initiating cancellation will terminate this registry entry. Eligible refunds are processed via the automated settlement engine."
        confirmLabel="Confirm_Abort"
        cancelLabel="Stay_Active"
        intent="danger"
        onConfirm={confirmCancelBooking}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
};

export default BookingCard;
