import { NavLink, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import SidebarProfile from "./SidebarProfile";

const UserSidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-slate-950 border-r border-white/5
      flex flex-col transition-all duration-500 z-50
      ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* TOP */}
      <div
        className={`flex items-center p-6 ${isOpen ? "justify-between" : "justify-center"}`}
      >
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
              SP
            </div>
            <span className="font-black text-white">SMARTPARK</span>
          </div>
        )}
        <button onClick={onToggle}>
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* PROFILE */}
      <div className="px-4 mb-6">
        {isOpen ? (
          <SidebarProfile isOpen={isOpen} />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500/20 mx-auto">
            JP
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 space-y-2">
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

        <div className="my-6 border-t border-white/5" />

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

      {/* FOOTER */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full"
        >
          <LogOut size={20} />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

const NavItemLink = ({ to, end, icon: Icon, label, isOpen }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `group flex items-center gap-4 p-3.5 rounded-2xl transition-all
      ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          : "text-slate-500 hover:bg-white/5 hover:text-white"
      }
      ${!isOpen && "justify-center"}`
    }
  >
    <Icon size={20} />
    {isOpen && <span className="text-xs font-black">{label}</span>}
  </NavLink>
);

export default UserSidebar;
