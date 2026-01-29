import { UserPlus, MapPinned, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-950">
      {/* MODERN GRADIENT BLOB - Uses standard Tailwind spacing to avoid warnings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-75 bg-cyan-500/10 blur-4xl rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="p-10 md:p-20 rounded-4xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl text-center shadow-2xl">
          {/* MINI BADGE */}
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={12} />
              Future of Mobility
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Join the Smart Parking <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Revolution
            </span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Be part of the digital transformation in Anand. Whether you're a
            driver or a parking owner, SmartPark is designed to make your daily
            commute faster and stress-free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* LINKED TO YOUR MERN AUTH FLOW */}
            <Link
              to="/register"
              className="w-full sm:w-auto px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all group active:scale-95 shadow-lg shadow-cyan-400/20"
            >
              <UserPlus size={20} />
              Register Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            {/* LINKED TO YOUR BOOKING COMPONENT */}
            <Link
              to="/parking"
              className="w-full sm:w-auto px-10 py-4 bg-slate-950 border border-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95"
            >
              <MapPinned size={20} />
              Explore Parking
            </Link>
          </div>

          {/* LOCAL TRUST FOOTER */}
          <p className="mt-12 text-slate-600 text-[11px] font-bold uppercase tracking-[0.4em]">
            Optimizing Urban Space &bull; Gujarat &bull; 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
