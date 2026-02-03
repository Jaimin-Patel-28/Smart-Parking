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
import UserSidebar from "../../components/sidebar/UserSidebar";

const Dashboard = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 overflow-x-hidden">

      {/* 2. MAIN CONTENT: Standard flex container for a flush, gapless UI */}
      <main className="flex-1 flex flex-col min-w-0 no-scrollbar">
        {/* 3. STICKY HEADER: Added solid 'bg-slate-950' and 'z-40' to prevent overlap */}
        <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-sm border-b border-white/5 px-6 py-5 lg:px-10">
          <DashboardHeader />
        </div>

        {/* 4. CONTENT AREA: Unified padding and spacing */}
        <div className="p-6 lg:p-10 space-y-10">
          <div className="grid grid-cols-12 gap-8 max-w-full">
            {/* TOP STATS */}
            <div className="col-span-12">
              <SummaryCards />
            </div>

            {/* LEFT COLUMN: Operations (8/12) */}
            <div className="col-span-12 lg:col-span-8 space-y-10">
              {/* FIXED: Using 'rounded-3xl' for canonical compliance */}
              <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <ActiveParkingStatus />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <QuickActions />
                <WalletSnapshot />
              </div>

              <div className="bg-white/2 border border-white/5 rounded-3xl p-1 shadow-lg">
                <BookingOverview />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UsageInsights />
                <Favorites />
              </div>
            </div>

            {/* RIGHT COLUMN: Merged Activity Hub (4/12) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* MERGED CONTAINER: Notifications, Tips, and Support in one high-performance card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-10">
                  <Notifications />
                  <hr className="border-white/5" />
                  <ProfileTips />
                  <hr className="border-white/5" />
                  <HelpSupport />
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-20 py-10 border-t border-white/5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
              Powered by MERN • Anand Smart City • 2026
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
