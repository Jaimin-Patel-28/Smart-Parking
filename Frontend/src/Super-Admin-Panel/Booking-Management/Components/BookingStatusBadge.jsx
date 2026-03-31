import React from "react";

const BookingStatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    completed: "bg-slate-100 text-slate-700 border-slate-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.pending}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default BookingStatusBadge;
