import React from "react";
import DashboardNavbar from "./dashboard/DashboardNavbar";
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
    <div className="min-h-screen bg-[#FAF3E1] text-[#222222]">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Page Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 space-y-12">
        {/* Page Heading */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Manage your bookings, payments and parking activity.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Active Parking - Highlight Section */}
        <section className="bg-[#222222] text-white rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FA8112]" />
          <ActiveParkingStatus />
        </section>

        {/* Quick + Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickActions />
          <Favorites />
        </div>

        {/* Booking Overview */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
          <BookingOverview />
        </section>

        {/* Wallet + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WalletSnapshot />
          <Notifications />
        </div>

        {/* Profile Tips */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
          <ProfileTips />
        </section>

        {/* Usage Insights */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
          <UsageInsights />
        </section>

        {/* Help Support */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
          <HelpSupport />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
