import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../admin-panel/Layout/AdminLayout";
import Dashboard from "../../admin-panel/Dashboard/Pages/Dashboard";

// Parking Module
import ParkingList from "../../admin-panel/Parking-Management/Pages/ParkingList";
import AddParking from "../../admin-panel/Parking-Management/Pages/AddParking";
import EditParking from "../../admin-panel/Parking-Management/Pages/EditParking";
import ParkingDetails from "../../admin-panel/Parking-Management/Pages/ParkingDetails";

// Slot Management
import SlotList from "../../admin-panel/Slot-Management/Pages/SlotList";

// Booking Management
import BookingList from "../../admin-panel/Booking-Management/Pages/BookingList";
import BookingDetails from "../../admin-panel/Booking-Management/Pages/BookingDetails";

// User Management
import UserList from "../../admin-panel/User-Management/Pages/UserList";
import UserDetails from "../../admin-panel/User-Management/Pages/UserDetails";

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
        <Route path="slots" element={<ParkingList />} />
        <Route path="slots/:parkingId" element={<SlotList />} />

        {/* Booking Management */}
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id" element={<BookingDetails />} />

        {/* User Management */}
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetails />} />

        {/* Static placeholders for other modules */}
        <Route path="wallet" element={<div>Wallet Page</div>} />
        <Route path="reports" element={<div>Reports Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
