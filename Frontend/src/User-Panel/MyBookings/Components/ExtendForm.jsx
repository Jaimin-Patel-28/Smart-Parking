import React, { useState } from "react";
import { Clock, Plus, X, ChevronRight, Zap, Activity, Timer, Terminal } from "lucide-react";

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
      {/* 1. TRIGGER ACTION: Technical Chip */}
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className="group flex items-center justify-center gap-2 rounded-lg bg-[#FA8112]/5 border border-[#FA8112]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8112] transition-all hover:bg-[#FA8112] hover:text-[#222222] disabled:opacity-20 active:scale-95 shadow-xl shadow-[#FA8112]/5"
      >
        <Plus
          size={14}
          strokeWidth={3}
          className="group-hover:rotate-90 transition-transform duration-500"
        />
        Adjust_Time_Params
      </button>

      {/* 2. COMMAND MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-[#222222]/90 animate-in fade-in duration-500">
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* TOP SCANLINE */}
            <div className={`h-1 w-full bg-gradient-to-r from-transparent ${mode === 'extend' ? 'via-[#FA8112]' : 'via-rose-500'} to-transparent opacity-50`} />

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-10">
                <div className="space-y-1.5">
                   <div className="flex items-center gap-2 text-[#FA8112]">
                    <Terminal size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Temporal_Shift</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                    Add <span className="text-[#FA8112]">Delta</span>
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Logic Configuration */}
              <div className="space-y-8">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 mb-4 ml-1">
                    Select_Adjustment_Mode
                  </p>
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#222222] rounded-xl border border-[#F5E7C6]/5 shadow-inner">
                    <button
                      onClick={() => setMode("extend")}
                      className={`py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                        mode === "extend"
                          ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/10"
                          : "text-[#FAF3E1]/20 hover:text-[#FAF3E1]/60"
                      }`}
                    >
                      Extend
                    </button>
                    <button
                      onClick={() => setMode("reduce")}
                      className={`py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                        mode === "reduce"
                          ? "bg-rose-500 text-[#222222] shadow-lg shadow-rose-500/10"
                          : "text-[#FAF3E1]/20 hover:text-rose-400"
                      }`}
                    >
                      Reduce
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/10 ml-1">Value_Hrs</label>
                       <input
                        type="number"
                        min="0"
                        max="24"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full rounded-lg border border-[#F5E7C6]/5 bg-[#1a1a1a] p-4 text-center text-xl font-bold text-[#FAF3E1] outline-none transition-all focus:border-[#FA8112]/40 tabular-nums shadow-inner"
                        placeholder="00"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/10 ml-1">Value_Mins</label>
                       <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="w-full rounded-lg border border-[#F5E7C6]/5 bg-[#1a1a1a] p-4 text-center text-xl font-bold text-[#FAF3E1] outline-none transition-all focus:border-[#FA8112]/40 tabular-nums shadow-inner"
                        placeholder="00"
                      />
                    </div>
                  </div>
                </div>

                {/* TEMPORAL DELTA SUMMARY */}
                <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-lg p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity size={14} className={`animate-pulse ${mode === 'extend' ? 'text-[#FA8112]' : 'text-rose-500'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/40">
                      Temporal_Delta
                    </span>
                  </div>
                  <span className={`text-lg font-bold tabular-nums ${mode === 'extend' ? 'text-[#FA8112]' : 'text-rose-500'}`}>
                    {mode === "extend" ? "+" : "-"}{formatDuration(totalMinutes)}
                  </span>
                </div>

                {/* FINAL COMMANDS */}
                <div className="space-y-4 pt-4">
                  <button
                    onClick={handleExtend}
                    disabled={disabled || totalMinutes < 1 || totalMinutes > 1440 || parsedMinutes > 59}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.3em] text-[#222222] transition-all active:scale-[0.98] disabled:opacity-20 shadow-2xl ${
                      mode === 'extend' ? 'bg-[#FA8112] shadow-[#FA8112]/10' : 'bg-rose-500 shadow-rose-500/10'
                    }`}
                  >
                    Confirm_Sequence <ChevronRight size={14} strokeWidth={3} />
                  </button>
                  
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 hover:text-[#FAF3E1]/40 transition-all"
                  >
                    Abort_Command
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExtendForm;