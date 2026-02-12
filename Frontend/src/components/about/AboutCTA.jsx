import { UserPlus, MapPinned, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-[#FAF3E1]">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="p-12 md:p-24 rounded-[3.5rem] bg-[#222222] text-center shadow-[0_40px_100px_-15px_rgba(34,34,34,0.3)] relative overflow-hidden">
          {/* Subtle Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

          {/* MINI BADGE: Clean Beige Pill */}
          <div className="flex justify-center mb-8 relative z-10">
            <span className="flex items-center gap-3 px-6 py-2 rounded-xl bg-[#FAF3E1]/10 border border-[#FAF3E1]/20 text-[#FAF3E1] text-[11px] font-black uppercase tracking-[0.3em]">
              <Sparkles size={14} className="text-[#FA8112]" />
              Future of Mobility
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black text-[#FAF3E1] mb-8 tracking-tighter leading-[0.9] relative z-10">
            Join the Smart Parking <br />
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Revolution
            </span>
          </h2>

          <p className="text-[#FAF3E1]/60 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed relative z-10">
            Be part of the digital transformation in Anand. Whether you're a
            driver or a parking owner, SmartPark is designed to make your daily
            commute faster and stress-free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Link
              to="/register"
              className="w-full sm:w-auto px-12 py-5 bg-[#FA8112] text-[#FAF3E1] font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all group hover:bg-[#FAF3E1] hover:text-[#222222] active:scale-95 shadow-xl shadow-[#FA8112]/20"
            >
              <UserPlus size={22} strokeWidth={2.5} />
              Register Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/parking"
              className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-[#FAF3E1]/20 text-[#FAF3E1] font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:border-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-all active:scale-95"
            >
              <MapPinned size={22} strokeWidth={2.5} />
              Explore Parking
            </Link>
          </div>

          {/* LOCAL TRUST FOOTER */}
          <p className="mt-16 text-[#FAF3E1]/20 text-[11px] font-black uppercase tracking-[0.4em] relative z-10">
            Optimizing Urban Space &bull; Gujarat &bull; 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
