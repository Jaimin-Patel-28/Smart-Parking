import { ArrowRight, Map } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* The Glow Card */}
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-cyan-600 to-blue-700 p-8 md:p-16 text-center shadow-2xl shadow-cyan-500/20">
          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to Park <br className="hidden md:block" />
              <span className="text-slate-900/40">Smarter?</span>
            </h2>

            <p className="text-cyan-50 text-lg md:text-xl mb-10 font-medium opacity-90">
              Join thousands of drivers who have already eliminated the stress
              of finding a parking spot. Start your journey with SmartPark
              today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl">
                Register Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="w-full sm:w-auto px-10 py-4 bg-blue-800/30 text-white font-bold rounded-2xl border border-white/20 hover:bg-blue-800/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                <Map size={20} />
                Explore Parking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
