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

  // REFINED: NavLink styles with better weights and subtle active state
  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group
    ${
      isActive
        ? "bg-[#FA8112]/10 text-[#FA8112] font-semibold border-r-2 border-[#FA8112] rounded-r-none"
        : "text-[#FAF3E1]/40 hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1]"
    }
  `;

  useEffect(() => {
    let active = true;
    const loadAlerts = async () => {
      if (user?.role !== "admin") return;
      try {
        const res = await getOperationalAlerts();
        if (active) setAlertCount(res?.data?.total || 0);
      } catch {
        if (active) setAlertCount(0);
      }
    };
    loadAlerts();
    const timer = setInterval(loadAlerts, 60000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [user?.role]);

  const menuItems = [
    {
      name: "Dashboard",
      path: `${basePath}/dashboard`,
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Booking Management",
      path: `${basePath}/bookings`,
      icon: <CalendarCheck size={18} />,
    },
    {
      name: "Ticket Verification",
      path: `${basePath}/ticket-verification`,
      icon: <ScanLine size={18} />,
    },
    {
      name: "Entry Desk",
      path: `${basePath}/entry-desk`,
      icon: <LogIn size={18} />,
    },
    {
      name: "Exit Desk",
      path: `${basePath}/exit-desk`,
      icon: <LogOut size={18} />,
    },
    ...(user?.role === "admin"
      ? [
          {
            name: "Exceptions",
            path: `${basePath}/exceptions`,
            icon: <AlertTriangle size={18} />,
            badge: alertCount,
          },
          {
            name: "Shift Summary",
            path: `${basePath}/shift-summary`,
            icon: <BarChart2 size={18} />,
          },
        ]
      : []),
    ...(user?.role === "super-admin"
      ? [
          {
            name: "Parking Management",
            path: `${basePath}/parking`,
            icon: <Car size={18} />,
          },
          {
            name: "Slot Management",
            path: `${basePath}/slots`,
            icon: <Layers size={18} />,
          },
          {
            name: "User Management",
            path: `${basePath}/users`,
            icon: <Users size={18} />,
          },
          {
            name: "Wallet & Transactions",
            path: `${basePath}/wallet`,
            icon: <Wallet size={18} />,
          },
          {
            name: "Reports",
            path: `${basePath}/reports`,
            icon: <BarChart3 size={18} />,
          },
        ]
      : []),
    {
      name: "Support",
      path: `${basePath}/support`,
      icon: <LifeBuoy size={18} />,
    },
    { name: "Profile", path: `${basePath}/profile`, icon: <User size={18} /> },
    {
      name: "Settings",
      path: `${basePath}/settings`,
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#222222] text-[#FAF3E1] border-r border-[#F5E7C6]/5 shadow-xl">
      {/* BRANDING HEADER */}
      <div className="p-6 flex justify-between items-center border-b border-[#F5E7C6]/5">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Smart<span className="text-[#FA8112]">Park</span>
          </h2>
          <p className="text-[9px] text-[#FA8112]/60 uppercase tracking-[0.25em] font-bold mt-1">
            {user?.role === "admin" ? "Staff Control" : "System Engine"}
          </p>
        </div>
        <button
          onClick={closeMobileMenu}
          className="lg:hidden p-2 text-[#FAF3E1]/20 hover:text-[#FA8112] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={navLinkStyles}
            onClick={closeMobileMenu}
          >
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              {item.icon}
            </span>
            <span className="text-[13px] tracking-wide">{item.name}</span>
            {item.badge > 0 && (
              <span className="ml-auto min-w-[18px] h-[18px] px-1 rounded-md bg-[#FA8112] text-[#222222] text-[9px] font-bold flex items-center justify-center">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-[#F5E7C6]/5 flex items-center justify-between">
        <span className="text-[9px] text-[#FAF3E1]/20 uppercase tracking-widest font-semibold">
          Build 1.2.0
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
      </div>
    </div>
  );
};

export default AdminSidebar;
