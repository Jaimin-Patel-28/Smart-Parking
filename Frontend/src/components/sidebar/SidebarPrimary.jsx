import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, CalendarRange, Wallet } from "lucide-react";

const SidebarPrimary = ({ isOpen }) => {
  const primaryLinks = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      to: ".", // ✅ index route
      end: true, // ✅ exact match
      color: "text-blue-400",
    },
    {
      icon: Car,
      label: "Find Parking",
      to: "find-parking", // ✅ relative
      color: "text-cyan-400",
    },
    {
      icon: CalendarRange,
      label: "My Bookings",
      to: "bookings", // ✅ relative
      color: "text-purple-400",
    },
    {
      icon: Wallet,
      label: "Wallet Hub",
      to: "wallet", // ✅ relative
      color: "text-emerald-400",
    },
  ];

  return (
    <nav className="px-2">
      <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
        Core Operations
      </p>

      <ul className="space-y-1">
        {primaryLinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <li key={index}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
                  ${
                    isActive
                      ? "bg-blue-600/10 text-white border border-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={`${link.color} ${
                        isActive
                          ? "opacity-100"
                          : "opacity-60 group-hover:opacity-100"
                      } transition-opacity`}
                    />

                    {isOpen && (
                      <span className="text-xs font-bold tracking-tight">
                        {link.label}
                      </span>
                    )}

                    {isActive && (
                      <div className="ml-auto w-1 h-4 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarPrimary;
