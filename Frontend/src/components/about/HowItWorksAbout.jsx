import { Search, MousePointer2, Wallet, Car, ArrowRight } from "lucide-react";

const HowItWorksAbout = () => {
  const steps = [
    {
      title: "Discover Space",
      desc: "Search for available parking locations across Anand in real-time.",
      icon: Search,
    },
    {
      title: "Select & Reserve",
      desc: "Choose your preferred slot and booking duration with a single tap.",
      icon: MousePointer2,
    },
    {
      title: "Digital Payment",
      desc: "Complete your booking securely using the integrated Smart Wallet.",
      icon: Wallet,
    },
    {
      title: "Park & Relax",
      desc: "Navigate to your reserved spot and enjoy a stress-free experience.",
      icon: Car,
    },
  ];

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      {/* SECTION HEADER: Clean Editorial Style */}
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-black text-[#222222] mb-6 tracking-tighter leading-none">
          The{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            SmartPark
          </span>{" "}
          Flow
        </h2>
        <p className="text-[#222222]/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
          Our four-step automated process is designed to save you time and
          optimize urban space in the Smart City network.
        </p>
      </div>

      {/* STEPS GRID: Responsive flow with humanized connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* CONNECTING LINE (Desktop Only): Replaced glow with clean Charcoal line */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-[#222222]/5 z-0">
                  <div className="absolute right-0 -top-2 text-[#222222]/10">
                    <ArrowRight size={20} />
                  </div>
                </div>
              )}

              {/* STEP ICON: Using White on Beige with Orange highlight */}
              <div className="relative z-10 mb-8">
                <div className="w-24 h-24 rounded-4xl bg-white border-2 border-[#222222]/5 flex items-center justify-center shadow-sm group-hover:border-[#FA8112] group-hover:-translate-y-2 transition-all duration-500">
                  <Icon className="text-[#222222] group-hover:text-[#FA8112] w-10 h-10 transition-colors stroke-[1.5px]" />

                  {/* Step Number: Positioned like a hand-drawn note */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-[#222222] text-[#FAF3E1] text-xs font-black flex items-center justify-center shadow-lg">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <h3 className="text-[#222222] font-black text-2xl mb-4 tracking-tight group-hover:text-[#FA8112] transition-colors">
                {step.title}
              </h3>
              <p className="text-[#222222]/50 text-base md:text-lg font-medium leading-relaxed px-2">
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
