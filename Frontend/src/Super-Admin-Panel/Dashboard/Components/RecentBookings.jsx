import React from "react";

// Accept 'data' prop from Dashboard.jsx
const RecentBookings = ({ data = [] }) => {
  // Theme Variables Applied:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  // 1. Handle Empty State gracefully
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#FAF3E1]/2 rounded-[2.5rem] border border-[#F5E7C6]/10 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF3E1]/5 text-[#FAF3E1]/20 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-[#FAF3E1] font-black uppercase tracking-widest text-sm">
          No Recent Activity
        </h3>
        <p className="text-[#FAF3E1]/40 text-xs mt-2 font-medium">
          New bookings will appear here in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF3E1]/2 rounded-[2.5rem] border border-[#F5E7C6]/10 overflow-hidden shadow-sm">
      <div className="p-8 border-b border-[#F5E7C6]/10 flex justify-between items-center">
        <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest">
          Recent Bookings
        </h3>
        <button className="text-[10px] text-[#FA8112] font-black uppercase tracking-widest hover:underline underline-offset-4 transition-all">
          View All
        </button>
      </div>
      <div className="overflow-x-auto px-2 pb-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-6 py-5">Booking ID</th>
              <th className="px-6 py-5">User</th>
              <th className="px-6 py-5">Slot</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5E7C6]/5">
            {data.map((b, i) => {
              const normalizedStatus = String(b.status || "").toLowerCase();

              return (
              <tr
                key={b.id || i}
                className="hover:bg-[#FAF3E1]/3 transition-colors group cursor-default"
              >
                <td className="px-6 py-5 text-sm font-black text-[#FAF3E1] font-mono tracking-tighter">
                  #{b.id}
                </td>
                <td className="px-6 py-5 text-sm text-[#FAF3E1]/70 font-bold">
                  {b.user}
                </td>
                <td className="px-6 py-5 text-sm text-[#FA8112] font-black">
                  {b.slot}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      normalizedStatus === "active"
                        ? "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20"
                        : normalizedStatus === "pending"
                          ? "bg-amber-400/10 text-amber-400 border-amber-400/20"
                          : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/10"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-[11px] font-bold text-[#FAF3E1]/30 tracking-tight">
                  {b.time}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
