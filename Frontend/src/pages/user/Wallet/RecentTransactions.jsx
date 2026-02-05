import React from "react";
import TransactionItem from "./TransactionItem";
import {
  History,
  ListFilter,
  ArrowRight,
  Activity,
  Sparkles,
} from "lucide-react";

const RecentTransactions = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl backdrop-blur-xl group transition-all duration-500 relative overflow-hidden">
      {/* HEADER: Cinematic metadata for the financial stream */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
            <History size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              Recent Transactions
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
                Financial Ledger Node
              </p>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <Activity size={10} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                  Real-time Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FEED FILTERS */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-400 transition-all group/filter">
            <ListFilter
              size={14}
              className="group-hover/filter:rotate-90 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Filter Ledger
            </span>
          </button>
        </div>
      </div>

      {/* TRANSACTION STACK: Vertical alignment */}
      <div className="space-y-4 relative z-10">
        <TransactionItem
          type="Credit"
          amount="500.00"
          date="05 Feb, 2026"
          time="04:12 PM"
          status="Successful"
          title="Wallet Top-up"
        />
        <TransactionItem
          type="Debit"
          amount="55.00"
          date="04 Feb, 2026"
          time="11:30 AM"
          status="Successful"
          title="Parking Slot P-104"
        />
        <TransactionItem
          type="Debit"
          amount="20.00"
          date="02 Feb, 2026"
          time="09:15 AM"
          status="Successful"
          title="Parking Slot A-22"
        />
      </div>

      {/* VIEW ALL ACTION: Centered at bottom */}
      <div className="mt-12 flex justify-center">
        <button className="flex items-center gap-3 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all group">
          View All Transactions
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
};

export default RecentTransactions;
