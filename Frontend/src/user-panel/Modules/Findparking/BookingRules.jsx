import React, { useState } from "react";
import {
  ShieldCheck,
  XCircle,
  Clock,
  RefreshCcw,
  ArrowUpCircle,
  Info,
  ChevronRight,
  Check,
} from "lucide-react";

const BookingRules = ({ onAcceptChange }) => {
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleToggle = () => {
    const newState = !hasAgreed;
    setHasAgreed(newState);
    onAcceptChange(newState); // Tells parent if the button should unlock
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FA8112]/20 rounded-2xl text-[#FA8112]">
            <ShieldCheck size={24} className="fill-[#FA8112]/20" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#FAF3E1]">
              Booking Rules
            </h2>
            <p className="text-[#FAF3E1]/40 text-[10px] uppercase tracking-[0.3em] font-bold">
              Compliance Node v1.0
            </p>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 gap-3">
        <RuleRow
          icon={XCircle}
          label="Cancellation Policy"
          desc="Full refund available up to 60 mins before arrival."
        />
        <RuleRow
          icon={Clock}
          label="Late Entry Rules"
          desc="15-minute grace period allowed beyond start time."
        />
      </div>

      {/* 🟢 NEW: CONSENT NODE */}
      <div className="pt-6 border-t border-[#F5E7C6]/10">
        <button
          onClick={handleToggle}
          className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-500 ${
            hasAgreed
              ? "border-[#FA8112] bg-[#FA8112]/5 shadow-[0_0_20px_rgba(250,129,18,0.1)]"
              : "border-[#F5E7C6]/10 bg-[#222222]"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                hasAgreed
                  ? "bg-[#FA8112] border-[#FA8112]"
                  : "border-[#FAF3E1]/20"
              }`}
            >
              {hasAgreed && (
                <Check size={16} className="text-[#222222] stroke-[4]" />
              )}
            </div>
            <span
              className={`text-sm font-black tracking-widest uppercase ${hasAgreed ? "text-[#FAF3E1]" : "text-[#FAF3E1]/40"}`}
            >
              I agree to all governance rules
            </span>
          </div>

          {hasAgreed && (
            <span className="text-[10px] font-black text-[#FA8112] animate-pulse">
              PROTOCOL ACCEPTED
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const RuleRow = ({ icon: Icon, label, desc }) => (
  <div className="flex items-center gap-5 p-4 rounded-2xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5">
    <div className="p-2.5 bg-[#FAF3E1]/[0.03] rounded-xl text-[#FAF3E1]/40">
      <Icon size={18} />
    </div>
    <div className="flex-1">
      <p className="text-[11px] font-black text-[#FAF3E1] uppercase tracking-tight">
        {label}
      </p>
      <p className="text-[10px] text-[#FAF3E1]/40 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default BookingRules;
