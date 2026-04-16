import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Layers,
  CalendarCheck,
  Users,
  Wallet,
  BarChart3,
  Activity,
  LifeBuoy,
  Settings,
  X,
} from "lucide-react";

const AdminSidebar = ({ closeMobileMenu }) => {
  // Theme Variables
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112

  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
    ${
      isActive
        ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20 font-bold"
        : "text-[#FAF3E1]/50 hover:bg-[#FAF3E1]/[0.05] hover:text-[#FAF3E1]"
    }
  `;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/super-admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Parking Management",
      path: "/super-admin/parking",
      icon: <Car size={20} />,
    },
    {
      name: "Slot Management",
      path: "/super-admin/slots",
      icon: <Layers size={20} />,
    },
    {
      name: "Booking Management",
      path: "/super-admin/bookings",
      icon: <CalendarCheck size={20} />,
    },
    {
      name: "User Management",
      path: "/super-admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Wallet & Transactions",
      path: "/super-admin/wallet",
      icon: <Wallet size={20} />,
    },
    {
      name: "Reports",
      path: "/super-admin/reports",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Audit Trail",
      path: "/super-admin/audit-trail",
      icon: <Activity size={20} />,
    },
    {
      name: "Support",
      path: "/super-admin/support",
      icon: <LifeBuoy size={20} />,
    },
    {
      name: "Settings",
      path: "/super-admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#222222] text-[#FAF3E1] overflow-y-auto border-r border-[#F5E7C6]/10">
      {/* Sidebar Header */}
      <div className="p-6 flex justify-between items-center border-b border-[#F5E7C6]/10">
        <div>
          <h2 className="text-xl font-black tracking-tight text-[#FAF3E1]">
            Smart <span className="text-[#FA8112]">Parking</span>
          </h2>
          <p className="text-[10px] text-[#FA8112] uppercase tracking-[0.2em] font-black mt-0.5">
            Admin Engine
          </p>
        </div>

        <button
          onClick={closeMobileMenu}
          className="lg:hidden text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={navLinkStyles}
            onClick={closeMobileMenu}
          >
            <span className="transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
              {item.icon}
            </span>
            <span className="text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding */}
      <div className="p-4 border-t border-[#F5E7C6]/10">
        <div className="bg-[#FAF3E1]/2 p-3 rounded-xl border border-[#F5E7C6]/5 text-center">
          <p className="text-[11px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">
            v1.2.0 Stable Build
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
