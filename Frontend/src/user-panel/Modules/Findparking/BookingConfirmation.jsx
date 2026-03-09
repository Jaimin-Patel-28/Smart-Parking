import React from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import {
  CheckCircle2,
  Ticket,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-700">
      {/* Status Icon Section */}
      <div className="relative">
        <div className="p-6 bg-[#4ADE80]/10 rounded-[2.5rem] text-[#4ADE80] border-4 border-[#4ADE80]/5 shadow-[0_0_40px_rgba(74,222,128,0.1)]">
          <CheckCircle2
            size={56}
            strokeWidth={2.5}
            className="animate-in zoom-in duration-500 delay-200"
          />
        </div>
        <Sparkles
          size={24}
          className="absolute -top-2 -right-2 text-[#FA8112] animate-pulse"
        />
      </div>

      {/* Main Content */}
      <div className="space-y-2">
        <span className="text-[#4ADE80] text-[10px] font-black uppercase tracking-[0.4em] bg-[#4ADE80]/5 px-4 py-1.5 rounded-full border border-[#4ADE80]/20">
          Validation Node Success
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tighter leading-tight">
          Parking Slot <br />
          <span className="text-[#FA8112]">Secured</span>
        </h2>
      </div>

      {/* ID Badge */}
      <div className="flex items-center gap-3 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-5 py-3 rounded-2xl">
        <Ticket size={16} className="text-[#FA8112]" />
        <p className="text-xs font-bold text-[#FAF3E1]/60 tracking-widest uppercase">
          ID: <span className="text-[#FAF3E1] ml-2">SP-2026-992-0402</span>
        </p>
      </div>

      <p className="text-sm text-[#FAF3E1]/40 leading-relaxed max-w-sm font-medium">
        Your allocation at{" "}
        <span className="text-[#FAF3E1]">Anand Central Hub</span> is now active.
        The node will remain reserved for your arrival.
      </p>

      {/* Navigation Actions */}
      <div className="w-full flex flex-col gap-4">
        <button
          onClick={() => navigate("/user/my-bookings")}
          className="group w-full flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] font-black text-sm py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#FA8112]/10"
        >
          GO TO MY BOOKINGS
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        <button className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl border border-[#F5E7C6]/10 text-[#FAF3E1]/60 font-black text-sm hover:bg-[#FAF3E1]/5 transition-all">
          VIEW NODE DETAILS
          <ExternalLink size={16} />
        </button>
      </div>

      {/* Footer Verification */}
      <div className="flex items-center gap-2 pt-4 opacity-30">
        <ShieldCheck size={14} className="text-[#4ADE80]" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          Blockchain Verified Asset • 2026
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
