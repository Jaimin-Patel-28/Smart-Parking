import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Notion-style typography: Heavy charcoal for active, subtle for inactive
  const linkStyles = ({ isActive }) =>
    `relative text-[15px] font-medium transition-all duration-300 py-1 ${
      isActive
        ? "text-[#222222] border-b-2 border-[#FA8112]"
        : "text-[#222222]/60 hover:text-[#FA8112]"
    }`;

  return (
    <header className="sticky top-0 z-100 w-full border-b border-[#222222]/5 bg-[#FAF3E1]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        {/* 1. LOGO: Using Vibrant Orange as the focal point */}
        <div className="relative z-110">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FA8112] transition-all duration-500 group-hover:rotate-[-5deg] shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FAF3E1]"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#222222]">
              Smart<span className="text-[#FA8112]">Park</span>
            </span>
          </NavLink>
        </div>

        {/* 2. DESKTOP NAV: Minimalist & Breathable */}
        <nav className="hidden items-center gap-10 md:flex">
          <NavLink to="/" end className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkStyles}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkStyles}>
            Contact
          </NavLink>

          <div className="h-5 w-px bg-[#222222]/10 mx-2"></div>

          <NavLink
            to="/login"
            className="rounded-lg bg-[#222222] px-6 py-2.5 text-sm font-bold text-[#FAF3E1] transition-all hover:bg-[#FA8112] hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign in
          </NavLink>
        </nav>

        {/* 3. MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-110 rounded-lg p-2 text-[#222222] hover:bg-[#F5E7C6] md:hidden transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* 4. MOBILE MENU: Full Screen Humanized Layout */}
        <div
          className={`fixed inset-0 z-105 h-screen w-full bg-[#FAF3E1] transition-all duration-500 ease-in-out md:hidden ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex h-full flex-col px-8 pt-32 pb-16">
            <nav className="flex flex-col space-y-8">
              {["Home", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `flex items-center justify-between text-4xl font-black tracking-tighter transition-colors ${
                      isActive ? "text-[#FA8112]" : "text-[#222222]"
                    }`
                  }
                >
                  {item}
                  <ArrowRight
                    size={32}
                    className={
                      location.pathname ===
                      (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                        ? "opacity-100"
                        : "opacity-10"
                    }
                  />
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto">
              <NavLink
                to="/login"
                className="flex w-full items-center justify-center rounded-xl bg-[#FA8112] py-5 text-xl font-bold text-[#FAF3E1] shadow-lg shadow-[#FA8112]/20 active:scale-[0.98] transition-transform"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
