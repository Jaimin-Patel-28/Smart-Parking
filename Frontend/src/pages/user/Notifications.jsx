import NotificationsHeader from "./Notifications/NotificationsHeader";
import NotificationsSummary from "./Notifications/NotificationsSummary";
import NotificationsFilters from "./Notifications/NotificationsFilters";
import NotificationsList from "./Notifications/NotificationsList";
import BookingNotifications from "./Notifications/BookingNotifications";
import WalletNotifications from "./Notifications/WalletNotifications";
import SystemNotifications from "./Notifications/SystemNotifications";
import NotificationDetails from "./Notifications/NotificationDetails";
import NotificationPreferencesShortcut from "./Notifications/NotificationPreferencesShortcut";
import NotificationsEmptyState from "./Notifications/NotificationsEmptyState";
import NotificationsErrorState from "./Notifications/NotificationsErrorState";
import NotificationsSupport from "./Notifications/NotificationsSupport";

const Notifications = () => {
  return (
    <>
      <NotificationsHeader />
      <NotificationsSummary />
      <NotificationsFilters />
      <NotificationsList />
      <BookingNotifications />
      <WalletNotifications />
      <SystemNotifications />
      <NotificationDetails />
      <NotificationPreferencesShortcut />
      <NotificationsEmptyState />
      <NotificationsErrorState />
      <NotificationsSupport />
    </>
  );
};

export default Notifications;
