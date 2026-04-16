import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import useUnreadCount from "../Notifications/Hooks/useUnreadCount";

const AdminHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { unreadCount } = useUnreadCount();

  const displayName = user?.fullName || user?.name || "Admin User";
  const displayRole = user?.role
    ? user.role
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "Super Admin";

  return (
    // Background: #222222 | Border: #F5E7C6 at 10% opacity
    <header className="sticky top-0 z-40 w-full border-b border-[#F5E7C6]/10 bg-[#222222]/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left: Hamburger & Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            // Text: #FAF3E1 | Hover Background: #FAF3E1 at 2% opacity
            className="inline-flex items-center justify-center rounded-md p-2 text-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-all lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Quick search..."
              // Background: #FAF3E1 at 2% opacity | Focus Ring/Border: #FA8112
              className="h-10 w-64 rounded-full text-[#FAF3E1] bg-[#FAF3E1]/2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8112]/20 transition-all border border-[#F5E7C6]/10 focus:border-[#FA8112]"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button
            onClick={() => navigate("/super-admin/notifications")}
            className="relative p-2 text-[#FAF3E1]/60 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5 rounded-full transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
            {/* Accent: #FA8112 */}
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#FA8112] text-[#222222] text-[10px] font-black flex items-center justify-center border-2 border-[#222222]">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </button>

          <div className="h-6 w-px bg-[#F5E7C6]/10 mx-1 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-[#FAF3E1]/5 transition-all"
            >
              {/* Profile Icon Background: #FA8112 */}
              <div className="h-9 w-9 rounded-full bg-[#FA8112] flex items-center justify-center text-[#222222] font-bold shadow-sm">
                AD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[#FAF3E1] leading-none">
                  {displayName}
                </p>
                <p className="text-[11px] text-[#FAF3E1]/40 mt-1">
                  {displayRole}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#FAF3E1]/40 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              // Card Background: #FAF3E1 at 2% opacity (using solid hex for dropdown readability)
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#F5E7C6]/10 bg-[#222222] p-2 shadow-2xl animate-in fade-in zoom-in duration-200">
                <Link
                  to="/super-admin/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#FAF3E1]/80 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-colors"
                >
                  <User size={16} /> Profile
                </Link>
                <hr className="my-1 border-[#F5E7C6]/10" />
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#FA8112] hover:bg-[#FA8112]/10 transition-colors w-full text-left font-bold"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
