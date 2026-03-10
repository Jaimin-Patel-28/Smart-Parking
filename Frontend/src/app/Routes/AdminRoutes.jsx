import { Route } from "react-router-dom";
import AdminLayout from "../../admin-panel/layout/AdminLayout";

import Dashboard from "../../admin-panel/Pages/Dashboard";
import ParkingManagement from "../../admin-panel/Pages/ParkingManager";
import ParkingManager from "../../admin-panel/Pages/ParkingManager";

const Placeholder = ({ title }) => (
  <h1 className="text-2xl font-bold">{title}</h1>
);

const AdminRoutes = () => {
  return (
    <Route path="admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />

      <Route 
      path="parking" 
      element={<ParkingManager />} 
      />

      <Route 
      path="bookings" 
      element={<Placeholder title="Booking Page" />} 
      />
    </Route>
  );
};

export default AdminRoutes;
