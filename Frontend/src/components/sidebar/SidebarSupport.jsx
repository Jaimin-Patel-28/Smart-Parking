import React from "react";
import { HelpCircle, Bug, PhoneCall } from "lucide-react";

const SidebarSupport = () => {
  const supportLinks = [
    { icon: HelpCircle, label: "Help Center", color: "text-blue-400" },
    { icon: Bug, label: "Report Issue", color: "text-amber-400" },
    { icon: PhoneCall, label: "Contact Us", color: "text-emerald-400" },
  ];

  return (
    <nav className="px-2">
      {/* Small, clean section title */}
      <p className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
        Support
      </p>

      <ul className="space-y-1">
        {supportLinks.map((link, index) => (
          <li key={index}>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group">
              {/* Lucide Icon with dynamic color on hover */}
              <link.icon 
                size={18} 
                className={`${link.color} opacity-70 group-hover:opacity-100 transition-opacity`} 
              />
              <span className="text-xs font-medium tracking-tight">
                {link.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarSupport;