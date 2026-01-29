import { CheckCircle } from "lucide-react";

const WhyChoose = () => {
  const reasons = [
    {
      title: "Maximum Efficiency",
      desc: "Faster than traditional parking with zero searching time.",
    },
    {
      title: "Paperless System",
      desc: "Digital receipts and e-tickets—no more physical paperwork.",
    },
    {
      title: "High Security",
      desc: "Encrypted transactions and transparent pricing with no hidden fees.",
    },
    {
      title: "Scalable Infrastructure",
      desc: "Designed to be Smart-city ready for modern urban environments.",
    },
    {
      title: "Modern Experience",
      desc: "User-friendly UI built with React for a smooth, fast experience.",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT SIDE: Visual Element */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-[100px] rounded-full"></div>
            <div className="relative border-2 border-slate-800 bg-slate-800/40 p-10 rounded-[40px] backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Built for the <br />
                <span className="text-cyan-400 underline decoration-slate-700 underline-offset-8">
                  Next Generation
                </span>{" "}
                <br />
                of Cities.
              </h2>
              <div className="mt-8 flex gap-4">
                <div className="h-2 w-12 bg-cyan-400 rounded-full"></div>
                <div className="h-2 w-4 bg-slate-700 rounded-full"></div>
                <div className="h-2 w-4 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Reasons List */}
          <div className="flex-1 w-full">
            <h3 className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-6">
              Core Advantages
            </h3>

            <div className="space-y-6">
              {reasons.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="mt-1">
                    <CheckCircle className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
