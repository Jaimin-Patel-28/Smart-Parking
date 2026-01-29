import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ExternalLink,
  Share2,
} from "lucide-react";

const SocialLinks = () => {
  const socials = [
    {
      name: "LinkedIn",
      value: "Professional Profile",
      icon: Linkedin,
      href: "https://linkedin.com/in/jaimin-patel", // Update with your profile
      color: "hover:text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      name: "GitHub",
      value: "Project Repository",
      icon: Github,
      href: "https://github.com/jaimin-patel/smart-park", // Update with your repo
      color: "hover:text-slate-200",
      bg: "bg-slate-200/10",
    },
    {
      name: "Email",
      value: "Direct Inquiry",
      icon: Mail,
      href: "mailto:support@smartpark.com",
      color: "hover:text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      name: "WhatsApp",
      value: "Instant Support",
      icon: MessageCircle,
      href: "https://wa.me/919876543210", // Update with your number
      color: "hover:text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <section className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
          <Share2 size={20} />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Connect With Us
        </h2>
      </div>

      {/* SOCIAL LINKS GRID */}
      <div className="grid grid-cols-1 gap-4">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 ${social.color}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-slate-900 shadow-inner group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-none mb-1">
                    {social.name}
                  </h4>
                  <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">
                    {social.value}
                  </p>
                </div>
              </div>

              <ExternalLink
                size={16}
                className="text-slate-700 group-hover:text-inherit opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </a>
          );
        })}
      </div>

      {/* FOOTER TAG */}
      <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest pt-2">
        Anand Smart City Network &copy; 2026
      </p>
    </section>
  );
};

export default SocialLinks;
