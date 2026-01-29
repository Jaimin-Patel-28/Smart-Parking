import {
  Clock,
  Smartphone,
  Wallet,
  ShieldCheck,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const WhySmartPark = () => {
  const usps = [
    {
      title: "Real-time Availability",
      desc: "Instant updates on available slots across Anand to save your commuting time.",
      icon: Clock,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      title: "Digital Ticketing",
      desc: "Paperless booking experience with instant QR-based digital tickets on your phone.",
      icon: Smartphone,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Secure Smart Wallet",
      desc: "Fast, cashless transactions with our integrated MERN-based digital wallet.",
      icon: Wallet,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Verified Security",
      desc: "Advanced verification for users and vehicles to ensure a safe parking environment.",
      icon: ShieldCheck,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
    {
      title: "Admin Analytics",
      desc: "Comprehensive data insights for parking owners to optimize space utilization.",
      icon: BarChart3,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-900/50 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-cyan-500/5 blur-4xl rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Why Choose <span className="text-cyan-400">SmartPark?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We are redefining urban space management in Gujarat by combining
            automation with a user-centric digital experience.
          </p>
        </div>

        {/* USP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div
                key={index}
                className="group p-10 rounded-3xl bg-slate-950 border border-slate-800 hover:border-cyan-400/30 transition-all duration-500"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${usp.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 ${usp.color}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  {usp.title}
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400"
                  />
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            );
          })}

          {/* ADDED A SPECIAL "SMART CITY" CARD TO SHOW DEPTH */}
          <div className="p-10 rounded-3xl bg-linear-to-br from-cyan-500/20 to-transparent border border-cyan-400/20 flex flex-col justify-center">
            <h4 className="text-white font-bold text-xl mb-2 italic">
              Smart City Ready
            </h4>
            <p className="text-cyan-400/60 text-xs font-medium uppercase tracking-[0.2em]">
              Anand &bull; Gujarat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySmartPark;
