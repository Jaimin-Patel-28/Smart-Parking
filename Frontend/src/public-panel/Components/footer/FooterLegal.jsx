import { ShieldCheck, FileText, Cookie, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FooterLegal = () => {
  const legalLinks = [
    { name: "Privacy Policy", icon: ShieldCheck, path: "/privacy" },
    { name: "Terms & Conditions", icon: FileText, path: "/terms" },
    { name: "Cookie Policy", icon: Cookie, path: "/cookies" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION HEADING: Bold, editorial Charcoal */}
      <h4 className="text-[#222222] font-black uppercase tracking-[0.2em] text-[11px] mb-2">
        Legal
      </h4>

      {/* LEGAL LINKS LIST: Clean and professional spacing */}
      <ul className="flex flex-col gap-4">
        {legalLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={index} className="group">
              <Link
                to={link.path}
                className="flex items-center gap-3 text-[#222222]/60 hover:text-[#222222] transition-all duration-300 py-1"
              >
                {/* Icon: Soft Charcoal turning Orange on hover */}
                <div className="flex items-center justify-center p-1.5 rounded-md bg-[#222222]/5 group-hover:bg-[#FA8112]/10 transition-colors">
                  <Icon
                    size={16}
                    className="group-hover:text-[#FA8112] transition-colors stroke-[2px]"
                  />
                </div>

                <span className="text-[14px] font-bold tracking-tight flex items-center justify-between w-full">
                  {link.name}
                  {/* Humanized Arrow: Slides in for tactile feedback */}
                  <ChevronRight
                    size={14}
                    strokeWidth={3}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FA8112]"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLegal;
