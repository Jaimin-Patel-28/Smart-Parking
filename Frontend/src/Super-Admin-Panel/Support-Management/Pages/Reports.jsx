import React from "react";
import {
  BarChart3,
  FileText,
  Activity,
  Terminal,
  ShieldCheck,
} from "lucide-react";

const Reports = () => {
  return (
    <div className="max-w-5xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. ANALYTICS HEADER */}
      <div className="space-y-1 px-1">
        <div className="flex items-center gap-2 text-[#FA8112]">
          <Activity size={14} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Operational Intelligence
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
          Reports <span className="text-[#FA8112]">Center</span>
        </h1>
        <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed">
          High-integrity manifest exports and spatial diagnostics.
        </p>
      </div>

      {/* 2. READINESS CONSOLE */}
      <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
        {/* Architectural Underlay */}
        <div className="absolute -right-8 -top-8 text-[#FAF3E1]/[0.02] group-hover:text-[#FA8112]/[0.03] transition-colors duration-700">
          <Terminal size={180} strokeWidth={1} />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#FA8112]/10 rounded-lg border border-[#FA8112]/20 text-[#FA8112]">
              <BarChart3 size={20} strokeWidth={2} />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-[10px] font-bold text-[#FA8112] uppercase tracking-[0.4em]">
                Protocol Status
              </h2>
              <p className="text-sm font-bold text-[#FAF3E1] tracking-tight uppercase">
                Module_Initialized_V1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[#FA8112]/20" />
            <p className="text-[13px] text-[#FAF3E1]/40 leading-relaxed italic max-w-lg">
              Reports route is live and synchronized. Terminal is ready to
              bridge with backend summary/export endpoints once manifest
              templates are finalized.
            </p>
          </div>

          {/* Action Interface */}
          <div className="pt-4">
            <button className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FA8112] text-[#222222] rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF3E1] shadow-xl shadow-[#FA8112]/5 transition-all active:scale-[0.98]">
              <FileText size={14} strokeWidth={2.5} />
              Generate_System_Snapshot
            </button>
          </div>
        </div>
      </div>

      {/* 3. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 opacity-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <ShieldCheck size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Diagnostic Audit Node • Site_Registry_Anand
        </p>
      </div>
    </div>
  );
};

export default Reports;
