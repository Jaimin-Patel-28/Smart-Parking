import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../Super-Admin-Panel/Layout/AdminLayout";
import Dashboard from "../../Super-Admin-Panel/Dashboard/Pages/Dashboard";

// Parking Module
import ParkingList from "../../Super-Admin-Panel/Parking-Management/Pages/ParkingList";
import AddParking from "../../Super-Admin-Panel/Parking-Management/Pages/AddParking";
import EditParking from "../../Super-Admin-Panel/Parking-Management/Pages/EditParking";
import ParkingDetails from "../../Super-Admin-Panel/Parking-Management/Pages/ParkingDetails";

// Slot Management
import SlotList from "../../Super-Admin-Panel/Slot-Management/Pages/SlotList";

// Booking Management
import BookingList from "../../Super-Admin-Panel/Booking-Management/Pages/BookingList";
import BookingDetails from "../../Super-Admin-Panel/Booking-Management/Pages/BookingDetails";

// User Management
import UserList from "../../Super-Admin-Panel/User-Management/Pages/UserList";
import UserDetails from "../../Super-Admin-Panel/User-Management/Pages/UserDetails";
import AddAdmin from "../../Super-Admin-Panel/User-Management/Pages/AddAdmin";
import Profile from "../../Super-Admin-Panel/User-Management/Pages/Profile";

// Wallet & Transaction Management
import WalletOverview from "../../Super-Admin-Panel/Wallet & Transactions/Pages/WalletOverview";
import UserWallets from "../../Super-Admin-Panel/Wallet & Transactions/Pages/UserWallets";
import TransactionHistory from "../../Super-Admin-Panel/Wallet & Transactions/Pages/TransactionHistory";
import TransactionDetails from "../../Super-Admin-Panel/Wallet & Transactions/Pages/TransactionDetails";
import Support from "../../Super-Admin-Panel/Support-Management/Pages/Support";
import Reports from "../../Super-Admin-Panel/Reports/pages/Reports";
import Settings from "../../Super-Admin-Panel/Settings/Pages/Settings";
import Notifications from "../../Super-Admin-Panel/Notifications/Pages/Notifications";
import AuditTrail from "../../Super-Admin-Panel/Audit-Trail/Pages/AuditTrail";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Parking Management */}
        <Route path="parking" element={<ParkingList />} />
        <Route path="parking/add" element={<AddParking />} />
        <Route path="parking/edit/:id" element={<EditParking />} />
        <Route path="parking/details/:id" element={<ParkingDetails />} />

        {/* Slot Management */}
        <Route path="slots" element={<SlotList />} />
        <Route path="slots/:parkingId" element={<SlotList />} />

        {/* Booking Management */}
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id" element={<BookingDetails />} />

        {/* User Management */}
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="create-admin" element={<AddAdmin />} />
        <Route path="profile" element={<Profile />} />

        {/* Wallet & Transaction Management */}
        {/* Main Dashboard for Revenue & Analytics */}
        <Route path="wallet" element={<WalletOverview />} />
        <Route path="wallet/users" element={<UserWallets />} />
        <Route path="wallet/transactions" element={<TransactionHistory />} />
        <Route path="transactions/:id" element={<TransactionDetails />} />

        {/* Additional modules */}
        <Route path="reports" element={<Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="audit-trail" element={<AuditTrail />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
