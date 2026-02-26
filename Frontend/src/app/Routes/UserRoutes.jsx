import { Route } from "react-router-dom";

// Layout
import UserLayout from "../../user-panel/Layout/UserLayout";
import ProtectedRoute from "../../user-panel/Auth/UserProtectedRoute";

// Pages
import Dashboard from "../../user-panel/Pages/Dashboard";
import FindParking from "../../user-panel/Pages/FindParking";
import HelpCenter from "../../user-panel/Pages/HelpCenter";
import MyBookingsPage from "../../user-panel/pages/MyBookingsPage";
import Notifications from "../../user-panel/Pages/Notifications";
import ProfilePage from "../../user-panel/pages/ProfilePage";
import WalletHub from "../../user-panel/Pages/WalletHub";

// Modules

// Bookings
import ActiveBookings from "../../user-panel/Modules/Mybookings/ActiveBookings";
import BookingHistory from "../../user-panel/Modules/Mybookings/BookingHistory";

const UserRoutes = () => {
  return (
    <Route path="user" element={<ProtectedRoute />}>
      <Route element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="profile" element={<ProfilePage />} />

        <Route path="bookings">
          <Route index element={<MyBookingsPage />} />
          <Route path="edit-session" element={<ActiveBookings />} />
          <Route path="history" element={<BookingHistory />} />
        </Route>

        <Route path="find-parking">
          <Route index element={<FindParking />} />
        </Route>
        <Route path="wallet">
          <Route index element={<WalletHub />} />
        </Route>
        <Route path="notifications">
          <Route index element={<Notifications />} />
        </Route>
        <Route path="help">
          <Route index element={<HelpCenter />} />
        </Route>
      </Route>
    </Route>
  );
};

export default UserRoutes;
