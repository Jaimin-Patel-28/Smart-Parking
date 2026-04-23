import React from "react";
import TransactionRow from "./TransactionRow";
import { Database, Loader2, Activity } from "lucide-react";

const TransactionList = ({ transactions, loading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  if (loading) {
    return (
      <div className="space-y-3 px-1">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-20 rounded-xl bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 relative overflow-hidden"
          >
            {/* High-Intensity Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF3E1]/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-[#FAF3E1]/5 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-[#FAF3E1]/5 rounded" />
                  <div className="h-2 w-20 bg-[#FAF3E1]/5 rounded" />
                </div>
              </div>
              <div className="h-6 w-16 bg-[#FAF3E1]/5 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/5 rounded-xl mx-1 group">
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#F5E7C6]/5 text-[#FAF3E1]/5 mb-6 group-hover:text-[#FA8112]/20 transition-colors duration-700">
          <Database size={40} strokeWidth={1} />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
            Zero_Signals_Detected
          </p>
          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/5">
            Registry_Archive_Empty
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 opacity-10">
          <Activity size={12} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-1 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      {transactions.map((transaction) => (
        <TransactionRow key={transaction._id} transaction={transaction} />
      ))}

      {/* Registry Sentinel */}
      <div className="flex items-center justify-center pt-8 opacity-10">
        <p className="text-[8px] font-mono font-bold uppercase tracking-[0.6em]">
          End_of_Registry_Ledger
        </p>
      </div>
    </div>
  );
};

export default TransactionList;
