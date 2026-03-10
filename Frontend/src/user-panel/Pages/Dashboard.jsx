// import React, { useEffect, useState } from "react";

// import SummaryCards from "../Modules/dashboard/SummaryCards";
// import ActiveParkingStatus from "../Modules/dashboard/ActiveParkingStatus";
// import QuickActions from "../Modules/dashboard/QuickActions";
// import BookingOverview from "../Modules/dashboard/BookingOverview";
// import WalletSnapshot from "../Modules/dashboard/WalletSnapshot";
// import Notifications from "../Modules/dashboard/Notifications";
// import UsageInsights from "../Modules/dashboard/UsageInsights";
// import Favorites from "../Modules/dashboard/Favorites";
// import ProfileTips from "../Modules/dashboard/ProfileTips";
// import HelpSupport from "../Modules/dashboard/HelpSupport";

// const Dashboard = () => {
//   /* =========================
//      SMARTPARK CENTRAL STATE
//   ========================== */

//   const [smartParkState, setSmartParkState] = useState({
//     activeSession: {
//       slotId: "P-104",
//       location: "Anand Central Mall",
//       zone: "Level 2 • Zone B",
//       vehicle: "GJ06AB1234",
//       sensorStatus: "occupied",
//       latency: 14,
//       totalDuration: 10800,
//       remaining: 9912,
//     },

//     wallet: {
//       balance: 399,
//       totalUsage: 1240,
//       lastOutflow: 45,
//     },

//     notifications: [{ id: 1, title: "Session Started", time: Date.now() }],

//     bookings: [
//       { id: 1, loc: "Anand Central Mall", status: "Completed" },
//       { id: 2, loc: "Station Road P1", status: "Pending" },
//     ],
//   });

//   /* =========================
//      LIVE TIMER SIMULATION
//   ========================== */

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSmartParkState((prev) => ({
//         ...prev,
//         activeSession: {
//           ...prev.activeSession,
//           remaining:
//             prev.activeSession.remaining > 0
//               ? prev.activeSession.remaining - 1
//               : 0,
//         },
//       }));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const alertInterval = setInterval(() => {
//       setSmartParkState((prev) => ({
//         ...prev,
//         notifications: [
//           {
//             id: Date.now(),
//             title: "Sensor Sync Update",
//             time: Date.now(),
//           },
//           ...prev.notifications.slice(0, 6),
//         ],
//       }));
//     }, 8000);

//     return () => clearInterval(alertInterval);
//   }, []);

//   const analyticsStats = {
//     monthlyBookings: smartParkState.bookings.length, //monthly booking count
//     avgDuration: Math.floor((smartParkState.activeSession.totalDuration - smartParkState.activeSession.remaining) / 3600,), //average session duration in hours
//     walletUsage: smartParkState.wallet.totalUsage, //total wallet outflow
//   };

//   return (
//     <div className="min-h-dvh bg-[#222222] text-[#FAF3E1] font-sans overflow-x-hidden flex flex-col">
//       <main className="relative z-10 w-full max-w-500 mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
//         <SummaryCards
//           activeSession={smartParkState.activeSession}
//           wallet={smartParkState.wallet}
//           bookings={smartParkState.bookings}
//         />

//         {/* CONTROL ZONE */}
//         <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
//           <div className="xl:col-span-7 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6 xl:p-8 flex flex-col">
//             <ActiveParkingStatus activeSession={smartParkState.activeSession} />
//           </div>

//           <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
//             <div className="bg-[#FA8112] text-[#222222] rounded-4xl p-4 sm:p-6">
//               <QuickActions />
//             </div>

//             <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6">
//               <WalletSnapshot wallet={smartParkState.wallet} />
//             </div>
//           </div>
//         </section>

//         {/* FEED ZONE */}
//         <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
//           <div className="xl:col-span-5 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6">
//             <Notifications alerts={smartParkState.notifications} />
//           </div>

//           <div className="xl:col-span-7 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6">
//             <BookingOverview bookings={smartParkState.bookings} />
//           </div>
//         </section>

//         {/* ANALYTICS ZONE */}
//         <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
//           <div className="xl:col-span-8 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6 xl:p-8">
//             <UsageInsights stats={analyticsStats} />
//           </div>

//           <div className="xl:col-span-4 flex flex-col gap-4 sm:gap-6">
//             <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6">
//               <Favorites />
//             </div>

//             <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-4 sm:p-6">
//               <ProfileTips />
//             </div>
//           </div>
//         </section>

//         <footer className="pt-6 border-t border-[#F5E7C6]/5">
//           <HelpSupport />
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
// Lucide icons to match the Find Parking UI
import { ShieldCheck, Activity, LayoutDashboard, Zap } from "lucide-react";

// Components (Assuming they are in the same folder structure)
import SummaryCards from "../Modules/dashboard/SummaryCards";
import ActiveParkingStatus from "../Modules/dashboard/ActiveParkingStatus";
import QuickActions from "../Modules/dashboard/QuickActions";
import BookingOverview from "../Modules/dashboard/BookingOverview";
import WalletSnapshot from "../Modules/dashboard/WalletSnapshot";
import Notifications from "../Modules/dashboard/Notifications";
import UsageInsights from "../Modules/dashboard/UsageInsights";
import Favorites from "../Modules/dashboard/Favorites";
import ProfileTips from "../Modules/dashboard/ProfileTips";
import HelpSupport from "../Modules/dashboard/HelpSupport";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-[#FAF3E1] p-4 md:p-8 font-sans selection:bg-[#FA8112]/30">
      {/* --- HEADER SECTION --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-[#FA8112]/20 rounded-md">
              <ShieldCheck size={16} className="text-[#FA8112]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FA8112]/60">
              Anand Smart City • Secure Node
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter">
            Smart<span className="text-[#FA8112]">Park</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-sm max-w-md leading-relaxed">
            Monitoring real-time sensor nodes and optimizing urban parking
            efficiency.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#FA8112] animate-pulse" />
            <small className="text-[10px] uppercase tracking-widest opacity-40">
              System Integrity
            </small>
          </div>
          <code className="text-[#FA8112] font-mono text-xs font-bold tracking-wider">
            LATEST STABLE // 2.0.26
          </code>
        </div>
      </header>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT & CENTER COLUMN (8 Units) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Node: Summary Metrics */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            < SummaryCards/>
          </section>

          {/* Node: Active Real-time Status */}
          <section className="bg-[#222222]/50 border border-[#F5E7C6]/10 rounded-[2.5rem] p-1 overflow-hidden">
            <ActiveParkingStatus />
          </section>

          {/* Node: Historical Data */}
          <section>
            <BookingOverview />
          </section>

          {/* Node: Analytics */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UsageInsights />
            <Favorites />
          </section>
        </div>

        {/* RIGHT SIDEBAR (4 Units) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-8 space-y-6">
            <WalletSnapshot />
            <QuickActions />
            <Notifications />
            <ProfileTips />
          </div>
        </aside>
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#F5E7C6]/5 flex flex-col md:flex-row justify-between items-center gap-8 pb-10">
        <HelpSupport />
        <div className="text-right flex flex-col gap-1">
          <small className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/20">
            Integrated Software Solutions
          </small>
          <small className="text-[#FAF3E1]/40 text-xs font-medium">
            © 2026 SmartPark Dashboard • V2.0.26
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
