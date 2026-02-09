import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Shield,
} from "lucide-react";

const ProblemSolution = () => {
  const points = [
    {
      problem: "Wasting 20+ minutes searching for a parking spot.",
      solution: "Instant real-time availability tracking.",
      icon: Clock,
      img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=400",
    },
    {
      problem: "Complex and confusing manual payment systems.",
      solution: "One-tap secure digital payments.",
      icon: CreditCard,
      img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=400",
    },
    {
      problem: "Uncertainty about vehicle safety in open areas.",
      solution: "Verified and secure parking zones.",
      icon: Shield,
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400",
    },
  ];

  return (
    <section className="bg-slate-950 py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header Animation */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Why <span className="text-cyan-400 italic">SmartPark?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Traditional parking is broken. We're here to fix it with a modern,
            <span className="text-white"> tech-driven approach</span> that saves
            you time and stress.
          </p>
        </div>

        <div className="grid gap-12">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col md:flex-row items-stretch gap-0 rounded-[2.5rem] overflow-hidden border border-slate-800/50 bg-slate-900/50 hover:border-cyan-500/30 transition-all duration-500"
              >
                {/* PROBLEM SIDE - Slides from Left */}
                <div className="flex-1 p-8 lg:p-12 flex items-start gap-6 relative transition-transform duration-700 group-hover:translate-x-1">
                  <div className="relative z-10 p-3 rounded-2xl bg-red-500/10 text-red-500 ring-1 ring-red-500/20">
                    <AlertCircle size={28} className="animate-pulse" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">
                      The Friction
                    </span>
                    <p className="text-xl text-slate-300 mt-3 font-medium leading-snug">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* CENTRAL CONNECTING ICON */}
                <div className="flex md:flex items-center justify-center relative w-full md:w-16 h-16 md:auto">
                  <div className="absolute h-px md:h-full w-full md:w-px bg-slate-800"></div>
                  <div className="z-20 w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 group-hover:rotate-360 transition-all duration-1000 shadow-2xl">
                    <Icon size={24} className="text-cyan-400" />
                  </div>
                </div>

                {/* SOLUTION SIDE - Slides from Right */}
                <div className="flex-1 p-8 lg:p-12 flex items-start gap-6 relative overflow-hidden bg-cyan-400/2 border-t md:border-t-0 md:border-l border-slate-800/50">
                  {/* Background Image/Image Animation */}
                  <img
                    src={item.img}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-overlay scale-110 group-hover:scale-100"
                    alt="Solution visualization"
                  />

                  {/* Animated "Radar" scan effect on solution side */}
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 -translate-x-full group-hover:animate-shimmer"></div>

                  <div className="relative z-10 p-3 rounded-2xl bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/20">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
                      The Fix
                    </span>
                    <p className="text-xl text-white mt-3 font-bold leading-snug">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
