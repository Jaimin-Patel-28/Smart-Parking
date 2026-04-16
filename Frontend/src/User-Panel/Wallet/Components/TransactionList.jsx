import React from "react";
import TransactionRow from "./TransactionRow";

const TransactionList = ({ transactions, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-20 rounded-[1.5rem] bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10"
          />
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="py-20 text-center bg-[#FAF3E1]/[0.02] border border-dashed border-[#F5E7C6]/10 rounded-[2rem]">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20">
          No transactions found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionRow key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
