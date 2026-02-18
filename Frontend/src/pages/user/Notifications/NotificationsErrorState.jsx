import React from "react";
import { AlertCircle, RefreshCw, WifiOff, ZapOff } from "lucide-react";

const NotificationsErrorState = () => {
  const handleRetry = () => {
    // Logic for MERN re-fetching data
    window.location.reload();
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 px-8 text-center bg-white rounded-[3rem] border-2 border-[#222222]/5 shadow-sm transition-all duration-500 group">
      {/* 1. VISUAL ANCHOR: High-Contrast Error Icon */}
      <div className="relative mb-10">
        <div className="w-24 h-24 bg-[#F5E7C6] rounded-[2.5rem] flex items-center justify-center text-[#FA8112] group-hover:rotate-12deg transition-all duration-500 shadow-inner">
          <WifiOff size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 p-3 bg-[#222222] rounded-2xl shadow-xl text-[#FAF3E1] group-hover:scale-110 transition-transform">
          <AlertCircle size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. EDITORIAL TEXT: Honest & Direct Communication */}
      <div className="max-w-sm space-y-4">
        <h2 className="text-3xl font-black text-[#222222] tracking-tighter leading-tight">
          Connection{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Interrupted
          </span>
        </h2>
        <p className="text-sm font-medium text-[#222222]/40 leading-relaxed">
          Our servers in{" "}
          <strong className="text-[#222222]/60">Anand City</strong> are having
          trouble reaching your device. This is likely a temporary sync issue.
        </p>
      </div>

      {/* 3. RECOVERY ACTION: Tactile Button */}
      <div className="mt-10 flex flex-col items-center gap-6">
        <button
          onClick={handleRetry}
          className="flex items-center gap-3 px-10 py-5 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#222222]/10 hover:bg-[#FA8112] transition-all active:scale-95 group/btn"
        >
          <RefreshCw
            size={18}
            strokeWidth={3}
            className="group-hover/btn:rotate-180 transition-transform duration-700"
          />
          Reconnect Node
        </button>

        {/* 4. TECHNICAL FOOTER: Viva Ready Detail */}
        <div className="flex items-center gap-2 text-[#222222]/20">
          <ZapOff size={14} />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">
            Error: MERN_SOCKET_TIMEOUT_01
          </span>
        </div>
      </div>

      {/* Subtle paper grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[3rem]"></div>
    </section>
  );
};

export default NotificationsErrorState;
