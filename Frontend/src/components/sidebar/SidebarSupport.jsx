import React from "react";
import { HelpCircle, Bug, PhoneCall } from "lucide-react";

const SidebarSupport = ({ isOpen }) => {
  const supportLinks = [
    { icon: HelpCircle, label: "Help Center" },
    { icon: Bug, label: "Report Issue" },
    { icon: PhoneCall, label: "Contact Us" },
  ];

  return (
    <nav className="px-3">
      {/* SECTION HEADING: Subtle and Editorial */}
      <p
        className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30 mb-4 ${!isOpen && "text-center px-0"}`}
      >
        {isOpen ? "Support" : "Help"}
      </p>

      <ul className="space-y-2">
        {supportLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={index}>
              <button
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                text-[#222222]/40 hover:bg-white hover:text-[#222222] border-2 border-transparent hover:border-[#222222]/5
                ${!isOpen && "justify-center px-0"}`}
              >
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
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarSupport;
