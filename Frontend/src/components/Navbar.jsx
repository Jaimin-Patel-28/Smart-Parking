import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // FIX: Close mobile menu automatically when a link is clicked or route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // FIX: Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const linkStyles = ({ isActive }) =>
    `relative transition-all duration-300 font-bold uppercase tracking-widest text-xs ${
      isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-1000 w-full flex items-center justify-between px-6 md:px-12 py-5 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      {/* 1. LOGO (Ensure high z-index to stay visible) */}
      <div className="relative z-1010">
        <NavLink
          to="/"
          className="text-2xl font-black tracking-tighter text-white flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-cyan-400 rounded-lg rotate-12 flex items-center justify-center">
            <div className="w-3 h-3 bg-slate-950 rounded-full"></div>
          </div>
          Smart<span className="text-cyan-400">Park</span>
        </NavLink>
      </div>

      {/* 2. DESKTOP NAV (Hidden on mobile) */}
      <nav className="hidden md:flex items-center gap-10">
        <NavLink to="/" end className={linkStyles}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkStyles}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkStyles}>
          Contact
        </NavLink>
        <NavLink
          to="/login"
          className="px-6 py-2 bg-cyan-400 text-slate-950 rounded-full font-black text-xs uppercase tracking-widest"
        >
          Login
        </NavLink>
      </nav>

      {/* 3. MOBILE TOGGLE BUTTON (Critical Fix: High Z-index) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-1010 p-2 text-cyan-400 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* 4. MOBILE MENU OVERLAY (The "Unique UI" Slide) */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-slate-950 z-1005 flex flex-col transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full pt-32 px-10 space-y-10">
          <span className="text-slate-600 text-xs font-black uppercase tracking-[0.5em]">
            Menu
          </span>

          <nav className="flex flex-col gap-8">
            {["Home", "About", "Contact"].map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-5xl font-black text-white hover:text-cyan-400 transition-all flex items-center justify-between group"
              >
                {item}
                <ChevronRight
                  className="opacity-0 group-hover:opacity-100 text-cyan-400 -translate-x-4 group-hover:translate-x-0 transition-all"
                  size={40}
                />
              </NavLink>
            ))}
          </nav>

          <div className="pt-10 border-t border-slate-900">
            <NavLink
              to="/login"
              className="w-full py-6 bg-cyan-400 rounded-2xl flex items-center justify-center text-slate-950 font-black uppercase tracking-widest text-lg"
            >
              Login to Dashboard
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
