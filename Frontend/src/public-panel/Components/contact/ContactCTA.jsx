import React from "react";
import { Headphones, ArrowRight, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-16 px-6 overflow-hidden bg-[#222222]">
      {/* SOFT AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FA8112]/5 blur-[100px] rounded-full pointer-events-none" />

      <article className="relative z-10 max-w-4xl mx-auto text-center rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-10 md:p-16 overflow-hidden group">
        {/* SECTION ICON */}
        <header className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-[#2a2a2a] border border-[#F5E7C6]/10 flex items-center justify-center text-[#FA8112] shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Headphones size={28} strokeWidth={1.5} />
          </div>
        </header>

        {/* CONTENT */}
        <section className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF3E1] leading-tight mb-4 tracking-tight">
            Still have <span className="text-[#FA8112]">Questions?</span>
          </h2>
          <p className="text-[#FAF3E1]/40 text-sm md:text-base leading-relaxed mb-10">
            Our technical support team is available for real-time
            troubleshooting and partnership inquiries across the Gujarat Smart
            City network.
          </p>
        </section>

        {/* ACTION BUTTONS */}
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/public/contact')}
            className="bg-[#FA8112] text-[#222222] px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(250,129,18,0.3)] hover:-translate-y-1 transition-all active:scale-95 group/btn"
          >
            Open Support Ticket
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <button 
            onClick={() => navigate('/public/about')}
            className="bg-[#FAF3E1]/[0.03] text-[#FAF3E1] border border-[#F5E7C6]/10 px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#FAF3E1]/[0.08] transition-all"
          >
            <LifeBuoy size={18} className="text-[#FA8112]" />
            Documentation
          </button>
        </nav>

        {/* UPTIME BADGE */}
        <footer className="mt-10 pt-8 border-t border-[#F5E7C6]/5 flex justify-center">
          <div className="flex items-center gap-2 text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            Live System Status: Optimal
          </div>
        </footer>
      </article>

      {/* SUBTLE BOTTOM BORDER */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5E7C6]/5 to-transparent" />
    </section>
  );
};

export default ContactCTA;
