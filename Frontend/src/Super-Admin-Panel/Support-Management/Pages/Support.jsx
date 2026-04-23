import React from "react";
import SupportInbox from "../../../Shared/Components/SupportInbox";
import { ShieldCheck, MessageSquare, Activity } from "lucide-react";

const Support = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. COMMAND HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Global Governance
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Support <span className="text-[#FA8112]">Central</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed max-w-xl">
            Cross-platform visibility for all support sequences, including
            status tracking and administrative internal logs.
          </p>
        </div>

        {/* Real-time Indicator */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-lg">
          <div className="relative h-1.5 w-1.5">
            <span className="animate-ping absolute inset-0 rounded-full bg-[#FA8112] opacity-75" />
            <span className="relative block h-1.5 w-1.5 rounded-full bg-[#FA8112]" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FA8112]">
            Live Channel
          </span>
        </div>
      </div>

      {/* 2. SHARED INBOX COMPONENT */}
      <div className="relative group">
        {/* Subtle glow effect behind the inbox */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FA8112]/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        <div className="relative">
          <SupportInbox
            title="Global Ticket Registry"
            subtitle="Admin-level access to the unified support manifest."
          />
        </div>
      </div>

      {/* 3. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="flex items-center gap-4 text-[#FAF3E1]/5">
          <span className="h-px w-12 bg-current" />
          <MessageSquare size={14} />
          <span className="h-px w-12 bg-current" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.6em]">
          End-to-End Resolution Node • Secure_Channel_V2
        </p>
      </div>
    </div>
  );
};

export default Support;
