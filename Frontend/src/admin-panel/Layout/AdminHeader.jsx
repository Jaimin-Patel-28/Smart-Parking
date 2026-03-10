import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, Search, User, LogOut, ChevronDown } from "lucide-react";

const AdminHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left: Hamburger & Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Quick search..."
              className="h-10 w-64 rounded-full text-slate-500 bg-slate-100 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all border border-transparent focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white"></span>
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-all"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-sm">
                AD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-700 leading-none">
                  Admin User
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Super Admin</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in duration-200">
                <Link
                  to="/admin/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <User size={16} /> Profile
                </Link>
                <hr className="my-1 border-slate-100" />
                <Link
                  to="/admin/logout"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
