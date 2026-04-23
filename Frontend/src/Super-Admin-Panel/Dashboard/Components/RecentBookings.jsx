import React from "react";
import { ListFilter, ArrowUpRight, ClipboardList } from "lucide-react";

const RecentBookings = ({ data = [] }) => {
  // Theme: BG #222222 | Text #FAF3E1 | Accent #FA8112 | Border #F5E7C6/5

  if (!data || data.length === 0) {
    return (
      <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/5 p-16 text-center shadow-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#FAF3E1]/5 text-[#FAF3E1]/10 mb-6 border border-[#F5E7C6]/5">
          <ClipboardList size={40} strokeWidth={1} />
        </div>
        <h3 className="text-[#FAF3E1] font-bold uppercase tracking-[0.2em] text-xs">
          Queue Empty
        </h3>
        <p className="text-[#FAF3E1]/30 text-xs mt-3 max-w-[200px] mx-auto leading-relaxed">
          System is currently idle. Incoming bookings will initialize
          automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/5 overflow-hidden shadow-2xl">
      {/* HEADER SECTION */}
      <div className="px-6 py-5 border-b border-[#F5E7C6]/5 flex justify-between items-center bg-[#FAF3E1]/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#FA8112]/10 text-[#FA8112]">
            <ListFilter size={16} />
          </div>
          <h3 className="text-[11px] font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
            Recent Activity Log
          </h3>
        </div>
        <button className="group flex items-center gap-2 text-[10px] text-[#FA8112]/60 font-bold uppercase tracking-widest hover:text-[#FA8112] transition-all">
          Expand Registry
          <ArrowUpRight
            size={12}
            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="text-[#FAF3E1]/20 text-[9px] uppercase tracking-[0.25em] font-bold bg-[#FAF3E1]/[0.01]">
              <th className="px-8 py-4 border-b border-[#F5E7C6]/5">
                Reference ID
              </th>
              <th className="px-6 py-4 border-b border-[#F5E7C6]/5">
                User Entity
              </th>
              <th className="px-6 py-4 border-b border-[#F5E7C6]/5 text-center">
                Bay ID
              </th>
              <th className="px-6 py-4 border-b border-[#F5E7C6]/5">
                Signal Status
              </th>
              <th className="px-8 py-4 border-b border-[#F5E7C6]/5 text-right">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5E7C6]/5">
            {data.map((b, i) => {
              const status = String(b.status || "").toLowerCase();

              return (
                <tr
                  key={b.id || i}
                  className="hover:bg-[#FAF3E1]/[0.03] transition-all duration-200 group cursor-default"
                >
                  <td className="px-8 py-4 text-xs font-mono font-bold text-[#FA8112]/80 group-hover:text-[#FA8112] transition-colors">
                    <span className="opacity-30 mr-1">#</span>
                    {b.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#FAF3E1]">
                        {b.user}
                      </span>
                      <span className="text-[9px] text-[#FAF3E1]/20 uppercase font-bold tracking-tighter">
                        Verified Client
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 text-[10px] font-mono font-bold text-[#FAF3E1]/60 group-hover:text-[#FAF3E1] transition-colors">
                      {b.slot}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1 h-1 rounded-full animate-pulse ${
                          status === "active"
                            ? "bg-[#FA8112]"
                            : status === "pending"
                              ? "bg-amber-400"
                              : "bg-[#FAF3E1]/20"
                        }`}
                      />
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest ${
                          status === "active"
                            ? "text-[#FA8112]"
                            : status === "pending"
                              ? "text-amber-400"
                              : "text-[#FAF3E1]/30"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[10px] font-medium text-[#FAF3E1]/30 text-right tabular-nums">
                    {b.time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER META */}
      <div className="px-8 py-3 bg-[#FAF3E1]/[0.01] flex justify-center">
        <p className="text-[9px] text-[#FAF3E1]/10 uppercase font-bold tracking-[0.4em]">
          End of Recent Sequence
        </p>
      </div>
    </div>
  );
};

export default RecentBookings;
