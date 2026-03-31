import React from "react";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const ContactCards = () => {
  const channels = [
    {
      title: "Email Support",
      value: "support@smartpark.io",
      desc: "Response within 24 hours",
      icon: Mail,
      link: "mailto:support@smartpark.io",
    },
    {
      title: "Direct Call",
      value: "+91 98765 43210",
      desc: "Mon-Fri, 9am - 6pm",
      icon: Phone,
      link: "tel:+919876543210",
    },
    {
      title: "WhatsApp Chat",
      value: "Chat with us live",
      desc: "Instant tech support",
      icon: MessageCircle,
      link: "https://wa.me/919876543210",
    },
  ];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
      {channels.map((item, index) => (
        <li key={index} className="group">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full bg-[#2a2a2a]/60 backdrop-blur-xl border border-[#F5E7C6]/10 p-8 rounded-[2.5rem] transition-all duration-500 hover:border-[#FA8112]/40 hover:bg-[#FAF3E1]/[0.04] hover:-translate-y-2 group"
          >
            {/* CARD HEADER */}
            <header className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#FA8112]/10 text-[#FA8112] group-hover:bg-[#FA8112] group-hover:text-[#222222] transition-all duration-500">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <ArrowUpRight
                size={18}
                className="text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:translate-x-1 transition-all"
              />
            </header>

            {/* CARD CONTENT */}
            <section>
              <h3 className="text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-[#FA8112]/60 transition-colors">
                {item.title}
              </h3>
              <p className="text-[#FAF3E1] text-lg font-bold mb-1 tracking-tight">
                {item.value}
              </p>
              <p className="text-[#FAF3E1]/30 text-xs">{item.desc}</p>
            </section>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ContactCards;
