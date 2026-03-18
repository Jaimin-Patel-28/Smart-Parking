import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, Info, Phone, LogIn, Car } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Styling helpers to keep the JSX clean
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "text-[#FA8112] bg-[#F5E7C6]/5"
        : "text-[#FAF3E1]/70 hover:text-[#FA8112] hover:bg-[#FAF3E1]/[0.03]"
    }`;

  return (
    <header className="fixed top-5 left-0 w-full z-50 px-4 py-4 md:py-6">
      <nav className="max-w-5xl mx-auto">
        <div className="bg-[#222222]/10 backdrop-blur-md border border-[#F5E7C6]/10 rounded-2xl md:rounded-full px-7 py-4 flex items-center justify-between shadow-2xl">
          {/* BRAND LOGO */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-[#FA8112] p-2 rounded-lg transition-transform group-hover:rotate-12">
              <Car size={20} className="text-[#222222]" />
            </div>
            <span className="text-[#FAF3E1] font-bold text-lg tracking-tight">
              Smart<span className="text-[#FA8112]">Park</span>
            </span>
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>

            <div className="h-6 w-[1px] bg-[#F5E7C6]/10 mx-2" />

            <NavLink
              to="/login"
              className="bg-[#FA8112] text-[#222222] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 hover:bg-[#F5E7C6]/5 hover:text-[#F5E7C6] transition-transform active:scale-95 flex items-center gap-2"
            >
              <LogIn size={16} /> Login
            </NavLink>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#FAF3E1] p-2 hover:bg-[#FAF3E1]/10 rounded-xl transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU PANEL */}
        <div
          className={`
          md:hidden absolute top-20 left-4 right-4 transition-all duration-300 transform
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        >
          <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-3xl p-4 shadow-2xl space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              <Home size={18} /> Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              <Info size={18} /> About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              <Phone size={18} /> Contact Us
            </NavLink>

            <div className="pt-2">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#FA8112] text-[#222222] p-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <LogIn size={18} /> Login to Account
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
