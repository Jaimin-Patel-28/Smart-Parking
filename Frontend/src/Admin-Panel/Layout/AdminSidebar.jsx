import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import { getOperationalAlerts } from "../Gate-Operations/Services/gateService";
import {
  LayoutDashboard,
  Car,
  Layers,
  CalendarCheck,
  ScanLine,
  LogIn,
  LogOut,
  AlertTriangle,
  Users,
  Wallet,
  BarChart3,
  BarChart2,
  User,
  LifeBuoy,
  Settings,
  X,
} from "lucide-react";

const AdminSidebar = ({ closeMobileMenu }) => {
  const { user } = useAuth();
  const [alertCount, setAlertCount] = useState(0);

  const basePath = user?.role === "admin" ? "/admin" : "/super-admin";

  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
    ${
      isActive
        ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20 font-bold"
        : "text-[#FAF3E1]/50 hover:bg-[#FAF3E1]/[0.05] hover:text-[#FAF3E1]"
    }
  `;

  useEffect(() => {
    let active = true;

    const loadAlerts = async () => {
      if (user?.role !== "admin") {
        return;
      }

      try {
        const res = await getOperationalAlerts();
        if (active) {
          setAlertCount(res?.data?.total || 0);
        }
      } catch {
        if (active) {
          setAlertCount(0);
        }
      }
    };

    loadAlerts();
    const timer = setInterval(loadAlerts, 60000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [user?.role]);

  // 🔥 Dynamic Menu
  const menuItems = [
    {
      name: "Dashboard",
      path: `${basePath}/dashboard`,
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Booking Management",
      path: `${basePath}/bookings`,
      icon: <CalendarCheck size={20} />,
    },
    {
      name: "Ticket Verification",
      path: `${basePath}/ticket-verification`,
      icon: <ScanLine size={20} />,
    },
    {
      name: "Entry Desk",
      path: `${basePath}/entry-desk`,
      icon: <LogIn size={20} />,
    },
    {
      name: "Exit Desk",
      path: `${basePath}/exit-desk`,
      icon: <LogOut size={20} />,
    },
    ...(user?.role === "admin"
      ? [
          {
            name: "Exceptions",
            path: `${basePath}/exceptions`,
            icon: <AlertTriangle size={20} />,
            badge: alertCount,
          },
          {
            name: "Shift Summary",
            path: `${basePath}/shift-summary`,
            icon: <BarChart2 size={20} />,
          },
        ]
      : []),

    // 🔥 Only Super Admin
    ...(user?.role === "super-admin"
      ? [
          {
            name: "Parking Management",
            path: `${basePath}/parking`,
            icon: <Car size={20} />,
          },
          {
            name: "Slot Management",
            path: `${basePath}/slots`,
            icon: <Layers size={20} />,
          },
          {
            name: "User Management",
            path: `${basePath}/users`,
            icon: <Users size={20} />,
          },
          {
            name: "Wallet & Transactions",
            path: `${basePath}/wallet`,
            icon: <Wallet size={20} />,
          },
          {
            name: "Reports",
            path: `${basePath}/reports`,
            icon: <BarChart3 size={20} />,
          },
        ]
      : []),

    {
      name: "Support",
      path: `${basePath}/support`,
      icon: <LifeBuoy size={20} />,
    },
    {
      name: "Profile",
      path: `${basePath}/profile`,
      icon: <User size={20} />,
    },
    {
      name: "Settings",
      path: `${basePath}/settings`,
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#222222] text-[#FAF3E1] overflow-y-auto border-r border-[#F5E7C6]/10">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-[#F5E7C6]/10">
        <div>
          <h2 className="text-xl font-black">
            Smart <span className="text-[#FA8112]">Parking</span>
          </h2>
          <p className="text-[10px] text-[#FA8112] uppercase tracking-[0.2em] font-black mt-0.5">
            {user?.role === "admin" ? "Staff Panel" : "Admin Engine"}
          </p>
        </div>

        <button
          onClick={closeMobileMenu}
          className="lg:hidden text-[#FAF3E1]/40 hover:text-[#FA8112]"
        >
          <X size={24} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={navLinkStyles}
            onClick={closeMobileMenu}
          >
            <span>{item.icon}</span>
            <span className="text-sm">{item.name}</span>
            {item.badge > 0 && (
              <span className="ml-auto min-w-6 h-6 px-2 rounded-full bg-[#FA8112] text-[#222222] text-[11px] font-black flex items-center justify-center">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#F5E7C6]/10 text-center text-[11px] text-[#FAF3E1]/30">
        v1.2.0
      </div>
    </div>
  );
};

export default AdminSidebar;
