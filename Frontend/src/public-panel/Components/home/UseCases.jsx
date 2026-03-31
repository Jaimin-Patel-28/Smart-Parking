import React from "react";
import {
  Briefcase,
  Building2,
  ShoppingBag,
  Ticket,
  Building,
  ArrowUpRight,
} from "lucide-react";

const UseCases = () => {
  const users = [
    {
      title: "Daily Commuters",
      desc: "Save time every morning by pre-booking a spot near your office.",
      icon: Briefcase,
      img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    },
    {
      title: "Offices & IT Parks",
      desc: "Manage employee parking slots and visitor access effortlessly.",
      icon: Building2,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    },
    {
      title: "Shopping Malls",
      desc: "Reduce weekend congestion with organized digital slot allocation.",
      icon: ShoppingBag,
      img: "https://images.unsplash.com/photo-1575729312527-1bdecaae271e",
    },
    {
      title: "Event Parking",
      desc: "Handle heavy traffic during concerts or sports events with ease.",
      icon: Ticket,
      img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    },
    {
      title: "Smart Cities",
      desc: "Integrate with urban infrastructure for a greener, faster city.",
      icon: Building,
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
  ];

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <header className="mb-16">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Versatility
            </span>
          </aside>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] leading-tight mb-6">
            Built for <br />
            <span className="text-[#FA8112]">every scenario.</span>
          </h2>
          <p className="text-[#FAF3E1]/50 text-lg max-w-xl leading-relaxed">
            A flexible platform designed to scale across urban environments and
            specialized sectors.
          </p>
        </header>

        {/* USE CASES GRID */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
          {users.map((item, index) => (
            <li
              key={index}
              className={`group ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <article className="relative h-[350px] md:h-[400px] rounded-[2.5rem] overflow-hidden border border-[#F5E7C6]/10 transition-all duration-500 hover:border-[#FA8112]/40 shadow-2xl">
                {/* BACKGROUND IMAGE WITH OVERLAY */}
                <figure className="absolute inset-0 z-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                </figure>

                {/* CONTENT OVERLAY */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                  <header className="flex justify-between items-start">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#FA8112] text-[#222222] shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <item.icon size={24} />
                    </div>
                    <div className="p-3 rounded-full bg-[#FAF3E1]/10 border border-[#F5E7C6]/20 text-[#FAF3E1] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <ArrowUpRight size={20} />
                    </div>
                  </header>

                  <section>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#FAF3E1] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#FAF3E1]/60 text-sm md:text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                      {item.desc}
                    </p>
                  </section>
                </div>

                {/* DECORATIVE ACCENT LINE */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#FA8112] transition-all duration-700 group-hover:w-full" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UseCases;
