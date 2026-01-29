import { NavLink } from "react-router-dom";

const Navbar = () => {
  // Utility for active link styling
  const linkStyles = ({ isActive }) =>
    `relative px-1 py-1 transition-all duration-300 font-medium ${
      isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* LOGO */}
      <div className="text-2xl font-extrabold tracking-tight">
        <NavLink
          to="/"
          className="text-white hover:opacity-90 transition-opacity"
        >
          Smart<span className="text-cyan-400">Park</span>
        </NavLink>
      </div>

      {/* NAV LINKS */}
      <nav className="hidden md:flex items-center gap-8">
        <NavLink to="/" end className={linkStyles}>
          Home
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></span>
        </NavLink>

        <NavLink to="/about" className={linkStyles}>
          About Us
        </NavLink>

        <NavLink to="/contact" className={linkStyles}>
          Contact Us
        </NavLink>
      </nav>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/login"
          className="px-6 py-2.5 rounded-lg font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-cyan-500/20"
        >
          Login
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
