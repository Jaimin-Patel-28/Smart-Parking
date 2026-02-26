import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const FooterSocial = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:support@smartpark.com",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-2xl bg-white border-2 border-[#222222]/5 text-[#222222]/40 transition-all duration-500 hover:border-[#222222] hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-[#222222]/5"
            aria-label={social.name}
          >
            {/* Soft Beige background that appears on hover */}
            <div className="absolute inset-0 rounded-2xl bg-[#F5E7C6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <Icon
              size={22}
              strokeWidth={2.5}
              className="relative z-10 group-hover:text-[#FA8112] transition-colors duration-300"
            />
          </a>
        );
      })}
    </div>
  );
};

export default FooterSocial;
