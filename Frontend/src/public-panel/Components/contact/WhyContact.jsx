import React from "react";
import { Clock, ShieldCheck, Zap } from "lucide-react";

const WhyContact = () => {
  const benefits = [
    {
      title: "Real-time Support",
      desc: "Our automated system monitors parking 24/7.",
      icon: Clock,
    },
    {
      className: "border-y border-[#F5E7C6]/5 py-6 my-6",
      title: "Technical Expertise",
      desc: "Direct access to the MERN stack development team.",
      icon: Zap,
    },
    {
      title: "Secure Channels",
      desc: "Your data and queries are always end-to-end encrypted.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section>
      <header className="mb-8">
        <h3 className="text-[#FAF3E1] text-xl font-bold tracking-tight">
          Why contact <span className="text-[#FA8112]">us?</span>
        </h3>
      </header>

      <ul className="flex flex-col list-none p-0">
        {benefits.map((item, index) => (
          <li
            key={index}
            className={`flex gap-4 group ${item.className || ""}`}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#FA8112]/40 group-hover:text-[#FA8112] group-hover:bg-[#FA8112]/10 transition-all duration-500">
              <item.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[#FAF3E1] text-sm font-bold mb-1 group-hover:text-[#FA8112] transition-colors">
                {item.title}
              </h4>
              <p className="text-[#FAF3E1]/40 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyContact;
