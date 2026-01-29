import { HelpCircle, Zap, Tag, Wallet, LayoutDashboard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSupport = () => {
  const supportLinks = [
    { name: "How It Works", icon: HelpCircle, path: "/how-it-works" },
    { name: "Features", icon: Zap, path: "/features" },
    { name: "Pricing", icon: Tag, path: "/pricing" },
    { name: "Digital Wallet", icon: Wallet, path: "/wallet" },
    { name: "Admin Dashboard", icon: "/admin-preview" }, // Linked to your preview section
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* SECTION HEADING */}
      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
        Product
      </h4>

      {/* SUPPORT LINKS LIST */}
      <ul className="flex flex-col gap-3">
        {supportLinks.map((link, index) => {
          const Icon = typeof link.icon === 'string' ? LayoutDashboard : link.icon;
          return (
            <li key={index} className="group flex items-center gap-2">
              <Icon size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
              <Link
                to={link.path}
                className="text-slate-400 text-sm hover:text-white transition-all flex items-center justify-between w-full"
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

export default FooterSupport;