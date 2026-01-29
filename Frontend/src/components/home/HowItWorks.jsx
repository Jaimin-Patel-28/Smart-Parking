import { Search, CalendarCheck, CreditCard, Car } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Search Parking",
      description:
        "Enter your destination to see real-time availability in nearby spots.",
      icon: Search,
    },
    {
      title: "Book Slot",
      description:
        "Select your preferred time slot and reserve it instantly from your phone.",
      icon: CalendarCheck,
    },
    {
      title: "Pay Digitally",
      description:
        "Complete your booking with safe, encrypted UPI or Card payments.",
      icon: CreditCard,
    },
    {
      title: "Park Easily",
      description:
        "Navigate to your spot using our map and enjoy stress-free parking.",
      icon: Car,
    },
  ];

  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Four Simple <span className="text-cyan-400">Steps</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Getting your spot is faster than finding your car keys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-700 z-0"></div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group relative"
              >
                {/* Step Number Circle */}
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 group-hover:border-cyan-400 group-hover:bg-slate-900 transition-all duration-300 relative z-10 shadow-xl">
                  <Icon
                    size={28}
                    className="text-cyan-400 group-hover:scale-110 transition-transform"
                  />

                  {/* Step Count Badge */}
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-cyan-400 text-slate-900 font-bold flex items-center justify-center text-sm border-4 border-slate-900">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed px-4">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
