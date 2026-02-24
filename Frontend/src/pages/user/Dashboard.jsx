import React, { useEffect, useState } from "react";

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
  /* =========================
     SMARTPARK CENTRAL STATE
  ========================== */

  const [smartParkState, setSmartParkState] = useState({
    activeSession: {
      slotId: "P-104",
      location: "Anand Central Mall",
      zone: "Level 2 • Zone B",
      vehicle: "GJ06AB1234",
      sensorStatus: "occupied",
      latency: 14,
      totalDuration: 10800,
      remaining: 9912,
    },

    wallet: {
      balance: 399,
      totalUsage: 1240,
      lastOutflow: 45,
    },

    notifications: [{ id: 1, title: "Session Started", time: Date.now() }],

    bookings: [
      { id: 1, loc: "Anand Central Mall", status: "Completed" },
      { id: 2, loc: "Station Road P1", status: "Pending" },
    ],
  });

  /* =========================
     LIVE TIMER SIMULATION
  ========================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setSmartParkState((prev) => ({
        ...prev,
        activeSession: {
          ...prev.activeSession,
          remaining:
            prev.activeSession.remaining > 0
              ? prev.activeSession.remaining - 1
              : 0,
        },
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const alertInterval = setInterval(() => {
      setSmartParkState((prev) => ({
        ...prev,
        notifications: [
          {
            id: Date.now(),
            title: "Sensor Sync Update",
            time: Date.now(),
          },
          ...prev.notifications.slice(0, 6),
        ],
      }));
    }, 8000);

    return () => clearInterval(alertInterval);
  }, []);

  const analyticsStats = {
    monthlyBookings: smartParkState.bookings.length,
    avgDuration: Math.floor(
      (smartParkState.activeSession.totalDuration -
        smartParkState.activeSession.remaining) /
        3600,
    ),
    walletUsage: smartParkState.wallet.totalUsage,
  };

  return (
    <div className="min-h-dvh bg-[#222222] text-[#FAF3E1] font-sans overflow-x-hidden flex flex-col">
      <main className="relative z-10 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        <SummaryCards
          activeSession={smartParkState.activeSession}
          wallet={smartParkState.wallet}
          bookings={smartParkState.bookings}
        />

        {/* CONTROL ZONE */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
          <div className="xl:col-span-7 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6 xl:p-8 flex flex-col">
            <ActiveParkingStatus activeSession={smartParkState.activeSession} />
          </div>

          <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-[#FA8112] text-[#222222] rounded-[2rem] p-4 sm:p-6">
              <QuickActions />
            </div>

            <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6">
              <WalletSnapshot wallet={smartParkState.wallet} />
            </div>
          </div>
        </section>

        {/* FEED ZONE */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
          <div className="xl:col-span-5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6">
            <Notifications alerts={smartParkState.notifications} />
          </div>

          <div className="xl:col-span-7 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6">
            <BookingOverview bookings={smartParkState.bookings} />
          </div>
        </section>

        {/* ANALYTICS ZONE */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
          <div className="xl:col-span-8 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6 xl:p-8">
            <UsageInsights stats={analyticsStats} />
          </div>

          <div className="xl:col-span-4 flex flex-col gap-4 sm:gap-6">
            <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6">
              <Favorites />
            </div>

            <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-4 sm:p-6">
              <ProfileTips />
            </div>
          </div>
        </section>

        <footer className="pt-6 border-t border-[#F5E7C6]/5">
          <HelpSupport />
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
