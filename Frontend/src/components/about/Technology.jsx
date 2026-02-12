import { Atom, Server, Database, Layers, ShieldCheck, Zap } from "lucide-react";

const Technology = () => {
  const stack = [
    {
      name: "React + Vite",
      desc: "High-performance frontend library for a fast, reactive user interface.",
      icon: Atom,
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      desc: "Utility-first styling for a modern, responsive, and clean UI.",
      icon: Zap,
      category: "Styling",
    },
    {
      name: "Node.js & Express",
      desc: "Scalable backend architecture to handle real-time booking logic.",
      icon: Server,
      category: "Backend",
    },
    {
      name: "MongoDB",
      desc: "NoSQL database for flexible storage of parking slots and user data.",
      icon: Database,
      category: "Database",
    },
    {
      name: "API Architecture",
      desc: "RESTful endpoints connecting the SmartPark frontend to cloud services.",
      icon: Layers,
      category: "Integration",
    },
    {
      name: "JWT & Bcrypt",
      desc: "Industry-standard security for user authentication and smart wallet safety.",
      icon: ShieldCheck,
      category: "Security",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAF3E1] relative overflow-hidden">
      {/* 1. BACKGROUND TEXTURE: Subtle paper grain */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        {/* SECTION HEADER: Clean & Authoritative */}
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black text-[#222222] tracking-tighter leading-none">
            The{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              MERN
            </span>{" "}
            Infrastructure
          </h2>
          <p className="text-[#222222]/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            SmartPark is built on a robust, modern tech stack designed for
            scalability, security, and the real-time demands of the Anand Smart
            City network.
          </p>
        </div>

        {/* TECH GRID: Clean cards with high-contrast borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="group p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-10">
                  {/* ICON BOX: Signature Beige to Orange transition */}
                  <div className="p-4 rounded-2xl bg-[#F5E7C6] text-[#222222] group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500 shadow-sm">
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FA8112] bg-[#FAF3E1] px-4 py-1.5 rounded-lg border border-[#222222]/5">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#222222] mb-4 tracking-tight group-hover:text-[#FA8112] transition-colors">
                  {tech.name}
                </h3>

                <p className="text-[#222222]/50 text-base md:text-lg font-medium leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* VIVA READY TAG: Simplified status bar */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-white border-2 border-[#222222] text-[#222222] text-[11px] font-black uppercase tracking-[0.3em] shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FA8112] animate-pulse"></span>
            Full-Stack Automation Enabled
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
