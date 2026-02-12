import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, CalendarRange, Wallet } from "lucide-react";

const SidebarPrimary = ({ isOpen }) => {
  const primaryLinks = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      to: ".",
      end: true,
    },
    {
      icon: Car,
      label: "Find Parking",
      to: "find-parking",
    },
    {
      icon: CalendarRange,
      label: "My Bookings",
      to: "bookings",
    },
    {
      icon: Wallet,
      label: "Wallet Hub",
      to: "wallet",
    },
  ];

  return (
    <nav className="px-3">
      {/* SECTION HEADING: Subtle and Editorial */}
      <p
        className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30 mb-4 ${!isOpen && "text-center px-0"}`}
      >
        {isOpen ? "Core Operations" : "Core"}
      </p>

      <ul className="space-y-2">
        {primaryLinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <li key={index}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-[#222222] text-[#FAF3E1] shadow-lg shadow-[#222222]/10"
                      : "text-[#222222]/40 hover:bg-white hover:text-[#222222] border-2 border-transparent hover:border-[#222222]/5"
                  }
                  ${!isOpen && "justify-center px-0"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />

                    {isOpen && (
                      <span className="text-[11px] font-black uppercase tracking-widest">
                        {link.label}
                      </span>
                    )}

                    {/* ACTIVE INDICATOR: Humanized Orange Dot */}
                    {isActive && isOpen && (
                      <div className="ml-auto w-1.5 h-1.5 bg-[#FA8112] rounded-full shadow-sm" />
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
