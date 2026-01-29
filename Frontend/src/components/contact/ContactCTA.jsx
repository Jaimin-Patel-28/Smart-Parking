import { Headset, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl">
        <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl text-center shadow-2xl">
          {/* SECTION HEADER */}
          <div className="max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Your parking experience <br />
              <span className="text-cyan-400">matters to us.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Still have questions? Our support team in Anand is just a message
              away to ensure your journey is seamless and stress-free.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all group active:scale-95 shadow-lg shadow-cyan-400/20">
              <Headset size={20} />
              Get Support Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>

          {/* TRUST INDICATOR */}
          <div className="mt-10 flex items-center justify-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              Trusted by commuters in Gujarat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
