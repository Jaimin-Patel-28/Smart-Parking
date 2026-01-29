import React from "react";
import { User, Bell } from "lucide-react";

const SidebarSecondary = () => {
  const accountLinks = [
    { 
      icon: User, 
      label: "Profile Settings", 
      color: "text-blue-400",
      badge: null 
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      color: "text-orange-400",
      badge: "3" // This would eventually come from your MongoDB/Socket.io state
    },
  ];

  return (
    <nav className="px-2">
      <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
        Account Management
      </p>

      <ul className="space-y-1">
        {accountLinks.map((link, index) => (
          <li key={index}>
            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group">
              <div className="flex items-center gap-3">
                <link.icon 
                  size={18} 
                  className={`${link.color} opacity-70 group-hover:opacity-100 transition-opacity`} 
                />
                <span className="text-xs font-semibold tracking-tight">
                  {link.label}
                </span>
              </div>
              
              {/* NOTIFICATION BADGE */}
              {link.badge && (
                <span className="bg-orange-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-lg shadow-orange-500/20">
                  {link.badge}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarSecondary;