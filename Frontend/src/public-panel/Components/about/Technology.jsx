import React from "react";

const Technology = () => {
  const stack = [
    {
      name: "React + Vite",
      desc: "High-performance frontend library for a fast, reactive user interface.",
      image: "https://cdn.simpleicons.org/react/61DAFB",
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      desc: "Utility-first styling for a modern, responsive, and clean UI.",
      image: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      category: "Styling",
    },
    {
      name: "Node.js & Express",
      desc: "Scalable backend architecture to handle real-time booking logic.",
      image: "https://cdn.simpleicons.org/nodedotjs/339933",
      category: "Backend",
    },
    {
      name: "MongoDB",
      desc: "NoSQL database for flexible storage of parking slots and user data.",
      image: "https://cdn.simpleicons.org/mongodb/47A248",
      category: "Database",
    },
    {
      name: "Cloud Architecture",
      desc: "RESTful endpoints connecting the SmartPark frontend to cloud services.",
      image: "https://cdn.simpleicons.org/googlecloud/4285F4",
      category: "Integration",
    },
    {
      name: "JWT & Bcrypt",
      desc: "Industry-standard security for user authentication and smart wallet safety.",
      image: "https://cdn.simpleicons.org/jsonwebtokens/000000",
      category: "Security",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#222222] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* COMPACT HEADER */}
        <header className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF3E1] mb-6 leading-tight">
            The <span className="text-[#FA8112]">MERN</span> Infrastructure
          </h2>
          <p className="text-[#FAF3E1]/50 text-sm md:text-base max-w-2xl leading-relaxed">
            SmartPark is built on a robust, modern tech stack designed for
            scalability, security, and the real-time demands of the Anand Smart
            City network.
          </p>
        </header>

        {/* TECH GRID */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
          {stack.map((tech, index) => (
            <li key={index} className="group">
              <article className="h-full bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 p-8 rounded-[2rem] hover:border-[#FA8112]/30 hover:bg-[#FAF3E1]/[0.04] transition-all duration-500 relative">
                <header className="flex justify-between items-start mb-6">
                  {/* CATEGORY TAG */}
                  <small className="bg-[#FAF3E1]/[0.05] text-[#FAF3E1]/40 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#F5E7C6]/5 group-hover:text-[#FA8112] transition-colors">
                    {tech.category}
                  </small>

                  {/* SMALL BACKGROUND IMAGE CONTAINER (Replaced Icon) */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#2a2a2a] border border-[#F5E7C6]/10 group-hover:border-[#FA8112]/40 transition-all duration-500">
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-contain p-2 scale-70 group-hover:scale-50 transition-transform duration-500"
                      style={{ backgroundImage: `url(${tech.image})` }}
                    />
                    {/* Subtle Overlay to match theme */}
                    <div className="absolute inset-0 bg-[#222222]/10 group-hover:bg-transparent transition-colors" />
                  </div>
                </header>

                <section>
                  <h3 className="text-[#FAF3E1] text-lg font-bold mb-3 group-hover:text-[#FA8112] transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[#FAF3E1]/40 text-xs leading-relaxed group-hover:text-[#FAF3E1]/60">
                    {tech.desc}
                  </p>
                </section>
              </article>
            </li>
          ))}
        </ul>

        {/* FOOTER BADGE */}
        <footer className="mt-16 flex justify-center">
          <aside className="inline-flex items-center gap-3 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-5 py-2.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]"></span>
            </span>
            <span className="text-[#FAF3E1]/60 text-xs font-bold tracking-widest uppercase">
              Full-Stack Automation Enabled
            </span>
          </aside>
        </footer>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#FA8112]/[0.02] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Technology;
