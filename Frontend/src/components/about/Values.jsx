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
    },
    {
      title: "Security",
      desc: "End-to-end encryption for all digital payments and user data.",
      icon: ShieldCheck,
    },
    {
      title: "Innovation",
      desc: "Using the MERN stack to solve traditional parking problems with automation.",
      icon: Lightbulb,
    },
    {
      title: "User-First Design",
      desc: "A responsive and intuitive interface designed for the commuters of Anand.",
      icon: Smartphone,
    },
    {
      title: "Reliability",
      desc: "99.9% uptime for our booking engine to ensure a stress-free experience.",
      icon: CheckCircle,
    },
    {
      title: "Community",
      desc: "Building a smarter infrastructure for a more organized Gujarat.",
      icon: Users,
    },
  ];

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      {/* SECTION HEADER: Clean & Balanced */}
      <div className="mb-20 text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-black text-[#222222] mb-6 tracking-tighter leading-none">
          The{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Values
          </span>{" "}
          Behind the Code
        </h2>
        <p className="text-[#222222]/60 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
          SmartPark isn't just an application; it's a commitment to professional
          standards in urban management and software engineering.
        </p>
      </div>

      {/* VALUES GRID: High-contrast minimalist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {valuesData.map((value, index) => {
          const Icon = value.icon;
          return (
            <div
              key={index}
              className="group p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:shadow-[#222222]/5"
            >
              <div className="relative z-10">
                <div className="mb-8 inline-flex p-4 rounded-2xl bg-[#F5E7C6] text-[#222222] group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500 shadow-sm">
                  <Icon size={28} strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-black text-[#222222] mb-4 tracking-tight">
                  {value.title}
                </h3>

                <p className="text-[#222222]/50 text-base md:text-lg font-medium leading-relaxed">
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
