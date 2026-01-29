import { ShieldCheck, FileText, Cookie, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FooterLegal = () => {
  const legalLinks = [
    { name: "Privacy Policy", icon: ShieldCheck, path: "/privacy" },
    { name: "Terms & Conditions", icon: FileText, path: "/terms" },
    { name: "Cookie Policy", icon: Cookie, path: "/cookies" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* SECTION HEADING */}
      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
        Legal
      </h4>

      {/* LEGAL LINKS LIST */}
      <ul className="flex flex-col gap-3">
        {legalLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={index} className="group flex items-center gap-2">
              <Icon size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <Link
                to={link.path}
                className="text-slate-400 text-sm hover:text-white transition-all flex items-center gap-1"
              >
                {link.name}
                <ChevronRight 
                  size={12} 
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" 
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLegal;