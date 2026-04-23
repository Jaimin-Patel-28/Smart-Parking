import React from "react";
import { BellOff, Activity, Terminal } from "lucide-react";

const NotificationEmpty = () => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="relative overflow-hidden py-32 text-center bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/10 rounded-xl group">
      {/* 1. BACKGROUND SIGNAL: Subtle decorative underlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.04]">
        <Terminal size={300} strokeWidth={0.5} />
      </div>

      <div className="relative z-10">
        {/* 2. RECESSED ICON HOUSING */}
        <div className="inline-flex p-6 rounded-xl bg-[#1a1a1a] border border-[#F5E7C6]/5 text-[#FAF3E1]/10 mb-8 shadow-inner group-hover:border-[#FA8112]/20 transition-all duration-500">
          <BellOff size={40} strokeWidth={1} />
        </div>

        {/* 3. TECHNICAL LOGIC LABELS */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#FA8112]/20" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
              Zero_Signal_Detected
            </p>
            <span className="h-px w-6 bg-[#FA8112]/20" />
          </div>

          <p className="text-[11px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest max-w-xs mx-auto leading-relaxed px-6">
            Registry alerts regarding{" "}
            <span className="text-[#FA8112]/40">allocation</span>,{" "}
            <span className="text-[#FA8112]/40">settlement</span>, and{" "}
            <span className="text-[#FA8112]/40">node_status</span> will
            synchronize here.
          </p>
        </div>

        {/* 4. STATUS FOOTER */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-10">
          <Activity size={12} />
          <span className="text-[8px] font-mono font-bold uppercase tracking-[0.3em]">
            Monitoring_Pulse_Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationEmpty;
