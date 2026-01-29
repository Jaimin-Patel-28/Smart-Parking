import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const FooterSocial = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
      color: "hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      color: "hover:text-cyan-400",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:support@smartpark.com",
      color: "hover:text-emerald-400",
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
            className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 ${social.color} transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10`}
            aria-label={social.name}
          >
            <Icon size={20} strokeWidth={2} />
          </a>
        );
      })}
    </div>
  );
};

export default FooterSocial;
