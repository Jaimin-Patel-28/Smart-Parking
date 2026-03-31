import React from "react";
import { Instagram, Linkedin, Github, Twitter } from "lucide-react";

const SocialLinks = () => {
  const socials = [
    { name: "LinkedIn", icon: Linkedin, link: "#" },
    { name: "GitHub", icon: Github, link: "#" },
    { name: "Instagram", icon: Instagram, link: "#" },
    { name: "Twitter", icon: Twitter, link: "#" },
  ];

  return (
    <section>
      <header className="mb-8">
        <h3 className="text-[#FAF3E1] text-xl font-bold tracking-tight">
          Connect <span className="text-[#FA8112]">Online.</span>
        </h3>
      </header>

      <nav className="grid grid-cols-2 gap-3">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            className="flex items-center gap-3 bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 p-3 rounded-2xl hover:border-[#FA8112]/40 hover:bg-[#FA8112]/5 transition-all duration-500 group"
          >
            <div className="text-[#FAF3E1]/20 group-hover:text-[#FA8112] transition-colors">
              <social.icon size={18} strokeWidth={1.5} />
            </div>
            <span className="text-[#FAF3E1]/50 text-xs font-bold uppercase tracking-widest group-hover:text-[#FAF3E1] transition-colors">
              {social.name}
            </span>
          </a>
        ))}
      </nav>
    </section>
  );
};

export default SocialLinks;
