// import React from "react";
// import ProfileHeader from "./Profile/ProfileHeader";
// import PersonalInfo from "./Profile/PersonalInfo";
// import AccountSecurity from "./Profile/AccountSecurity";
// import NotificationPreferences from "./Profile/NotificationPreferences";
// import WalletInfo from "./Profile/WalletInfo";
// import AccountActivity from "./Profile/AccountActivity";
// import Preferences from "./Profile/Preferences";
// import DataPrivacy from "./Profile/DataPrivacy";
// import DangerZone from "./Profile/DangerZone";
// import VehicleInfo from "./Profile/VehicalInfo";

// const ProfilePage = () => {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
//       {/* 1. HERO SECTION: Full width for impact */}
//       <div className="mb-12">
//         <ProfileHeader />
//       </div>

//       {/* 2. MAIN RESPONSIVE GRID: 12-column system for maximum flexibility */}
//       <main className="max-w-400 mx-auto p-4 md:p-8 lg:p-12">
//         <div className="grid grid-cols-12 gap-8 md:gap-10 lg:gap-12">

//           {/* LEFT COLUMN: Primary Information (8/12 on Desktop) */}
//           <div className="col-span-12 lg:col-span-8 space-y-8 md:space-y-12">

//             {/* PERSONAL & VEHICLE SECTION: Content-rich grouping */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
//               <PersonalInfo />
//               <VehicleInfo />
//             </div>

//             {/* SECURITY & PRIVACY: High-performance cards */}
//             <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
//               <AccountSecurity />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
//               <DataPrivacy />
//               <Preferences />
//             </div>

//             {/* DANGER ZONE: Isolated at bottom for safety */}
//             <DangerZone />
//           </div>

//           {/* RIGHT COLUMN: Activity & Finance (4/12 on Desktop) */}
//           <div className="col-span-12 lg:col-span-4 space-y-8 md:space-y-12">

//             {/* STICKY CARDS: These stay visible as user scrolls primary info */}
//             <div className="lg:sticky lg:top-12 space-y-8 md:space-y-12">
//               <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-1 shadow-2xl">
//                 <WalletInfo />
//               </div>

//               <div className="bg-white/5 border border-white/10 rounded-3xl p-2 shadow-2xl">
//                 <NotificationPreferences />
//               </div>

//               <AccountActivity />
//             </div>
//           </div>
//         </div>

//         {/* FOOTER BRANDING: Minimalist and clean */}
//         <footer className="mt-20 py-10 border-t border-white/5 text-center opacity-20">
//           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
//             Anand Smart City • Identity Management Node • 2026
//           </p>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;

import React from "react";
import ProfileHeader from "./Profile/ProfileHeader";
import PersonalInfo from "./Profile/PersonalInfo";
import VehicleInfo from "./Profile/VehicalInfo";
import AccountSecurity from "./Profile/AccountSecurity";
import WalletInfo from "./Profile/WalletInfo";
import NotificationPreferences from "./Profile/NotificationPreferences";
import AccountActivity from "./Profile/AccountActivity";
import DataPrivacy from "./Profile/DataPrivacy";
import Preferences from "./Profile/Preferences";
import DangerZone from "./Profile/DangerZone";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* HEADER: Full Width */}
      <ProfileHeader />

      <main className="max-w-400 mx-auto p-6 lg:p-12 space-y-10 lg:space-y-12">
        {/* ROW 1: Personal Info (Full Width) */}
        <section className="w-full">
          <PersonalInfo />
        </section>

        {/* ROW 2: Vehicle Info (Full Width) */}
        <section className="w-full">
          <VehicleInfo />
        </section>

        {/* ROW 3: Security (Left) & Wallet (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-8">
            <AccountSecurity />
          </div>
          <div className="lg:col-span-4">
            <WalletInfo />
          </div>
        </div>

        {/* ROW 4: Notifications (Left) & Activity (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-6">
            <NotificationPreferences />
          </div>
          <div className="lg:col-span-6">
            <AccountActivity />
          </div>
        </div>

        {/* ROW 5: Privacy (Left) & Preferences (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-6">
            <DataPrivacy />
          </div>
          <div className="lg:col-span-6">
            <Preferences />
          </div>
        </div>

        {/* ROW 6: Danger Zone (Full Width) */}
        <section className="w-full pt-4">
          <DangerZone />
        </section>

        {/* FOOTER */}
        <footer className="mt-20 py-10 border-t border-white/5 text-center opacity-20">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
            Anand Smart City • Identity Management Node • 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ProfilePage;
