import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../../Admin-Panel/Layout/AdminLayout";
import Dashboard from "../../Super-Admin-Panel/Dashboard/Pages/Dashboard";

// 🔥 IMPORTANT: Use Admin Panel Booking (NOT super admin one)
import BookingList from "../../Admin-Panel/Booking-Management/Pages/BookingList";
import BookingDetails from "../../Admin-Panel/Booking-Management/Pages/BookingDetails";
import TicketVerification from "../../Admin-Panel/Gate-Operations/Pages/TicketVerification";
import EntryDesk from "../../Admin-Panel/Gate-Operations/Pages/EntryDesk";
import ExitDesk from "../../Admin-Panel/Gate-Operations/Pages/ExitDesk";
import Exceptions from "../../Admin-Panel/Gate-Operations/Pages/Exceptions";
import Profile from "../../Admin-Panel/Pages/Profile";
import Support from "../../Admin-Panel/Pages/Support";
import ShiftSummary from "../../Admin-Panel/Shift-Summary/Pages/ShiftSummary";

const StaffAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Booking Management (ONLY FEATURE) */}
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id" element={<BookingDetails />} />
        <Route path="ticket-verification" element={<TicketVerification />} />
        <Route path="entry-desk" element={<EntryDesk />} />
        <Route path="exit-desk" element={<ExitDesk />} />
        <Route path="exceptions" element={<Exceptions />} />
        <Route path="shift-summary" element={<ShiftSummary />} />
        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />

      </Route>
    </Routes>
  );
};

export default StaffAdminRoutes;