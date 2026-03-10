import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  Wallet,
  BarChart3,
  LifeBuoy,
  Settings,
  X,
} from "lucide-react";

// 'closeMobileMenu' is passed from the AdminLayout we created earlier
const AdminSidebar = ({ closeMobileMenu }) => {
  // Operational Logic: Highlighting the active link
  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
    ${
      isActive
        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
        : "text-gray-400 hover:bg-emerald-800/50 hover:text-emerald-100"
    }
  `;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Parking Management",
      path: "/admin/parking",
      icon: <Car size={20} />,
    },
    {
      name: "Booking Management",
      path: "/admin/bookings",
      icon: <CalendarCheck size={20} />,
    },
    {
      name: "User Management",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Wallet & Transactions",
      path: "/admin/wallet",
      icon: <Wallet size={20} />,
    },
    { name: "Reports", path: "/admin/reports", icon: <BarChart3 size={20} /> },
    { name: "Support", path: "/admin/support", icon: <LifeBuoy size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-white overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 flex justify-between items-center border-b border-emerald-900/30">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Smart Parking
          </h2>
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold">
            Admin Engine
          </p>
        </div>

        {/* Close button for Mobile only */}
        <button
          onClick={closeMobileMenu}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={navLinkStyles}
            onClick={closeMobileMenu} // Closes sidebar on mobile after clicking
          >
            <span className="group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding (Optional) */}
      <div className="p-4 border-t border-emerald-900/30">
        <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-800/30 text-center">
          <p className="text-[11px] text-emerald-400/70">v1.2.0 Stable Build</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
