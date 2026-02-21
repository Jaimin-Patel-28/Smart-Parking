import { NavLink } from "react-router-dom";
import { HelpCircle, Bug, PhoneCall } from "lucide-react";

const NavbarSupport = () => {
  return (
    <div className="hidden lg:flex items-center gap-6">
      <NavLink
        to="help"
        className="flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#FA8112] transition"
      >
        <HelpCircle size={18} />
        Help
      </NavLink>

      <NavLink
        to="report"
        className="flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#FA8112] transition"
      >
        <Bug size={18} />
        Report
      </NavLink>

      <NavLink
        to="contact"
        className="flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#FA8112] transition"
      >
        <PhoneCall size={18} />
        Contact
      </NavLink>
    </div>
  );
};

export default NavbarSupport;
