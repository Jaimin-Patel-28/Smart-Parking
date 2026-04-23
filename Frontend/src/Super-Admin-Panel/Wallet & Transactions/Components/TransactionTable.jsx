import React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  User,
  ExternalLink,
  Activity,
  Fingerprint,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TransactionTable = ({ transactions, loading }) => {
  const navigate = useNavigate();

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Activity
            size={32}
            className="animate-spin text-[#FA8112]/40"
            strokeWidth={1}
          />
          <div className="absolute inset-0 border border-[#FA8112]/10 rounded-full animate-ping" />
        </div>
        <p className="font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em] text-[9px]">
          Synchronizing Registry Data...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-1.5 px-1">
        <thead>
          <tr className="text-[#FAF3E1]/20 text-[9px] uppercase font-bold tracking-[0.4em]">
            <th className="py-5 px-8">Transaction Origin</th>
            <th className="py-5 px-6">Flow Type</th>
            <th className="py-5 px-6">Settlement Asset</th>
            <th className="py-5 px-6">Node Status</th>
            <th className="py-5 px-6">Sequence Stamp</th>
            <th className="py-5 px-8 text-right">Manifest</th>
          </tr>
        </thead>
        <tbody className="space-y-1">
          {transactions.map((tx) => (
            <tr
              key={tx._id}
              className="group bg-[#FAF3E1]/[0.01] hover:bg-[#FAF3E1]/[0.03] transition-all duration-500 border-y border-[#F5E7C6]/5"
            >
              {/* 1. Entity & Technical ID */}
              <td className="py-6 px-8 rounded-l-lg border-l border-[#F5E7C6]/5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 flex items-center justify-center text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:border-[#FA8112]/20 transition-all duration-500">
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#FAF3E1] text-sm tracking-tight leading-none group-hover:text-[#FA8112] transition-colors">
                      {tx.user?.fullName || "Registry Guest"}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-40">
                      <Fingerprint size={10} className="text-[#FA8112]" />
                      <p className="text-[10px] font-mono tracking-widest uppercase">
                        TX-{tx._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </td>

              {/* 2. Flow Analysis */}
              <td className="py-6 px-6">
                <div
                  className={`inline-flex items-center gap-2 font-bold text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded border ${
                    tx.type === "credit"
                      ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
                      : "text-[#FA8112] bg-[#FA8112]/5 border-[#FA8112]/10"
                  }`}
                >
                  {tx.type === "credit" ? (
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  ) : (
                    <ArrowDownLeft size={12} strokeWidth={2.5} />
                  )}
                  {tx.type}
                </div>
              </td>

              {/* 3. Settlement Amount (Tabular) */}
              <td className="py-6 px-6">
                <p
                  className={`font-bold text-base tabular-nums tracking-tighter ${
                    tx.type === "credit" ? "text-emerald-400" : "text-[#FAF3E1]"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₹
                  {tx.amount.toLocaleString()}
                </p>
              </td>

              {/* 4. Logic Status */}
              <td className="py-6 px-6">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1 w-1 rounded-full ${
                      tx.status === "success"
                        ? "bg-emerald-500 animate-pulse"
                        : tx.status === "failed"
                          ? "bg-rose-500"
                          : "bg-amber-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      tx.status === "success"
                        ? "text-emerald-400/60"
                        : tx.status === "failed"
                          ? "text-rose-400/60"
                          : "text-amber-400/60"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </td>

              {/* 5. Temporal Sequence */}
              <td className="py-6 px-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] font-bold text-[#FAF3E1]/60 tabular-nums">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                    {new Date(tx.createdAt).toLocaleTimeString([], {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    UTC
                  </span>
                </div>
              </td>

              {/* 6. Action Interface */}
              <td className="py-6 px-8 text-right rounded-r-lg border-r border-[#F5E7C6]/5">
                <button
                  onClick={() =>
                    navigate(`/super-admin/transactions/${tx._id}`)
                  }
                  className="p-2 rounded-md bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all group-hover:scale-110"
                  title="Inspect Manifest"
                >
                  <ExternalLink size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
