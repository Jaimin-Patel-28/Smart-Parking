import {
  ShieldCheck,
  Eye,
  Lightbulb,
  Users,
  CheckCircle,
  Smartphone,
} from "lucide-react";

const Values = () => {
  const valuesData = [
    {
      title: "Transparency",
      desc: "Clear pricing and real-time slot availability without hidden fees.",
      icon: Eye,
      color: "text-cyan-400",
    },
    {
      title: "Security",
      desc: "End-to-end encryption for all digital payments and user data.",
      icon: ShieldCheck,
      color: "text-emerald-400",
    },
    {
      title: "Innovation",
      desc: "Using the MERN stack to solve traditional parking problems with automation.",
      icon: Lightbulb,
      color: "text-amber-400",
    },
    {
      title: "User-First Design",
      desc: "A responsive and intuitive interface designed for the commuters of Anand.",
      icon: Smartphone,
      color: "text-blue-400",
    },
    {
      title: "Reliability",
      desc: "99.9% uptime for our booking engine to ensure a stress-free experience.",
      icon: CheckCircle,
      color: "text-indigo-400",
    },
    {
      title: "Community",
      desc: "Building a smarter infrastructure for a more organized Gujarat.",
      icon: Users,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      {/* SECTION HEADER */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          The <span className="text-cyan-400">Values</span> Behind the Code
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          SmartPark isn't just an application; it's a commitment to professional
          standards in urban management and software engineering.
        </p>
      </div>

      {/* VALUES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {valuesData.map((value, index) => {
          const Icon = value.icon;
          return (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-400/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-cyan-400/5 to-transparent rounded-bl-full group-hover:from-cyan-400/10 transition-all"></div>

              <div className="relative z-10">
                <div
                  className={`mb-6 inline-flex p-3 rounded-2xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-300 ${value.color}`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Values;
