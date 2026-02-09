import { Users, MapPin, Clock, ShieldCheck } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Happy Users",
      value: "10,000+",
      icon: Users,
      color: "from-cyan-500",
    },
    {
      label: "Parking Locations",
      value: "500+",
      icon: MapPin,
      color: "from-blue-500",
    },
    {
      label: "Time Saved",
      value: "99%",
      icon: Clock,
      color: "from-indigo-500",
    },
    {
      label: "Secure Payments",
      value: "100%",
      icon: ShieldCheck,
      color: "from-emerald-500",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 relative overflow-hidden">
      {/* Subtle Background Image/Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                // Added staggering animation via delay classes
                className={`group relative p-8 rounded-4xl bg-slate-800/20 border border-slate-700/40 hover:border-cyan-500/50 
                           transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/10
                           animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Overlay: Modern abstract circuit/map lines appearing on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-4xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=500"
                    className="w-full h-full object-cover mix-blend-overlay scale-150 group-hover:scale-100 transition-transform duration-1000"
                    alt="abstract background"
                  />
                </div>

                {/* Background Glow - Dynamic based on item color */}
                <div
                  className={`absolute inset-0 rounded-4xl bg-linear-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Container with bouncy hover */}
                  <div className="p-5 rounded-2xl bg-slate-950 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl border border-slate-800 group-hover:border-cyan-500/30">
                    <Icon className="w-10 h-10 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Value - Animated Number Feel */}
                  <h3 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tighter group-hover:text-cyan-300 transition-colors">
                    {item.value}
                  </h3>

                  {/* Label */}
                  <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] lg:text-xs group-hover:text-slate-300 transition-colors">
                    {item.label}
                  </p>
                </div>

                {/* Animated Corner Ornament */}
                <div className="absolute top-6 right-6 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 delay-75"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
