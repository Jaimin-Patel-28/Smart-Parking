import { useNavigate } from "react-router-dom";
import SidebarProfile from "./SidebarProfile";
import SidebarPrimary from "./SidebarPrimary";
import SidebarSecondary from "./SidebarSecondary";
import SidebarSupport from "./SidebarSupport";
import SidebarLogout from "./SidebarLogout";

const UserSidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();

  // 🔐 LOGOUT LOGIC (JWT based)
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("loginPrefill");
    navigate("/login", { replace: true });
  };

  return (
    /* DESIGN RESTORATION: 
       - Fixed to viewport edges to remove white shades
       - Uses original slate-950 and w-64/w-20 logic
    */
    <aside
      className={`
        fixed inset-y-0 left-0 bg-slate-950 border-r border-slate-900/50
        flex flex-col z-50 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* 1. TOP BRANDING & PROFILE AREA */}
      <div className="flex items-center justify-between p-4 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          {isOpen ? (
            <SidebarProfile />
          ) : (
            /* Compact SP Icon when collapsed */
            <div className="mx-auto w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/20">
              SP
            </div>
          )}
        </div>

        {/* TOGGLE BUTTON: Fixed spacing for clean alignment */}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          title="Toggle Sidebar"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className="px-4">
        <hr className="border-slate-900" />
      </div>

      {/* 2. NAVIGATION: Using 'no-scrollbar' to hide the bulky white bar */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-6">
        <div className="space-y-8">
          {/* Core Operations Sections */}
          <SidebarPrimary isOpen={isOpen} />
          <SidebarSecondary isOpen={isOpen} />
          
          <div className="pt-2">
            {isOpen && (
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 px-4 mb-4">
                Support Node
              </p>
            )}
            <SidebarSupport isOpen={isOpen} />
          </div>
        </div>
      </nav>

      {/* 3. FOOTER: Integrated Sign Out & Anand Hub Status */}
      <div className="flex-none p-4 border-t border-slate-900 bg-slate-950/50 backdrop-blur-md">
        <SidebarLogout onLogout={handleLogout} isOpen={isOpen} />

        {/* Status Indicator for Gujarat Hub Node */}
        {isOpen && (
          <div className="mt-4 flex items-center justify-between px-3 py-2 bg-white/2 rounded-xl border border-white/2">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">
              Anand Hub Node
            </span>
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default UserSidebar;