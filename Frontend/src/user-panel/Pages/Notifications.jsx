import NotificationsHeader from "../Modules/Notifications/NotificationsHeader";
import NotificationsSummary from "../Modules/Notifications/NotificationsSummary";
import NotificationsFilters from "../Modules/Notifications/NotificationsFilters";
import NotificationsList from "../Modules/Notifications/NotificationsList";
import BookingNotifications from "../Modules/Notifications/BookingNotifications";
import WalletNotifications from "../Modules/Notifications/WalletNotifications";
import SystemNotifications from "../Modules/Notifications/SystemNotifications";
import NotificationDetails from "../Modules/Notifications/NotificationDetails";
import NotificationPreferencesShortcut from "../Modules/Notifications/NotificationPreferencesShortcut";
import NotificationsEmptyState from "../Modules/Notifications/NotificationsEmptyState";
import NotificationsErrorState from "../Modules/Notifications/NotificationsErrorState";
import NotificationsSupport from "../Modules/Notifications/NotificationsSupport";

const Notifications = () => {
  // Mock state for Viva demonstration
  const hasNotifications = true;
  const hasError = false;

  return (
    <main className="min-h-screen bg-[#FAF3E1] p-4 md:p-8 lg:p-12 antialiased selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      <div className="max-w-screen-2xl mx-auto space-y-10">
        {/* 1. TOP BAR: Branding & Status */}
        <div className="relative z-10">
          <NotificationsHeader />
        </div>

        {/* 2. ANALYTICS ROW: Quick Stats */}
        <section className="grid grid-rows-1 md:grid-rows-1 gap-6">
          <NotificationsSummary />
          {/* You can nest specific types here or keep them as global logic */}
          <BookingNotifications />
          <WalletNotifications />
        </section>

        {/* 3. MAIN INTERACTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: The Feed (8/12 units) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-2 shadow-sm">
              <NotificationsFilters />

              <div className="p-6">
                {hasError ? (
                  <NotificationsErrorState />
                ) : !hasNotifications ? (
                  <NotificationsEmptyState />
                ) : (
                  <NotificationsList />
                )}
              </div>
            </div>

            {/* Detailed View (Optional toggle based on state) */}
            <div className="bg-[#F5E7C6] rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-inner">
              <NotificationDetails />
            </div>
          </div>

          {/* RIGHT COLUMN: Utilities & Support (4/12 units) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm sticky top-8">
              <h3 className="text-[#222222] font-black text-xl mb-6 tracking-tight flex items-center gap-2">
                System Status
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </h3>

              <SystemNotifications />

              <div className="my-10 border-t-2 border-[#FAF3E1]" />

              <NotificationPreferencesShortcut />

              <div className="mt-10">
                <NotificationsSupport />
              </div>
            </div>
          </aside>
        </div>

        {/* 4. FOOTER: Project Signature */}
        <footer className="pt-12 border-t-2 border-[#222222]/5 text-center">
          <p className="text-[#222222]/20 text-[10px] font-black uppercase tracking-[0.4em]">
            SmartPark Activity Hub &bull; Anand Smart City &bull; 2026
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Notifications;
