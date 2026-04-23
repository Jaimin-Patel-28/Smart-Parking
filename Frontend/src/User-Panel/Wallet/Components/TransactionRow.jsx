import React from "react";
import {
  Calendar,
  ArrowDownLeft,
  ArrowUpRight,
  Terminal,
  Activity,
  Hash,
} from "lucide-react";
import { format } from "date-fns";

const TransactionRow = ({ transaction }) => {
  const isCredit = transaction.type === "credit";
  const isSuccess = transaction.status === "success";

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="group relative flex items-center justify-between gap-6 p-5 rounded-xl bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 hover:border-[#FA8112]/30 hover:bg-[#FAF3E1]/[0.02] transition-all duration-500 overflow-hidden shadow-2xl">
      {/* 1. SECTOR ACCENT: Left vertical signal bar */}
      <div
        className={`absolute left-0 top-0 h-full w-[2px] transition-all duration-500 ${isCredit ? "bg-emerald-500/40" : "bg-[#FA8112]/40"} opacity-0 group-hover:opacity-100 shadow-[0_0_10px_currentColor]`}
      />

      <div className="flex items-center gap-5 min-w-0 relative z-10">
        {/* SIGNAL ICON: Technical Housing */}
        <div
          className={`p-3.5 rounded-lg border transition-all duration-500 ${
            isCredit
              ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/10"
              : "bg-[#FA8112]/5 border-[#FA8112]/10 text-[#FA8112] group-hover:bg-[#FA8112]/10"
          }`}
        >
          {isCredit ? (
            <ArrowUpRight size={16} strokeWidth={2.5} />
          ) : (
            <ArrowDownLeft size={16} strokeWidth={2.5} />
          )}
        </div>

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <Terminal size={10} className="text-[#FAF3E1]/10" />
            <p className="text-[13px] font-bold text-[#FAF3E1] uppercase tracking-tight truncate">
              {transaction.description ||
                (isCredit ? "VAULT_INJECTION" : "NODE_ALLOCATION_DEBIT")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#F5E7C6]/5">
              <Hash size={8} className="text-[#FA8112]/40" />
              <span className="text-[9px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                {transaction.booking?._id
                  ? `NODE_${transaction.booking._id.toString().slice(-6).toUpperCase()}`
                  : `HEX_${transaction._id.toString().slice(-8).toUpperCase()}`}
              </span>
            </div>
            {isSuccess && (
              <span className="flex h-1 w-1 rounded-full bg-emerald-500/40 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      <div className="text-right shrink-0 space-y-2 relative z-10">
        <p
          className={`text-lg font-bold tabular-nums tracking-tighter ${isCredit ? "text-emerald-400" : "text-[#FAF3E1]"}`}
        >
          {isCredit ? "+" : "-"} ₹
          {Number(transaction.amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </p>
        <div className="flex items-center justify-end gap-3 text-[9px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-[0.2em]">
          <Activity
            size={10}
            className={isCredit ? "text-emerald-500/20" : "text-[#FA8112]/20"}
          />
          <span>
            {format(new Date(transaction.createdAt), "dd_MMM_yy >> HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
