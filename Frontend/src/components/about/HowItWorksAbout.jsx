import { Search, MousePointer2, Wallet, Car, ArrowRight } from "lucide-react";

const HowItWorksAbout = () => {
  const steps = [
    {
      title: "Discover Space",
      desc: "Search for available parking locations across Anand in real-time.",
      icon: Search,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Select & Reserve",
      desc: "Choose your preferred slot and booking duration with a single tap.",
      icon: MousePointer2,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Digital Payment",
      desc: "Complete your booking securely using the integrated Smart Wallet.",
      icon: Wallet,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Park & Relax",
      desc: "Navigate to your reserved spot and enjoy a stress-free experience.",
      icon: Car,
      color: "from-purple-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          The <span className="text-cyan-400">SmartPark</span> Flow
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Our four-step automated process is designed to save you time and
          optimize urban space in the Smart City network.
        </p>
      </div>

      {/* STEPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center"
            >
              {/* CONNECTING ARROW (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[70%] w-full h-px bg-linear-to-r from-slate-700 to-transparent z-0">
                  <ArrowRight
                    size={16}
                    className="absolute -right-2 -top-2 text-slate-800"
                  />
                </div>
              )}

              {/* STEP NUMBER & ICON */}
              <div className="relative z-10 mb-6">
                <div
                  className={`w-20 h-20 rounded-3xl bg-linear-to-br ${step.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <div className="w-full h-full bg-slate-950 rounded-[1.4rem] flex items-center justify-center relative overflow-hidden">
                    <Icon className="text-white w-8 h-8 relative z-10" />
                    {/* Background Number */}
                    <span className="absolute -bottom-2 -right-1 text-5xl font-black text-white/5 italic">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorksAbout;
