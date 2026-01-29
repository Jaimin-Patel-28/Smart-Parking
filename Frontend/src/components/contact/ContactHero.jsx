import { MessageSquare, MousePointer2, Sparkles } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-900">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        {/* BREADCRUMB / MINI-TAG */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            Support Center
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
          How Can We Help <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
            You Today?
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether you're a commuter in Anand looking for a spot or a partner
          joining our Smart City Network, our team is ready to solve your
          queries faster than you can park.
        </p>

        {/* QUICK STATS / INFO PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-cyan-400/50" />
            <span>24/7 Automated Support</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <MousePointer2 size={18} className="text-cyan-400/50" />
            <span>Instant Booking Help</span>
          </div>
        </div>
      </div>

      {/* DECORATIVE MESH (Optional) */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-800 to-transparent"></div>
    </section>
  );
};

export default ContactHero;
