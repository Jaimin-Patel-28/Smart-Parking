import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  MapPin,
  Menu,
  X,
  LifeBuoy,
} from "lucide-react";

// ================= HELPER COMPONENTS =================

const NavItem = ({ to, label, icon, end, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 transition-all uppercase font-black tracking-widest
      ${
        isActive
          ? "text-[#FA8112] bg-[#FA8112] lg:bg-transparent lg:text-[#FA8112] text-white p-4 lg:p-0 rounded-2xl"
          : "text-[#222222]/40 hover:text-[#222222] bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-[#F5E7C6]"
      } lg:text-[11px] text-sm`
    }
  >
    {icon && <span className="lg:hidden">{icon}</span>}
    {label}
  </NavLink>
);

// ================= PROFILE DROPDOWN =================

const NavbarProfile = ({ handleLogout, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const menuActions = [
    {
      label: "Profile Details",
      icon: <User size={18} />,
      path: "/user/profile",
    },
    {
      label: "System Settings",
      icon: <Settings size={18} />,
      path: "/user/settings",
    },
  ];

  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-3 py-2 rounded-2xl border transition-all w-full lg:w-auto bg-white 
          ${isOpen ? "border-[#FA8112]/30 shadow-sm" : "border-transparent"}`}
      >
        <div className="w-10 h-10 rounded-2xl bg-[#222222] flex items-center justify-center text-white font-black text-lg shrink-0">
          J
        </div>
        <div className="flex flex-col text-left">
          <span className="font-black text-[#222222] text-sm uppercase">
            Jaimin
          </span>
          {isMobile && (
            <span className="text-[10px] text-gray-400">
              jaimin@smartcity.node
            </span>
          )}
        </div>
        <div className="ml-auto lg:ml-0 text-gray-400">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div
          className={`bg-white border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200 
          ${isMobile ? "relative mt-2 w-full rounded-2xl" : "absolute right-0 mt-3 w-64 rounded-3xl shadow-2xl z-50"}`}
        >
          <div className="p-4">
            {!isMobile && (
              <div className="mb-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Account Node
                </p>
                <p className="text-sm font-bold text-[#222222]">
                  jaimin@smartcity.node
                </p>
                <hr className="border-gray-50 mt-3" />
              </div>
            )}
            <div className="space-y-1">
              {menuActions.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#FAF3E1] text-gray-500 hover:text-[#222222] transition-colors group"
                >
                  <span className="group-hover:text-[#FA8112]">
                    {item.icon}
                  </span>
                  <span className="text-xs font-black uppercase tracking-tight">
                    {item.label}
                  </span>
                </button>
              ))}
              <hr className="border-gray-50 my-2" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span className="text-xs font-black uppercase tracking-tight">
                  Logout Session
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ================= MAIN NAVBAR =================

const UserNavbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    ["token", "isAuth"].forEach((k) => localStorage.removeItem(k));
    sessionStorage.removeItem("loginPrefill");
    navigate("/login", { replace: true });
  };

  const navLinks = [
    { to: ".", label: "Dashboard", end: true },
    { to: "find-parking", label: "Find Parking" },
    { to: "bookings", label: "My Bookings" },
    { to: "wallet", label: "Wallet Hub" },
    { to: "help", label: "Help Center", icon: <LifeBuoy size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF3E1] px-4 md:px-8 py-4 border-b border-[#F5E7C6]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link to="/user/dashboard" className="flex items-center gap-3 shrink-0">
          <div className="bg-[#222222] p-2 rounded-2xl">
            <MapPin
              size={22}
              className="text-[#FA8112]"
              fill="#FA8112"
              fillOpacity={0.2}
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg md:text-xl font-black tracking-tighter leading-none">
              <span className="text-[#222222]">SMART</span>
              <span className="text-[#FA8112]">PARK</span>
            </div>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
              Anand Smart City
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavItem key={link.label} {...link} />
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={() => navigate("notifications")}
            className="relative p-2 text-[#222222]/60 hover:text-[#FA8112] transition-colors"
          >
            <Bell size={22} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FA8112] rounded-full border-2 border-[#FAF3E1]"></span>
          </button>

          <div className="hidden lg:block">
            <NavbarProfile handleLogout={handleLogout} />
          </div>

          <button
            className="lg:hidden p-2 text-[#222222] bg-white rounded-xl border border-[#F5E7C6]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <aside className="lg:hidden absolute top-full left-0 w-full bg-[#FAF3E1] border-b border-[#F5E7C6] shadow-2xl p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <NavbarProfile handleLogout={handleLogout} isMobile />
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                {...link}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>
        </aside>
      )}
    </header>
  );
};

export default UserNavbar;
