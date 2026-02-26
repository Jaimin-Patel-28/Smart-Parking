import { Route } from "react-router-dom";
import AdminLayout from "../../admin-panel/layout/AdminLayout";

const Placeholder = ({ title }) => (
  <h1 className="text-2xl font-bold">{title}</h1>
);

const AdminRoutes = () => {
  return (
    <Route path="admin" element={<AdminLayout />}>
      <Route
        path="dashboard"
        element={<Placeholder title="Dashboard Page" />}
      />

      <Route 
      path="parking" 
      element={<Placeholder title="Parking Page" />} 
      />

      <Route 
      path="bookings" 
      element={<Placeholder title="Booking Page" />} 
      />
    </Route>
  );
};

export default AdminRoutes;
