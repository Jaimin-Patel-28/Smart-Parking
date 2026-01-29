// 1. Changed 'City' to 'Building' (or 'TowerControl')
import {
  Briefcase,
  Building2,
  ShoppingBag,
  Ticket,
  Building,
} from "lucide-react";

const UseCases = () => {
  const users = [
    {
      title: "Daily Commuters",
      desc: "Save time every morning by pre-booking a spot near your office.",
      icon: Briefcase,
    },
    {
      title: "Offices & IT Parks",
      desc: "Manage employee parking slots and visitor access effortlessly.",
      icon: Building2,
    },
    {
      title: "Shopping Malls",
      desc: "Reduce weekend congestion with organized digital slot allocation.",
      icon: ShoppingBag,
    },
    {
      title: "Event Parking",
      desc: "Handle heavy traffic during concerts or sports events with ease.",
      icon: Ticket,
    },
    {
      title: "Smart Cities",
      desc: "Integrate with urban infrastructure for a greener, faster city.",
      icon: Building, // 2. Updated here
    },
  ];

  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Who Is It <span className="text-cyan-400">For?</span>
          </h2>
          <p className="text-slate-400 text-lg">
            SmartPark is designed to scale across various urban environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-1 bg-linear-to-br from-slate-800 to-slate-900 rounded-4xl hover:from-cyan-500/20 hover:to-slate-900 transition-all duration-500"
              >
                <div className="bg-slate-900 rounded-[1.9rem] p-8 h-full border border-slate-800/50 group-hover:border-cyan-500/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:rotate-12 transition-all duration-500">
                    <Icon className="w-7 h-7 text-cyan-400 group-hover:text-slate-900" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="p-8 rounded-4xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
            <p className="text-slate-500 font-medium italic">
              "Your industry here..."
            </p>
            <button className="mt-4 text-cyan-400 font-bold hover:underline">
              Contact for Partnership
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
