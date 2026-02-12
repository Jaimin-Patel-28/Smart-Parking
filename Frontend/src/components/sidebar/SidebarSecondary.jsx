import React from "react";
import { User, Bell } from "lucide-react";

const SidebarSecondary = ({ isOpen }) => {
  const accountLinks = [
    {
      icon: User,
      label: "Profile Settings",
      badge: null,
    },
    {
      icon: Bell,
      label: "Notifications",
      badge: "3", // Logic preserved for MongoDB/Socket.io state
    },
  ];

  return (
    <nav className="px-3">
      {/* SECTION HEADING: Subtle and Editorial */}
      <p
        className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30 mb-4 ${!isOpen && "text-center px-0"}`}
      >
        {isOpen ? "Account Management" : "Account"}
      </p>

      <ul className="space-y-2">
        {accountLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={index}>
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group
                text-[#222222]/40 hover:bg-white hover:text-[#222222] border-2 border-transparent hover:border-[#222222]/5
                ${!isOpen && "justify-center px-0"}`}
              >
                <div className="flex items-center gap-4">
                  <Icon
                    size={20}
                    strokeWidth={2.5}
                    className="group-hover:text-[#FA8112] transition-colors"
                  />
                  {isOpen && (
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {link.label}
                    </span>
                  )}
                </div>

                {/* NOTIFICATION BADGE: High-contrast signature style */}
                {isOpen && link.badge && (
                  <span className="bg-[#FA8112] text-[#FAF3E1] text-[9px] font-black px-2 py-0.5 rounded-lg shadow-md shadow-[#FA8112]/20">
                    {link.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarSecondary;
