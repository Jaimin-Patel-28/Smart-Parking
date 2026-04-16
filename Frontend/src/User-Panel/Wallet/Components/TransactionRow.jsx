import React from "react";
import { Calendar, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

const TransactionRow = ({ transaction }) => {
  const isCredit = transaction.type === "credit";

  return (
    <div className="flex items-center justify-between gap-4 p-5 rounded-[1.5rem] bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 hover:border-[#FA8112]/20 transition-all">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`p-3 rounded-xl ${isCredit ? "bg-cyan-400/10 text-cyan-400" : "bg-[#FA8112]/10 text-[#FA8112]"}`}>
          {isCredit ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black text-[#FAF3E1] truncate">
            {transaction.description || (isCredit ? "Wallet Credit" : "Wallet Debit")}
          </p>
          <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-[0.2em] truncate mt-1">
            {transaction.booking?._id ? `Booking ${transaction.booking._id.toString().slice(-6).toUpperCase()}` : transaction._id.toString().slice(-8).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-sm font-black ${isCredit ? "text-cyan-400" : "text-[#FAF3E1]"}`}>
          {isCredit ? "+" : "-"}₹{Number(transaction.amount || 0).toLocaleString()}
        </p>
        <div className="flex items-center justify-end gap-2 text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-widest mt-1">
          <Calendar size={11} className="text-[#FA8112]" />
          {format(new Date(transaction.createdAt), "dd MMM yyyy, HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
