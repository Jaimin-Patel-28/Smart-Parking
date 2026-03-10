import React from "react";

// Accept 'data' prop from Dashboard.jsx
const RecentBookings = ({ data = [] }) => {
  // 1. Handle Empty State gracefully
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-400 mb-4">
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
              d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-slate-800 font-bold">No Recent Activity</h3>
        <p className="text-slate-500 text-sm mt-1">
          New bookings will appear here in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Recent Bookings</h3>
        <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Booking ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Slot</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((b, i) => (
              <tr
                key={b.id || i}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  {b.id}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {b.user}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                  {b.slot}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      b.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : b.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{b.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
