import React from "react";

const BookingStatusBadge = ({ status }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const statusLower = status?.toLowerCase();

  const styles = {
    // Primary Accent for Active/Live sessions
    active:
      "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20 shadow-[0_0_8px_rgba(250,129,18,0.1)]",

    // Warm Amber for Pending
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",

    // Cool Cyan/Blue for Confirmed
    confirmed: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",

    // Muted Cream for Completed
    completed: "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/10",

    // Rose Red for Cancelled
    cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  const currentStyle = styles[statusLower] || styles.pending;

  return (
    <span
      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border transition-all duration-300 ${currentStyle}`}
    >
      {status}
    </span>
  );
};

export default BookingStatusBadge;
