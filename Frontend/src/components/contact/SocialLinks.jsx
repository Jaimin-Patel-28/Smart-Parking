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
      href: "https://linkedin.com/in/jaimin-patel",
    },
    {
      name: "GitHub",
      value: "Project Repository",
      icon: Github,
      href: "https://github.com/jaimin-patel/smart-park",
    },
    {
      name: "Email",
      value: "Direct Inquiry",
      icon: Mail,
      href: "mailto:support@smartpark.com",
    },
    {
      name: "WhatsApp",
      value: "Instant Support",
      icon: MessageCircle,
      href: "https://wa.me/919876543210",
    },
  ];

  return (
    <section className="space-y-8">
      {/* SECTION HEADER: Bold & High-Contrast */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-[#FA8112] text-[#FAF3E1] shadow-lg shadow-[#FA8112]/20">
          <Share2 size={22} />
        </div>
        <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
          Connect With Us
        </h2>
      </div>

      {/* SOCIAL LINKS GRID: Clean White Cards */}
      <div className="grid grid-cols-1 gap-5">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 rounded-4xl bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-5">
                {/* Icon Container with Signature Beige background */}
                <div className="p-3.5 rounded-2xl bg-[#F5E7C6] text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[#222222] font-black text-base tracking-tight mb-1">
                    {social.name}
                  </h4>
                  <p className="text-[#222222]/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    {social.value}
                  </p>
                </div>
              </div>

              {/* Functional Arrow: Slides in on hover */}
              <ExternalLink
                size={18}
                strokeWidth={3}
                className="text-[#FA8112] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
              />
            </a>
          );
        })}
      </div>

      {/* FOOTER TAG: Authentic Signature Style */}
      <p className="text-center text-[10px] text-[#222222]/30 font-black uppercase tracking-[0.4em] pt-4">
        Anand Smart City Network &copy; 2026
      </p>
    </section>
  );
};

export default SocialLinks;
