import { Atom, Server, Database, Layers, ShieldCheck, Zap } from "lucide-react";

const Technology = () => {
  const stack = [
    {
      name: "React + Vite",
      desc: "High-performance frontend library for a fast, reactive user interface.",
      icon: Atom,
      color: "text-cyan-400",
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      desc: "Utility-first styling for a modern, responsive, and warning-free UI.",
      icon: Zap,
      color: "text-sky-400",
      category: "Styling",
    },
    {
      name: "Node.js & Express",
      desc: "Scalable backend architecture to handle real-time booking logic.",
      icon: Server,
      color: "text-emerald-400",
      category: "Backend",
    },
    {
      name: "MongoDB",
      desc: "NoSQL database for flexible storage of parking slots and user data.",
      icon: Database,
      color: "text-green-500",
      category: "Database",
    },
    {
      name: "API Architecture",
      desc: "RESTful endpoints connecting the SmartPark frontend to cloud services.",
      icon: Layers,
      color: "text-indigo-400",
      category: "Integration",
    },
    {
      name: "JWT & Bcrypt",
      desc: "Industry-standard security for user authentication and smart wallet safety.",
      icon: ShieldCheck,
      color: "text-rose-400",
      category: "Security",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-100 bg-cyan-500/5 blur-4xl rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            The <span className="text-cyan-400">MERN</span> Infrastructure
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            SmartPark is built on a robust, modern tech stack designed for
            scalability, security, and the real-time demands of the Anand Smart
            City network.
          </p>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-4xl bg-slate-900/50 border border-slate-800 hover:border-cyan-400/30 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-300 ${tech.color}`}
                  >
                    <Icon size={28} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* VIVA READY TAG */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Full-Stack Automation Enabled
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
