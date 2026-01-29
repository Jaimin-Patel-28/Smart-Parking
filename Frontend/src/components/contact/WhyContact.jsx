import {
  ShieldCheck,
  Zap,
  Headphones,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const WhyContact = () => {
  const points = [
    {
      title: "Quick Response Support",
      desc: "Our automated system in Anand ensures most queries are resolved within 2 hours.",
      icon: Zap,
      color: "text-amber-400",
    },
    {
      title: "Secure Data Handling",
      desc: "Your booking and payment details are protected with industry-standard encryption.",
      icon: ShieldCheck,
      color: "text-emerald-400",
    },
    {
      title: "Professional Assistance",
      desc: "Direct access to technical experts for partnership or API integration queries.",
      icon: Headphones,
      color: "text-cyan-400",
    },
    {
      title: "Dedicated Solutions",
      desc: "Customized parking management for local businesses and residential hubs.",
      icon: MapPin,
      color: "text-blue-400",
    },
  ];

  return (
    <section className="space-y-8">
      {/* SECTION HEADER */}
      <div className="space-y-3">
        <h2 className="text-3xl font-black text-white tracking-tight">
          Why Contact <span className="text-cyan-400">SmartPark?</span>
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
          We are committed to building a smarter, more efficient urban
          infrastructure starting right here in Gujarat.
        </p>
      </div>

      {/* POINTS LIST */}
      <div className="space-y-5">
        {points.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={index}
              className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-400/20 transition-all duration-300"
            >
              <div
                className={`mt-1 p-2 rounded-xl bg-slate-900 shadow-inner group-hover:scale-110 transition-transform duration-300 ${point.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  {point.title}
                  <CheckCircle2
                    size={12}
                    className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* TRUST BADGE */}
      <div className="pt-4 flex items-center gap-3">
        <div className="h-px grow bg-linear-to-r from-slate-800 to-transparent"></div>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
          Certified Smart Solution
        </span>
      </div>
    </section>
  );
};

export default WhyContact;
