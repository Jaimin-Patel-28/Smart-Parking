import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import { getOperationalAlerts } from "../Gate-Operations/Services/gateService";

const AdminHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const { user, logout } = useAuth();

  // 🔥 Dynamic Role Handling
  const basePath = user?.role === "admin" ? "/admin" : "/super-admin";

  // 🔥 Get initials (nice UX)
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
        if (active) {
          setAlertCount(0);
        }
        return;
      }

      try {
        const res = await getOperationalAlerts();
        if (active) {
          setAlertCount(res?.data?.total || 0);
        }
      } catch {
        if (active) {
          setAlertCount(0);
        }
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
    <header className="sticky top-0 z-40 w-full border-b border-[#F5E7C6]/10 bg-[#222222]/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#FAF3E1] hover:bg-[#FAF3E1]/5 lg:hidden"
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
              className="h-10 w-64 rounded-full text-[#FAF3E1] bg-[#FAF3E1]/2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8112]/20 border border-[#F5E7C6]/10 focus:border-[#FA8112]"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <Link
            to={user?.role === "admin" ? `${basePath}/exceptions` : `${basePath}/dashboard`}
            className="relative p-2 text-[#FAF3E1]/60 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5 rounded-full"
          >
            <Bell size={20} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#FA8112] text-[#222222] text-[10px] font-black flex items-center justify-center border border-[#222222]">
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            )}
            {alertCount === 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FA8112] border-2 border-[#222222]"></span>
            )}
          </Link>

          <div className="h-6 w-px bg-[#F5E7C6]/10 mx-1 hidden sm:block"></div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-[#FAF3E1]/5"
            >
              {/* Avatar */}
              <div className="h-9 w-9 rounded-full bg-[#FA8112] flex items-center justify-center text-[#222222] font-bold">
                {getInitials(user?.name || user?.fullName)}
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[#FAF3E1] leading-none">
                  {user?.name || user?.fullName || "Admin"}
                </p>
                <p className="text-[11px] text-[#FAF3E1]/40 mt-1 capitalize">
                  {user?.role}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-[#FAF3E1]/40 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#F5E7C6]/10 bg-[#222222] p-2 shadow-2xl">
                <Link
                  to={`${basePath}/profile`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#FAF3E1]/80 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5"
                >
                  <User size={16} /> Profile
                </Link>

                <hr className="my-1 border-[#F5E7C6]/10" />

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#FA8112] hover:bg-[#FA8112]/10 w-full text-left font-bold"
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
