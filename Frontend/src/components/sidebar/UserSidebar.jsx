import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Wallet,
  Settings,
  Bell,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import SidebarProfile from "./SidebarProfile";

const UserSidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-[#FAF3E1] border-r-2 border-[#222222]/5
      flex flex-col transition-all duration-500 z-50 shadow-sm
      ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* TOP: Clickable Logo & Toggle Logic restored from original */}
      <div
        className={`flex items-center p-6 ${isOpen ? "justify-between" : "justify-center"}`}
      >
        {isOpen ? (
          <Link to="/user/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center text-[#FAF3E1] font-black group-hover:bg-[#FA8112] transition-colors shadow-lg">
              <Sparkles size={16} strokeWidth={2.5} />
            </div>
            <span className="font-black text-[#222222] tracking-tighter">
              SMARTPARK
            </span>
          </Link>
        ) : (
          <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center text-[#FAF3E1]">
            <Sparkles size={16} />
          </div>
        )}

        {/* The Toggle Button uses the onToggle prop from your original logic */}
        <button
          onClick={onToggle}
          className={`p-1 rounded-md hover:bg-[#F5E7C6] text-[#222222]/40 transition-all ${!isOpen && "mt-2"}`}
        >
          {isOpen ? (
            <ChevronLeft size={18} strokeWidth={3} />
          ) : (
            <ChevronRight size={18} strokeWidth={3} />
          )}
        </button>
      </div>

      {/* PROFILE: Integrated SidebarProfile with toggle logic */}
      <div className="px-4 mb-6">
        {isOpen ? (
          <div className="bg-white rounded-2xl p-0.5 border-2 border-[#222222]/5">
            <SidebarProfile isOpen={isOpen} />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-[#F5E7C6] border-2 border-[#222222]/5 mx-auto flex items-center justify-center font-black text-[#222222] text-xs">
            JP
          </div>
        )}
      </div>

      {/* NAV: Logic preserved for active/inactive routes */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto no-scrollbar">
        <NavItemLink
          to="."
          end
          icon={LayoutDashboard}
          label="Dashboard"
          isOpen={isOpen}
        />
        <NavItemLink
          to="find-parking"
          icon={Car}
          label="Find Parking"
          isOpen={isOpen}
        />
        <NavItemLink
          to="bookings"
          icon={Calendar}
          label="My Bookings"
          isOpen={isOpen}
        />
        <NavItemLink
          to="wallet"
          icon={Wallet}
          label="Wallet Hub"
          isOpen={isOpen}
        />

        <div className="my-6 mx-2 border-t-2 border-[#222222]/5" />

        <NavItemLink
          to="profile"
          icon={Settings}
          label="Profile Settings"
          isOpen={isOpen}
        />
        <NavItemLink
          to="notifications"
          icon={Bell}
          label="Notifications"
          isOpen={isOpen}
        />
        <NavItemLink
          to="help"
          icon={LifeBuoy}
          label="Help Center"
          isOpen={isOpen}
        />
      </nav>

      {/* FOOTER: Logout logic preserved */}
      <div className="p-4 border-t-2 border-[#222222]/5">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full p-3 rounded-xl font-black text-[#222222]/40 hover:bg-[#FA8112] hover:text-[#FAF3E1] transition-all duration-300 group ${!isOpen && "justify-center"}`}
        >
          <LogOut size={20} strokeWidth={3} />
          {isOpen && (
            <span className="text-[10px] uppercase tracking-[0.2em]">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

/* Internal NavItemLink to keep file clean and logic focused */
const NavItemLink = ({ to, end, icon: Icon, label, isOpen }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `group flex items-center gap-4 p-3.5 rounded-xl transition-all
      ${
        isActive
          ? "bg-[#222222] text-[#FAF3E1] shadow-md shadow-[#222222]/10"
          : "text-[#222222]/40 hover:bg-white hover:text-[#222222]"
      }
      ${!isOpen && "justify-center"}`
    }
  >
    <Icon size={20} strokeWidth={2.5} />
    {isOpen && (
      <span className="text-[11px] font-black uppercase tracking-widest">
        {label}
      </span>
    )}
  </NavLink>
);

export default UserSidebar;
