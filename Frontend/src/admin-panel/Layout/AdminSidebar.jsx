import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkClass = "block px-4 py-2 rounded hover:bg-emerald-100 hover:text-gray-600 transition";

  return (
    <div className="w-64 bg-black shadow-md p-5">
      <h2 className="text-xl font-bold mb-6">Smart Parking</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/parking" className={linkClass}>
          Parking Management
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClass}>
          Booking Management
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          User Management
        </NavLink>

        <NavLink to="/admin/wallet" className={linkClass}>
          Wallet & Transactions
        </NavLink>

        <NavLink to="/admin/reports" className={linkClass}>
          Reports
        </NavLink>

        <NavLink to="/admin/support" className={linkClass}>
          Support
        </NavLink>

        <NavLink to="/admin/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
