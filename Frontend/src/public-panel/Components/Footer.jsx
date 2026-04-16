import React from "react";
import {
  Car,
  Github,
  Linkedin,
  Instagram,
  Globe,
  Zap,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#222222] border-t border-[#F5E7C6]/5 pt-20 pb-10 overflow-hidden">
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#FA8112]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* COLUMN 1: BRAND & MISSION (5 COLS) */}
          <section className="md:col-span-5 flex flex-col gap-6">
            <header className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 bg-[#FA8112] rounded-xl flex items-center justify-center text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.3)] transition-transform group-hover:scale-110">
                <Car size={22} fill="currentColor" />
              </div>
              <h2 className="text-[#FAF3E1] text-xl font-bold tracking-tighter">
                Smart<span className="text-[#FA8112]">Park.</span>
              </h2>
            </header>

            <p className="text-[#FAF3E1]/40 text-sm leading-relaxed max-w-sm">
              An advanced MERN-stack parking ecosystem designed for the Anand
              Smart City initiative. Simplifying urban mobility through
              real-time automation and secure digital payments.
            </p>

            <aside className="flex items-center gap-4">
              {[
                { icon: Github, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Instagram, link: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="w-10 h-10 rounded-xl bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 flex items-center justify-center text-[#FAF3E1]/30 hover:text-[#FA8112] hover:border-[#FA8112]/40 transition-all duration-300"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </aside>
          </section>

          {/* COLUMN 2: QUICK LINKS (3 COLS) */}
          <nav className="md:col-span-3">
            <h3 className="text-[#FAF3E1] text-xs font-bold uppercase tracking-[0.3em] mb-8">
              Navigation
            </h3>
            <ul className="flex flex-col gap-4 list-none p-0">
              {[
                { name: "Home", path: "/public/home" },
                { name: "About Us", path: "/public/about" },
                { name: "Contact", path: "/public/contact" },
                { name: "Parking Slots", path: "/user/find-parking" },
                { name: "Admin Portal", path: "/auth/login" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-[#FAF3E1]/40 text-sm hover:text-[#FA8112] transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#FA8112] scale-0 group-hover:scale-100 transition-transform" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 3: TECH STATUS (4 COLS) */}
          <section className="md:col-span-4 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 p-8 rounded-[2rem]">
            <h3 className="text-[#FAF3E1] text-xs font-bold uppercase tracking-[0.3em] mb-6">
              System Health
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-2 border-b border-[#F5E7C6]/5">
                <span className="text-[#FAF3E1]/30 text-xs">API Status</span>
                <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#F5E7C6]/5">
                <span className="text-[#FAF3E1]/30 text-xs">
                  Node.js Server
                </span>
                <span className="text-[#FA8112] text-[10px] font-bold">
                  24ms Latency
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#FAF3E1]/30 text-xs">MongoDB Atlas</span>
                <span className="text-[#FAF3E1]/60 text-[10px]">
                  Cloud Connected
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM BAR: COPYRIGHT & ATTRIBUTION */}
        <section className="pt-10 border-t border-[#F5E7C6]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.4em]">
            &copy; {currentYear} SmartPark Project • Anand, Gujarat
          </p>

          <div className="flex items-center gap-2 text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-widest">
            Made with{" "}
            <Heart size={10} className="text-[#FA8112]" fill="currentColor" />{" "}
            by
            <span className="text-[#FAF3E1]/60 hover:text-[#FA8112] cursor-pointer transition-colors tracking-tighter text-sm ml-1 font-mono uppercase">
              Jaimin
            </span>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
