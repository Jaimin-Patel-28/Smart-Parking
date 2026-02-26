import { MessageSquare, MousePointer2, Sparkles } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#FAF3E1]">
      <div className="container mx-auto max-w-screen-2xl relative z-10 text-center">
        {/* BREADCRUMB BADGE */}
        <div className="flex justify-center mb-8">
          <span className="flex items-center gap-3 px-6 py-2 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#222222] text-[11px] font-black uppercase tracking-[0.3em] shadow-sm">
            <Sparkles size={16} className="text-[#FA8112] animate-pulse" />
            Support Center
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#222222] mb-10 tracking-tighter leading-[0.9]">
          How Can We Help <br />
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            You Today?
          </span>
        </h1>

        <p className="text-[#222222]/60 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
          Whether you're a commuter in{" "}
          <strong className="text-[#222222]">Anand</strong> or a partner joining
          our network, our team is ready to solve your queries.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 text-[#222222]/40 text-sm font-black uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-[#FA8112]" />
            <span>24/7 Automated Support</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#222222]/10"></div>
          <div className="flex items-center gap-3">
            <MousePointer2 size={18} className="text-[#FA8112]" />
            <span>Instant Booking Help</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
