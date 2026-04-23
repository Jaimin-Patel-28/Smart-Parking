import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import { getOperationalAlerts } from "../Gate-Operations/Services/gateService";

const AdminHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const { user, logout } = useAuth();

  const basePath = user?.role === "admin" ? "/admin" : "/super-admin";

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    let active = true;
    const loadAlerts = async () => {
      if (user?.role !== "admin") {
        if (active) setAlertCount(0);
        return;
      }
      try {
        const res = await getOperationalAlerts();
        if (active) setAlertCount(res?.data?.total || 0);
      } catch {
        if (active) setAlertCount(0);
      }
    };

    loadAlerts();
    const timer = setInterval(loadAlerts, 60000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [user?.role]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F5E7C6]/5 bg-[#222222]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#FAF3E1]/60 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5 lg:hidden transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar - Refined padding and font */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20"
              size={16}
            />
            <input
              type="text"
              placeholder="Search bookings, slots..."
              className="h-9 w-64 rounded-lg text-[#FAF3E1] bg-[#FAF3E1]/5 pl-10 pr-4 text-[13px] placeholder:text-[#FAF3E1]/20 focus:outline-none border border-[#F5E7C6]/5 focus:border-[#FA8112]/50 transition-all"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notifications - Refined Badge */}
          <Link
            to={
              user?.role === "admin"
                ? `${basePath}/exceptions`
                : `${basePath}/dashboard`
            }
            className="relative p-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-colors"
          >
            <Bell size={20} />
            {alertCount > 0 ? (
              <span className="absolute top-1 right-1 h-4 min-w-[16px] px-1 rounded-full bg-[#FA8112] text-[#222222] text-[9px] font-bold flex items-center justify-center">
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            ) : (
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#FA8112]/40"></span>
            )}
          </Link>

          <div className="h-4 w-px bg-[#F5E7C6]/10 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-lg hover:bg-[#FAF3E1]/5 transition-all"
            >
              <div className="h-8 w-8 rounded-lg bg-[#FA8112]/10 border border-[#FA8112]/20 flex items-center justify-center text-[#FA8112] text-xs font-bold">
                {getInitials(user?.name || user?.fullName)}
              </div>

              <div className="hidden lg:block text-left">
                <p className="text-[13px] font-semibold text-[#FAF3E1] leading-tight">
                  {user?.name || user?.fullName || "Admin"}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 mt-0.5">
                  {user?.role}
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`text-[#FAF3E1]/20 transition-transform duration-300 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <>
                {/* Overlay to close on outside click */}
                <div
                  className="fixed inset-0 z-[-1]"
                  onClick={() => setIsProfileOpen(false)}
                ></div>

                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[#F5E7C6]/10 bg-[#222222] p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <Link
                    to={`${basePath}/profile`}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#FAF3E1]/70 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-colors"
                  >
                    <User size={15} />
                    <span>My Profile</span>
                  </Link>

                  <div className="my-1.5 border-t border-[#F5E7C6]/5"></div>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 w-full text-left font-semibold transition-colors"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
