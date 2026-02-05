import React from "react";
import WalletHeader from "./Wallet/WalletHeader";
import WalletOverview from "./wallet/WalletOverview";
import WalletQuickActions from "./wallet/WalletQuickActions";
import AddMoney from "./wallet/AddMoney";
import TransactionSummary from "./wallet/TransactionSummary";
import RecentTransactions from "./wallet/RecentTransactions";
import LinkedPaymentInfo from "./wallet/LinkedPaymentInfo";
import WalletInsights from "./wallet/WalletInsights";
import WalletRules from "./wallet/WalletRules";
import WalletNotifications from "./wallet/WalletNotifications";
import WalletEmptyState from "./wallet/WalletEmptyState";
import WalletErrorState from "./wallet/WalletErrorState";
import WalletSupport from "./wallet/WalletSupport";

const WalletHub = () => {
  const hasTransactions = true; // State toggle for Empty/Error views

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      {/* 1. HEADER: Fixed navigation node */}
      <WalletHeader />

      <main className="max-w-400 mx-auto p-6 lg:p-12 space-y-10 lg:space-y-14">
        {/* STAGE 1: ASSET OVERVIEW (Balance & Actions) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8">
            <WalletOverview />
          </div>
          <div className="lg:col-span-4">
            <WalletQuickActions />
          </div>
        </section>

        {/* STAGE 2: TRANSACTION ENGINE (Split 7:5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Ledger (Left 7/12) */}
          <div className="lg:col-span-7 space-y-10">
            {hasTransactions ? (
              <>
                <AddMoney />
                <RecentTransactions />
              </>
            ) : (
              <div className="space-y-8">
                <WalletEmptyState />
                <WalletErrorState />
              </div>
            )}
          </div>

          {/* Financial Intelligence (Right 5/12) */}
          <aside className="lg:col-span-5 space-y-10">
            <div className="lg:sticky lg:top-32 space-y-10">
              <TransactionSummary />
              <div className="bg-emerald-500/2 border border-emerald-500/10 rounded-3xl p-1">
                <WalletInsights />
              </div>
              <LinkedPaymentInfo />
            </div>
          </aside>
        </div>

        {/* STAGE 3: GOVERNANCE & FEEDBACK */}
        <section className="pt-10 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-8">
            <WalletRules />
            <WalletSupport />
          </div>
          <div className="bg-blue-600/2 border border-blue-500/10 rounded-[2.5rem] p-1">
            <WalletNotifications />
          </div>
        </section>

        <footer className="py-12 text-center opacity-20">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700">
            Smart Wallet • Anand City Financial Node • 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default WalletHub;
