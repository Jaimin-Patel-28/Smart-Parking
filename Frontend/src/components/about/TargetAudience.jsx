import { Car, Building2, ShoppingBag, Ticket, Landmark, ChevronRight } from "lucide-react";

const TargetAudience = () => {
  const audiences = [
    {
      title: "Daily Commuters",
      desc: "Anand's office workers and students looking for guaranteed daily spots.",
      icon: Car,
      color: "text-cyan-400",
      tag: "Individuals"
    },
    {
      title: "Shopping Malls",
      desc: "Optimizing customer flow and reducing weekend entrance congestion.",
      icon: ShoppingBag,
      color: "text-emerald-400",
      tag: "Commercial"
    },
    {
      title: "Offices & IT Parks",
      desc: "Structured parking for employees with automated RFID/Digital entry.",
      icon: Building2,
      color: "text-blue-400",
      tag: "Corporate"
    },
    {
      title: "Event Venues",
      desc: "Temporary high-capacity booking for festivals and sports events.",
      icon: Ticket,
      color: "text-amber-400",
      tag: "Temporary"
    },
    {
      title: "City Authorities",
      desc: "Real-time traffic data and urban space utilization analytics.",
      icon: Landmark,
      color: "text-purple-400",
      tag: "Government"
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="container mx-auto max-w-6xl">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Built for Every <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Stakeholder.
              </span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              SmartPark provides tailored solutions for individuals, businesses, 
              and urban planners in the Anand Smart City network.
            </p>
          </div>
          
          <div className="hidden lg:block h-px grow mx-8 bg-slate-800"></div>
          
          <div className="flex justify-center">
            <div className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-widest">
              Market Segments
            </div>
          </div>
        </div>

        {/* AUDIENCE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={index} 
                className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-400/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -bottom-4 -right-4 text-white/5 group-hover:text-cyan-400/5 transition-colors">
                  <Icon size={120} />
                </div>

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-slate-950 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-300 ${audience.color}`}>
                    <Icon size={24} />
                  </div>
                  
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">
                    {audience.tag}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    {audience.title}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400" />
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {audience.desc}
                  </p>
                </div>
              </div>
            ); // Fixed the syntax here: closed the curly brace and added semicolon
          })}
          
          {/* SPECIAL INVITATION CARD */}
          <div className="p-8 rounded-3xl bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-400/20 flex flex-col justify-center items-center text-center space-y-4">
             <h4 className="text-white font-bold">Interested in Partnering?</h4>
             <p className="text-slate-500 text-xs">Join our growing network of smart parking providers in Gujarat.</p>
             <button className="text-cyan-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
               Contact Partner Support &rarr;
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;