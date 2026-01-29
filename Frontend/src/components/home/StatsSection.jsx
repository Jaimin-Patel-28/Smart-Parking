import { Users, MapPin, Clock, ShieldCheck } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { label: "Happy Users", value: "10,000+", icon: Users },
    { label: "Parking Locations", value: "500+", icon: MapPin },
    { label: "Time Saved", value: "99%", icon: Clock },
    { label: "Secure Payments", value: "100%", icon: ShieldCheck },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon; // Define the component for rendering
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="p-4 rounded-2xl bg-slate-900 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>

                  <h3 className="text-4xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.value}
                  </h3>
                  <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">
                    {item.label}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-cyan-400 transition-colors duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
