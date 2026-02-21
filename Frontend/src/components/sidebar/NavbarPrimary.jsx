import { User, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavbarSecondary = () => {
  return (
    <div className="hidden lg:flex items-center gap-6">
      <NavLink
        to="profile"
        className="flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#222222] transition"
      >
        <User size={18} />
        Profile
      </NavLink>

      <NavLink
        to="notifications"
        className="relative flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#222222] transition"
      >
        <Bell size={18} />
        Alerts
        <span className="absolute -top-2 -right-3 bg-[#FA8112] text-[#FAF3E1] text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-md">
          3
        </span>
      </NavLink>
    </div>
  );
};

export default NavbarSecondary;
