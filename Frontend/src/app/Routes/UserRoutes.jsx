import { Route } from "react-router-dom";

// Layout
import UserLayout from "../../user-panel/Layout/UserLayout";
import ProtectedRoute from "../../user-panel/Auth/UserProtectedRoute";

// Pages
import Dashboard from "../../user-panel/Pages/Dashboard";
import FindParking from "../../user-panel/Pages/FindParking"; // This will be your Parent Container
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

        <Route path="my-bookings">
          <Route index element={<MyBookingsPage />} />
          <Route path="edit-session" element={<ActiveBookings />} />
          <Route path="history" element={<BookingHistory />} />
        </Route>

        {/* --- FIND PARKING NODE SYSTEM START --- */}
        <Route path="find-parking">
          {/* Index route: Node 1 (Search) */}
          <Route index element={<FindParking />} />

          {/* Node 2: Discovery/Results */}
          <Route path="results" element={<FindParking />} />

          {/* Node 3: Slot Selection */}
          <Route path="select-slot" element={<FindParking />} />

          {/* Node 5: Checkout/Actions */}
          <Route path="checkout" element={<FindParking />} />

          {/* Final Node: Confirmation */}
          <Route path="success" element={<FindParking />} />
        </Route>
        {/* --- FIND PARKING NODE SYSTEM END --- */}

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
