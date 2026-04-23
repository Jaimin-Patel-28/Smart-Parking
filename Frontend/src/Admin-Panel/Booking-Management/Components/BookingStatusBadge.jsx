import React from "react";

const BookingStatusBadge = ({ status }) => {
  // Logic remains untouched
  const statusLower = status?.toLowerCase();

  const styles = {
    // Primary Accent: Using your #FA8112 with a more professional opacity
    active: "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/30",

    // Pending: Softer Amber
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",

    // Confirmed: Professional Emerald/Teal instead of high-contrast Cyan
    confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    // Completed: Using your #FAF3E1 but slightly more visible for professional look
    completed: "bg-[#FAF3E1]/10 text-[#FAF3E1]/60 border-[#F5E7C6]/20",

    // Cancelled: Soft Rose
    cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  const currentStyle = styles[statusLower] || styles.pending;

  return (
    <span
      className={`
        /* Layout: Proper padding and inline-block for consistency */
        inline-flex items-center justify-center px-2.5 py-0.5 
        
        /* Shape: rounded-md (6px) instead of large rounded-lg for a sharper look */
        rounded-md 
        
        /* Typography: Fixed "Bold & Big" issue. Semi-bold is more premium than Black */
        text-[10px] font-bold uppercase tracking-wider 
        
        /* Structure: Border and Transitions */
        border transition-colors duration-300 
        
        ${currentStyle}
      `}
    >
      {status}
    </span>
  );
};

export default BookingStatusBadge;
