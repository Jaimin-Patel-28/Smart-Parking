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


const Dashboard = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 overflow-x-hidden">
      {/* 2. MAIN CONTENT: flex-1 ensures a flush UI against the sidebar */}
      <main className="flex-1 flex flex-col min-w-0 no-scrollbar">
        {/* 3. STICKY HEADER: High Z-Index and responsive padding */}
        <div className="sticky top-0 z-40 bg-slate-950/95 border-b border-white/5 px-4 md:px-8 lg:px-12 py-4">
          <DashboardHeader />
        </div>

        {/* 4. CONTENT AREA: Responsive padding and dynamic gaps */}
        <div className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12">
          {/* 5. RESPONSIVE GRID: 1 column on mobile, 12 columns on large screens */}
          <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-12 max-w-full">
            {/* TOP STATS: Always full width, but grid inside SummaryCards will handle mobile stacking */}
            <div className="col-span-12">
              <SummaryCards />
            </div>

            {/* LEFT COLUMN: Operations (Full width on mobile/tablet, 8/12 on large screens) */}
            <div className="col-span-12 lg:col-span-8 space-y-8 md:space-y-12">
              <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <ActiveParkingStatus />
              </div>

              {/* GRID FOR NESTED CARDS: Stacks vertically on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
                <QuickActions />
                <WalletSnapshot />
              </div>

              <div className="bg-white/2 border border-white/5 rounded-3xl p-1 shadow-lg">
                <BookingOverview />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
                <UsageInsights />
                <Favorites />
              </div>
            </div>

            {/* RIGHT COLUMN: Activity Hub (Stacks below content on mobile/tablet) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                {/* MERGED CONTAINER: Adjusts padding based on screen size */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl space-y-10 md:space-y-12">
                  <Notifications />
                  <hr className="border-white/5" />
                  <ProfileTips />
                  <hr className="border-white/5" />
                  <HelpSupport />
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-12 md:mt-20 py-10 border-t border-white/5 text-center opacity-30">
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
