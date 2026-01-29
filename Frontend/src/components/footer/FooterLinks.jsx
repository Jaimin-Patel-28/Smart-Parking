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
    <div className="flex flex-col gap-4">
      {/* SECTION HEADING */}
      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
        Quick Links
      </h4>

      {/* LINKS LIST */}
      <ul className="flex flex-col gap-3">
        {links.map((link, index) => (
          <li key={index} className="group flex items-center gap-1">
            {/* Animated Indicator */}
            <div className="w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-3 group-hover:mr-1 rounded-full"></div>
            
            <Link
              to={link.path}
              className="text-slate-400 text-sm hover:text-white transition-all duration-300 flex items-center justify-between w-full"
            >
              {link.name}
              <ChevronRight 
                size={12} 
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" 
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;