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
  ShieldCheck,
  Terminal,
} from "lucide-react";

const AdminSidebar = ({ closeMobileMenu }) => {
  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group
    ${
      isActive
        ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/10 font-bold"
        : "text-[#FAF3E1]/40 hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1]"
    }
  `;

  // Categorized Menu Items for a professional hierarchy
  const menuGroups = [
    {
      group: "Core Operations",
      items: [
        {
          name: "Dashboard",
          path: "/super-admin/dashboard",
          icon: <LayoutDashboard size={18} />,
        },
        {
          name: "Parking Sites",
          path: "/super-admin/parking",
          icon: <Car size={18} />,
        },
        {
          name: "Slot Registry",
          path: "/super-admin/slots",
          icon: <Layers size={18} />,
        },
      ],
    },
    {
      group: "Management",
      items: [
        {
          name: "Bookings",
          path: "/super-admin/bookings",
          icon: <CalendarCheck size={18} />,
        },
        {
          name: "User Directory",
          path: "/super-admin/users",
          icon: <Users size={18} />,
        },
        {
          name: "Wallet Hub",
          path: "/super-admin/wallet",
          icon: <Wallet size={18} />,
        },
      ],
    },
    {
      group: "Analytics & Security",
      items: [
        {
          name: "Performance",
          path: "/super-admin/reports",
          icon: <BarChart3 size={18} />,
        },
        {
          name: "Audit Trail",
          path: "/super-admin/audit-trail",
          icon: <Activity size={18} />,
        },
        {
          name: "System Support",
          path: "/super-admin/support",
          icon: <LifeBuoy size={18} />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-[#FAF3E1] overflow-hidden border-r border-[#F5E7C6]/5">
      {/* 1. SIDEBAR HEADER: Branding Identity */}
      <div className="p-8 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={16} className="text-[#FA8112]" />
            <h2 className="text-lg font-bold tracking-tight text-[#FAF3E1]">
              Smart <span className="text-[#FA8112]">Park</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px w-3 bg-[#FA8112]/30" />
            <p className="text-[9px] text-[#FA8112]/60 uppercase tracking-[0.3em] font-bold">
              Operator Engine
            </p>
          </div>
        </div>

        <button
          onClick={closeMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* 2. NAVIGATION: Categorized and Clean */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar pb-8">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            <h3 className="px-4 mb-4 text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkStyles}
                  onClick={closeMobileMenu}
                >
                  <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {/* Separator for Settings */}
        <div className="mt-4 pt-4 border-t border-[#F5E7C6]/5">
          <NavLink
            to="/super-admin/settings"
            className={navLinkStyles}
            onClick={closeMobileMenu}
          >
            <Settings size={18} className="shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Global Settings
            </span>
          </NavLink>
        </div>
      </nav>

      {/* 3. SYSTEM FOOTER: Technical Info */}
      <div className="p-6 bg-[#1a1a1a]">
        <div className="bg-[#FAF3E1]/2 p-4 rounded-xl border border-[#F5E7C6]/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#FA8112]">
              <Terminal size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Status: Nominal
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
          <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.2em] text-center">
            Encryption Active • v1.2.4
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
