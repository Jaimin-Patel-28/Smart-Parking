import React from "react";

const BookingStatusBadge = ({ status }) => {
  // Theme: BG #222222 | Accent #FA8112 | High-DPI Typography

  const statusLower = status?.toLowerCase();

  const styles = {
    // ACTIVE: Live operational signal
    active: "text-[#FA8112] border-[#FA8112]/20 bg-[#FA8112]/5",

    // PENDING: Cautionary amber
    pending: "text-amber-400 border-amber-400/20 bg-amber-400/5",

    // CONFIRMED: Validated cyan
    confirmed: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",

    // COMPLETED: Archived/Finalized record
    completed: "text-[#FAF3E1]/20 border-[#F5E7C6]/5 bg-[#FAF3E1]/2",

    // CANCELLED: Terminated session
    cancelled: "text-rose-500 border-rose-500/20 bg-rose-500/5",
  };

  const currentStyle = styles[statusLower] || styles.pending;

  return (
    <div className="inline-flex items-center gap-2">
      {/* Status Signal Dot */}
      <span className={`relative flex h-1.5 w-1.5`}>
        {statusLower === "active" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
            statusLower === "active"
              ? "bg-[#FA8112]"
              : statusLower === "cancelled"
                ? "bg-rose-500/40"
                : statusLower === "completed"
                  ? "bg-[#FAF3E1]/10"
                  : "bg-current opacity-60"
          }`}
        ></span>
      </span>

      {/* The Label */}
      <span
        className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${currentStyle}`}
      >
        {status}
      </span>
    </div>
  );
};

export default BookingStatusBadge;
