import React from "react";
import {
  ShieldCheck,
  Info,
  Timer,
  LayoutGrid,
  Banknote,
  Terminal,
  Activity,
} from "lucide-react";

const BookingSummary = ({ parking, slot, duration, total }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* 1. SECTOR TELEMETRY GRID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 p-5 rounded-xl shadow-inner group hover:border-[#FA8112]/20 transition-all duration-500">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid size={14} className="text-[#FA8112]/60" />
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
              Allocation_Node
            </p>
          </div>
          <p className="text-2xl font-bold text-[#FA8112] tabular-nums tracking-tighter">
            {slot?.label || "PENDING"}
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 p-5 rounded-xl shadow-inner group hover:border-[#FA8112]/20 transition-all duration-500">
          <div className="flex items-center gap-2 mb-2">
            <Timer size={14} className="text-[#FA8112]/60" />
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
              Temporal_Cycle
            </p>
          </div>
          <p className="text-2xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter">
            {duration || 0}
            <span className="text-[10px] font-mono opacity-20 ml-2 uppercase tracking-widest">
              Hrs
            </span>
          </p>
        </div>
      </div>

      {/* 2. SYSTEM BUFFER ADVISORY */}
      <div className="bg-[#FA8112]/5 p-5 rounded-xl border border-[#FA8112]/10 flex gap-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#FA8112]/40" />
        <Info size={18} className="shrink-0 text-[#FA8112] opacity-60 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#FA8112]">
            Buffer_Protocol_Active
          </p>
          <p className="text-[11px] text-[#FAF3E1]/40 font-medium leading-relaxed">
            A <span className="text-[#FA8112] font-bold">30-minute buffer</span>{" "}
            is auto-injected to ensure node vacancy and sanitization sequence
            completion.
          </p>
        </div>
      </div>

      {/* 3. SETTLEMENT MANIFEST */}
      <div className="pt-8 border-t border-[#F5E7C6]/5 relative">
        <div className="flex justify-between items-end gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse shadow-[0_0_8px_#FA8112]" />
              <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
                Settlement_Total
              </p>
            </div>
            <h2 className="text-5xl font-bold text-[#FAF3E1] tracking-tighter tabular-nums leading-none">
              ₹{total?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h2>
          </div>

          <div className="text-right space-y-2">
            <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
              Unit_Tariff_Rate
            </p>
            <div className="px-4 py-2 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg inline-block">
              <span className="text-sm font-bold text-[#FA8112] tabular-nums">
                ₹{parking?.basePrice || 0}
                <span className="text-[10px] font-mono opacity-20 ml-2 uppercase">
                  /hr
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* HUD Decoration */}
        <div className="absolute -bottom-4 right-0 opacity-[0.03] pointer-events-none">
          <Terminal size={80} strokeWidth={1} />
        </div>
      </div>

      {/* 4. SECURITY HANDSHAKE */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="flex items-center gap-4 text-[#FAF3E1]/10">
          <span className="h-px w-10 bg-current" />
          <ShieldCheck size={14} />
          <span className="h-px w-10 bg-current" />
        </div>
        <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#FAF3E1]/10">
          End-To-End_Node_Encryption_Finalized
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
