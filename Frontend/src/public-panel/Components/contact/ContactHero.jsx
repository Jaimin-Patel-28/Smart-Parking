import React from "react";
import { MessageSquare } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-44 md:pt-64 md:pb-64 bg-[#222222] overflow-hidden text-center">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#FA8112]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* SMALL BADGE */}
        <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
          <MessageSquare size={14} className="text-[#FA8112]" />
          <span className="text-[#FAF3E1]/80 text-[10px] font-bold tracking-[0.2em] uppercase">
            Get In Touch
          </span>
        </aside>

        {/* MAIN HEADING */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] leading-tight mb-6 tracking-tight">
          How can we <span className="text-[#FA8112]">help you?</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-[#FAF3E1]/50 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          Have questions about parking spots in Anand or our MERN
          infrastructure? Our team is here to provide real-time support and
          technical guidance.
        </p>
      </div>

      {/* Tapered bottom fade to blend with the cards */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#222222] to-transparent" />
    </section>
  );
};

export default ContactHero;
