import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import SummaryCards from "./dashboard/SummaryCards";
import ActiveParkingStatus from "./dashboard/ActiveParkingStatus";
import QuickActions from "./dashboard/QuickActions";
import BookingOverview from "./dashboard/BookingOverview";
import WalletSnapshot from "./dashboard/WalletSnapshot";
import Notifications from "./dashboard/Notifications";
import UsageInsights from "./dashboard/UsageInsights";
import Favorites from "./dashboard/Favorites";
import ProfileTips from "./dashboard/ProfileTips";
import HelpSupport from "./dashboard/HelpSupport";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 overflow-x-hidden">
      <main className="flex-1 flex flex-col min-w-0 no-scrollbar">
        {/* STICKY HEADER: Stays consistent across all layouts */}
        <div className="sticky top-0 z-40 bg-slate-950/95 border-b border-white/5 px-6 py-4 lg:px-12">
          <DashboardHeader />
        </div>

        {/* MAIN CONTENT AREA: Following your exact wireframe stack */}
        <div className="p-6 lg:p-12 max-w-400 mx-auto w-full space-y-8 lg:space-y-10">
          {/* 1. TOP STATS: Four cards in a row */}
          <div className="w-full">
            <SummaryCards />
          </div>

          {/* 2. ACTIVE PARKING: Full width operational status */}
          <div className="w-full bg-white/2 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <ActiveParkingStatus />
          </div>

          {/* 3. SPLIT ROW: Wallet (Left) & Favorites (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <WalletSnapshot />
            <Favorites />
          </div>

          {/* 4. BOOKING OVERVIEW: Full width data view */}
          <div className="w-full bg-white/2 border border-white/5 rounded-3xl p-1 shadow-lg">
            <BookingOverview />
          </div>

          {/* 5. SPLIT ROW: Quick Actions (Left) & Notifications (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <QuickActions />
            <Notifications />
          </div>

          {/* 6. PROFILE TIPS: Full width helpful insights */}
          <div className="w-full">
            <ProfileTips />
          </div>

          {/* 7. USAGE INSIGHTS: High-density data charts */}
          <div className="w-full">
            <UsageInsights />
          </div>

          {/* 8. HELP & SUPPORT: Footer actions */}
          <div className="w-full">
            <HelpSupport />
          </div>

          <footer className="mt-12 py-10 border-t border-white/5 text-center opacity-30">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-700">
              Powered by MERN • Anand Smart City • 2026
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
