import React from "react";
import {
  CheckCircle2,
  RefreshCw,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const BookingActions = ({ onConfirm, onChangeSlot, onCancel }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 🟠 Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FA8112]/20 rounded-2xl text-[#FA8112]">
            <Zap size={24} className="fill-[#FA8112]/20" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#FAF3E1]">
              Execution Node
            </h2>
            <p className="text-[#FAF3E1]/40 text-[10px] uppercase tracking-[0.3em] font-bold">
              Final Command Phase
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[#4ADE80]/5 border border-[#4ADE80]/20 rounded-full">
          <ShieldCheck size={14} className="text-[#4ADE80]" />
          <span className="text-[10px] font-black text-[#4ADE80] uppercase tracking-widest">
            Ready
          </span>
        </div>
      </div>

      {/* 🟠 Primary Action: Initialize */}
      <button
        onClick={onConfirm}
        className="group relative w-full flex items-center justify-between bg-[#FA8112] text-[#222222] p-2 rounded-[2.5rem] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#FA8112]/20 overflow-hidden"
      >
        <div className="flex items-center gap-4 ml-6">
          <CheckCircle2
            size={24}
            className="group-hover:rotate-[360deg] transition-transform duration-500"
          />
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">
              Initialize Transaction
            </span>
            <span className="text-xl font-black uppercase">
              Confirm Booking
            </span>
          </div>
        </div>
        <div className="bg-[#222222] text-[#FA8112] p-5 rounded-full mr-1 group-hover:translate-x-1 transition-transform">
          <ArrowRight size={24} />
        </div>
      </button>

      {/* 🟠 Secondary Actions: Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onChangeSlot}
          className="flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] text-[#FAF3E1]/60 font-black text-sm hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1] transition-all"
        >
          <RefreshCw size={18} />
          <span>CHANGE SLOT</span>
        </button>

        <button
          onClick={onCancel}
          className="flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border border-red-500/10 bg-red-500/[0.02] text-red-500/60 font-black text-sm hover:bg-red-500/10 hover:text-red-500 transition-all"
        >
          <XCircle size={18} />
          <span>CANCEL ALL</span>
        </button>
      </div>

      {/* 🟠 Footer Security Info */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#F5E7C6]/5">
        <div className="flex items-center gap-2 text-[#FAF3E1]/20">
          <ShieldCheck size={14} />
          <p className="text-[10px] font-bold uppercase tracking-widest">
            Secure Handshake
          </p>
        </div>
        <div className="h-1 w-1 rounded-full bg-[#FAF3E1]/10" />
        <p className="text-[10px] font-black text-[#FA8112]/40 tracking-widest uppercase">
          v2.0.4 Encrypted
        </p>
      </div>
    </div>
  );
};

export default BookingActions;
