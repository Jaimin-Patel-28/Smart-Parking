import React, { useState } from "react";
import { Clock, Plus, X, ChevronRight, Zap } from "lucide-react";

const ExtendForm = ({ bookingId, onExtend, disabled }) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [mode, setMode] = useState("extend");
  const [showModal, setShowModal] = useState(false);

  const parsedHours = Math.max(0, Number(hours) || 0);
  const parsedMinutes = Math.max(0, Number(minutes) || 0);
  const totalMinutes = parsedHours * 60 + parsedMinutes;

  const formatDuration = (totalMins) => {
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;

    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
    if (hrs > 0) return `${hrs}h`;
    return `${mins}m`;
  };

  const handleExtend = () => {
    const signedMinutes =
      mode === "reduce" ? -Math.abs(totalMinutes) : Math.abs(totalMinutes);
    onExtend(bookingId, signedMinutes);
    setShowModal(false);
  };

  return (
    <>
      {/* 1. Trigger Button - Styled as a Compact Action Chip */}
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className="group mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#FA8112] transition-all hover:bg-[#FA8112] hover:text-[#222222] hover:shadow-lg hover:shadow-[#FA8112]/20 disabled:opacity-30"
      >
        <Plus
          size={14}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
        Extend Pass
      </button>

      {/* 2. Premium Glass Modal */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 backdrop-blur-md bg-[#222222]/60 animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#1a1a1a] p-8 shadow-2xl">
            {/* Background Decorative Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FA8112] opacity-10 blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-[#FA8112]/10 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-[#FA8112]" />
                </div>
                <h3 className="text-xl font-black text-[#FAF3E1] italic uppercase tracking-tighter">
                  Add Time
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#FAF3E1]/20 hover:text-[#FAF3E1]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chip Selection Logic */}
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-4 ml-1">
                  Adjust Booking Time
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setMode("extend")}
                    className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                      mode === "extend"
                        ? "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20"
                        : "bg-[#FAF3E1]/5 border-[#F5E7C6]/5 text-[#FAF3E1]/40 hover:border-[#FA8112]/40"
                    }`}
                  >
                    Extend
                  </button>
                  <button
                    onClick={() => setMode("reduce")}
                    className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                      mode === "reduce"
                        ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20"
                        : "bg-[#FAF3E1]/5 border-[#F5E7C6]/5 text-[#FAF3E1]/40 hover:border-rose-400/40"
                    }`}
                  >
                    Reduce
                  </button>
                </div>

                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-2 ml-1">
                  Hours
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="1"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/3 px-4 py-4 text-center text-xl font-black text-[#FAF3E1] outline-none transition-all focus:border-[#FA8112]"
                    disabled={disabled}
                    placeholder="Hours"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-full rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/3 px-4 py-4 text-center text-xl font-black text-[#FAF3E1] outline-none transition-all focus:border-[#FA8112]"
                    disabled={disabled}
                    placeholder="Minutes"
                  />
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#FAF3E1]/40">
                  Max adjustment: 24h
                </p>
              </div>

              {/* Summary Box */}
              <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#FAF3E1]/60">
                  <Zap size={16} className="text-[#FA8112]" />
                  <span className="text-xs font-bold uppercase tracking-widest italic">
                    {mode === "extend" ? "New Expiry" : "Refund / Time Removed"}
                  </span>
                </div>
                <span className="text-sm font-black text-[#FAF3E1] italic">
                  {mode === "extend" ? "+" : "-"}
                  {formatDuration(totalMinutes)}
                </span>
              </div>

              {/* Final Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleExtend}
                  disabled={
                    disabled ||
                    totalMinutes < 1 ||
                    totalMinutes > 24 * 60 ||
                    parsedMinutes > 59
                  }
                  className="w-full flex items-center justify-center gap-3 bg-[#FA8112] py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-[#222222] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#FA8112]/20"
                >
                  {mode === "extend" ? "Confirm Extension" : "Confirm Reduction"}
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/20 hover:text-[#FAF3E1]/60 transition-all"
                >
                    Back to My Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExtendForm;
