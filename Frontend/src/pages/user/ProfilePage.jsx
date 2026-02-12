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
