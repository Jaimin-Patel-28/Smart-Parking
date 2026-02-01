import { useNavigate } from "react-router-dom";

import SidebarProfile from "./SidebarProfile";
import SidebarPrimary from "./SidebarPrimary";
import SidebarSecondary from "./SidebarSecondary";
import SidebarSupport from "./SidebarSupport";
import SidebarLogout from "./SidebarLogout";

const UserSidebar = () => {
  const navigate = useNavigate();

  // 🔐 LOGOUT LOGIC (JWT based)
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear auth
    sessionStorage.removeItem("loginPrefill"); // cleanup
    navigate("/auth"); // back to auth
  };

  return (
    /* Fixed sidebar – no scroll glitch */
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-900/50 flex flex-col z-50 overflow-hidden">
      {/* BRAND / PROFILE */}
      <div className="flex-none p-4">
        <SidebarProfile />
      </div>

      <hr className="border-slate-900 mx-4" />

      {/* NAVIGATION (TEMP DASHBOARD) */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-4">
        <div className="space-y-6">
          <SidebarPrimary />
          <SidebarSecondary />
          <SidebarSupport />
        </div>
      </nav>

      {/* FOOTER */}
      <div className="flex-none p-4 border-t border-slate-900 bg-slate-950/50 backdrop-blur-md">
        {/* 🔑 Logout button with real logic */}
        <SidebarLogout onLogout={handleLogout} />

        {/* Status Badge */}
        <div className="mt-4 flex items-center justify-between px-3 opacity-40">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">
            Anand Hub Node
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
