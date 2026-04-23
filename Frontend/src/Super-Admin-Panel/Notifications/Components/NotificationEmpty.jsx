import React from "react";
import { BellOff } from "lucide-react";

const NotificationEmpty = () => {
  return (
    <div className="py-24 text-center bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/5 rounded-xl">
      {/* 1. REFINED ICON: Using a sharper container and muted accent */}
      <div className="inline-flex p-6 rounded-xl bg-[#FAF3E1]/5 text-[#FAF3E1]/10 mb-6 border border-[#F5E7C6]/5">
        <BellOff size={42} strokeWidth={1} />
      </div>

      {/* 2. TYPOGRAPHY: Technical metadata style */}
      <div className="space-y-3 px-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
          Inbox: All Clear
        </h3>

        <p className="text-sm text-[#FAF3E1]/40 max-w-[280px] mx-auto leading-relaxed font-medium">
          Operational alerts, transaction logs, and system heartbeats will be
          dispatched here in real-time.
        </p>
      </div>

      {/* 3. OPTIONAL: Technical Detail */}
      <div className="mt-10 flex items-center justify-center gap-3 opacity-10">
        <span className="h-px w-6 bg-[#FAF3E1]" />
        <span className="text-[8px] font-bold uppercase tracking-widest">
          Listening for signals
        </span>
        <span className="h-px w-6 bg-[#FAF3E1]" />
      </div>
    </div>
  );
};

export default NotificationEmpty;
