import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  X,
  AlertTriangle,
  ChevronRight,
  Timer,
  Terminal,
  Activity,
  ShieldAlert,
} from "lucide-react";
import { format, differenceInHours } from "date-fns";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const EditForm = ({ booking, onEdit, onCancel, onClose, disabled }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (booking) {
      setStartTime(new Date(booking.startTime));
      setEndTime(new Date(booking.endTime));
    }
  }, [booking]);

  const duration =
    startTime && endTime
      ? Math.max(0, differenceInHours(endTime, startTime))
      : 0;

  const handleSubmit = async () => {
    if (!startTime || !endTime || !booking) return;
    setLoading(true);
    try {
      await onEdit(booking._id, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
      onClose();
    } catch (err) {
      console.error("Registry_Update_Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancelBooking = () => {
    onCancel(booking._id);
    onClose();
    setShowCancelConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-[#222222]/90 animate-in fade-in duration-500">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* 1. TOP HARDWARE ACCENT */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FA8112] to-transparent opacity-50" />

        <div className="p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-10 px-1">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#FA8112]">
                <Terminal size={14} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                  Registry_Editor
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                Modify <span className="text-[#FA8112]">Pass</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* 2. TEMPORAL PARAMETERS */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                Registry_Arrival
              </label>
              <div className="relative group">
                <Clock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
                  size={16}
                />
                <input
                  type="datetime-local"
                  value={
                    startTime ? format(startTime, "yyyy-MM-dd'T'HH:mm") : ""
                  }
                  onChange={(e) => setStartTime(new Date(e.target.value))}
                  className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-3.5 pl-12 pr-4 text-[#FAF3E1] font-mono text-sm focus:outline-none focus:border-[#FA8112]/40 transition-all [color-scheme:dark]"
                  disabled={loading || disabled}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                Registry_Departure
              </label>
              <div className="relative group">
                <Timer
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
                  size={16}
                />
                <input
                  type="datetime-local"
                  value={endTime ? format(endTime, "yyyy-MM-dd'T'HH:mm") : ""}
                  onChange={(e) => setEndTime(new Date(e.target.value))}
                  className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-3.5 pl-12 pr-4 text-[#FAF3E1] font-mono text-sm focus:outline-none focus:border-[#FA8112]/40 transition-all [color-scheme:dark]"
                  disabled={loading || disabled}
                />
              </div>
            </div>

            {/* 3. DURATION TELEMETRY */}
            <div className="bg-[#FA8112]/5 border border-[#FA8112]/10 rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity size={14} className="text-[#FA8112] animate-pulse" />
                <span className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-widest">
                  Updated_Duration
                </span>
              </div>
              <span className="text-xl font-bold text-[#FAF3E1] tabular-nums">
                {duration}{" "}
                <small className="text-[9px] uppercase font-bold opacity-20 ml-1 tracking-widest">
                  Hrs
                </small>
              </span>
            </div>

            {/* 4. ACTIONS CONSOLE */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading || disabled || !startTime || !endTime}
                className="w-full flex items-center justify-center gap-3 bg-[#FA8112] py-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-[#222222] hover:bg-[#FAF3E1] transition-all disabled:opacity-20 shadow-2xl active:scale-[0.98]"
              >
                {loading ? (
                  <Activity size={16} className="animate-spin" />
                ) : (
                  <>
                    Commit_Update <ChevronRight size={14} strokeWidth={3} />
                  </>
                )}
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F5E7C6]/5" />
                </div>
                <span className="relative px-4 text-[8px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em]">
                  Critical_Control
                </span>
              </div>

              <button
                onClick={handleCancelClick}
                disabled={loading || disabled}
                className="group w-full flex items-center justify-center gap-3 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500/40 hover:text-rose-400 transition-all"
              >
                <ShieldAlert size={14} className="group-hover:animate-pulse" />
                Abort_Registry_Sequence
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showCancelConfirm}
        title="Protocol_Abort_Sequence"
        message="Authorize immediate release of allocated spatial node? This action is finalized upon confirmation."
        confirmLabel="Confirm_Abort"
        intent="danger"
        onConfirm={confirmCancelBooking}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
};

export default EditForm;
