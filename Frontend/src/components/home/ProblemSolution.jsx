// const ProblemSolution = () => {
//   return (
//     <section className="problem-solution">
//       <div className="problems">
//         <h3>Problems</h3>
//         <ul>
//           <li>Finding parking wastes time</li>
//           <li>Manual tickets & cash payments</li>
//           <li>No real-time slot info</li>
//         </ul>
//       </div>

//       <div className="solutions">
//         <h3>SmartPark Solution</h3>
//         <ul>
//           <li>Real-time slot availability</li>
//           <li>Digital tickets & wallet</li>
//           <li>Smart dashboard</li>
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default ProblemSolution;

import { AlertCircle, CheckCircle2, Search, Clock, CreditCard, Shield } from "lucide-react";

const ProblemSolution = () => {
  const points = [
    {
      problem: "Wasting 20+ minutes searching for a parking spot.",
      solution: "Instant real-time availability tracking.",
      icon: Clock,
    },
    {
      problem: "Complex and confusing manual payment systems.",
      solution: "One-tap secure digital payments.",
      icon: CreditCard,
    },
    {
      problem: "Uncertainty about vehicle safety in open areas.",
      solution: "Verified and secure parking zones.",
      icon: Shield,
    },
  ];

  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why <span className="text-cyan-400">SmartPark?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Traditional parking is broken. We're here to fix it with a modern, 
            tech-driven approach.
          </p>
        </div>

        <div className="grid gap-8">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col md:flex-row items-stretch gap-0 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
              >
                {/* PROBLEM SIDE */}
                <div className="flex-1 bg-slate-800/50 p-8 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-500 mt-1">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">The Problem</span>
                    <p className="text-lg text-slate-300 mt-2 font-medium">{item.problem}</p>
                  </div>
                </div>

                {/* DIVIDER / ICON */}
                <div className="hidden md:flex items-center justify-center bg-slate-800 relative w-12">
                   <div className="z-10 w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                      <Icon size={20} className="text-slate-900" />
                   </div>
                   <div className="absolute h-full w-px bg-slate-700"></div>
                </div>

                {/* SOLUTION SIDE */}
                <div className="flex-1 bg-cyan-400/5 p-8 flex items-start gap-4 border-t md:border-t-0 md:border-l border-slate-800">
                  <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 mt-1">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Our Solution</span>
                    <p className="text-lg text-white mt-2 font-semibold">{item.solution}</p>
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