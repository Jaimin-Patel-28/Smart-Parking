import React from "react";
import { ArrowRight, Map, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#222222] py-24 px-6 overflow-hidden">
      {/* THE CONTENT CARD */}
      <article className="relative max-w-5xl mx-auto overflow-hidden rounded-[3rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 md:p-20 text-center shadow-2xl">
        {/* DECORATIVE BACKGROUND GLOWS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#FA8112]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FA8112]/5 blur-[100px] rounded-full pointer-events-none" />

        <header className="relative z-10 max-w-2xl mx-auto">
          {/* SECTION TAG */}
          <aside className="inline-flex items-center gap-2 bg-[#FA8112]/10 border border-[#FA8112]/20 px-4 py-2 rounded-full mb-8">
            <Sparkles size={14} className="text-[#FA8112]" />
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Get Started
            </span>
          </aside>

          {/* MAIN HEADING */}
          <h2 className="text-5xl md:text-7xl font-bold text-[#FAF3E1] leading-[1.1] mb-8 tracking-tighter">
            Ready to Park <br />
            <span className="text-[#FA8112]">Smarter?</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-[#FAF3E1]/60 text-lg md:text-xl leading-relaxed mb-12">
            Join thousands of drivers who have already eliminated the stress of
            finding a parking spot. Start your journey with SmartPark today.
          </p>
        </header>

        {/* ACTION BUTTONS */}
        <nav className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => navigate('/auth/login')}
            className="w-full sm:w-auto bg-[#FA8112] text-[#222222] px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(250,129,18,0.4)] hover:-translate-y-1 transition-all active:scale-95 group"
          >
            Register Now
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <button 
            onClick={() => navigate('/user/find-parking')}
            className="w-full sm:w-auto bg-[#FAF3E1]/[0.05] text-[#FAF3E1] border border-[#F5E7C6]/10 px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#FAF3E1]/10 transition-all group"
          >
            <Map size={20} className="text-[#FA8112]" />
            Explore Parking
          </button>
        </nav>

        {/* SUBTLE FOOTER TEXT */}
        <p className="relative z-10 mt-12 text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.4em]">
          No credit card required to explore
        </p>
      </article>

      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5E7C6]/5 to-transparent" />
    </section>
  );
};

export default FinalCTA;
