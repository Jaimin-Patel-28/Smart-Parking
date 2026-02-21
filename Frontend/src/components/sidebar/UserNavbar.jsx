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
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const UserNavbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: ".", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "find-parking", label: "Find Parking", icon: Car },
    { to: "bookings", label: "My Bookings", icon: Calendar },
    { to: "wallet", label: "Wallet Hub", icon: Wallet },
    { to: "profile", label: "Settings", icon: Settings },
    { to: "notifications", label: "Alerts", icon: Bell },
    { to: "help", label: "Help Center", icon: LifeBuoy },
  ];

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-[#FAF3E1] border-b border-[#222222]/5 backdrop-blur-lg">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/user/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#222222] rounded-xl flex items-center justify-center text-[#FAF3E1] shadow-lg shadow-[#222222]/10">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
            <span className="font-black text-[#222222] tracking-tight text-lg">
              SMARTPARK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-[#FA8112]"
                      : "text-[#222222]/60 hover:text-[#222222]"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#FA8112] transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#222222]"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isMobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-[#222222]">Menu</span>
            <button onClick={() => setIsMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl font-semibold transition ${
                    isActive
                      ? "bg-[#FA8112] text-white"
                      : "text-[#222222]/70 hover:bg-[#F5E7C6]"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}

            <div className="pt-6 border-t border-[#222222]/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-xl text-[#222222]/70 hover:bg-[#FA8112] hover:text-white transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;