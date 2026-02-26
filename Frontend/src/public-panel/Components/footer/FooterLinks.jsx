import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FooterLinks = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Find Parking", path: "/parking" },
    { name: "My Bookings", path: "/bookings" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION HEADING: Bold and high-contrast */}
      <h4 className="text-[#222222] font-black uppercase tracking-[0.2em] text-[11px] mb-2">
        Quick Links
      </h4>

      {/* LINKS LIST: Using breathable vertical gaps for touch-friendliness */}
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => (
          <li key={index} className="group flex items-center">
            {/* HUMANIZED INDICATOR: A subtle dot instead of a growing bar */}
            <div className="w-1.5 h-1.5 bg-[#FA8112] rounded-full opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2"></div>

            <Link
              to={link.path}
              className="text-[#222222]/60 text-[14px] font-bold hover:text-[#222222] transition-all duration-300 flex items-center justify-between w-full tracking-tight"
            >
              {link.name}
              <ChevronRight
                size={14}
                strokeWidth={3}
                className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#FA8112]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
