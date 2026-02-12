import {
  Car,
  Building2,
  ShoppingBag,
  Ticket,
  Landmark,
  ChevronRight,
} from "lucide-react";

const TargetAudience = () => {
  const audiences = [
    {
      title: "Daily Commuters",
      desc: "Anand's office workers and students looking for guaranteed daily spots.",
      icon: Car,
      tag: "Individuals",
    },
    {
      title: "Shopping Malls",
      desc: "Optimizing customer flow and reducing weekend entrance congestion.",
      icon: ShoppingBag,
      tag: "Commercial",
    },
    {
      title: "Offices & IT Parks",
      desc: "Structured parking for employees with automated RFID/Digital entry.",
      icon: Building2,
      tag: "Corporate",
    },
    {
      title: "Event Venues",
      desc: "Temporary high-capacity booking for festivals and sports events.",
      icon: Ticket,
      tag: "Temporary",
    },
    {
      title: "City Authorities",
      desc: "Real-time traffic data and urban space utilization analytics.",
      icon: Landmark,
      tag: "Government",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#F5E7C6]">
      <div className="container mx-auto max-w-screen-2xl">
        {/* SECTION HEADER: Clean & Balanced Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-6 text-center md:text-left max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-[#222222] leading-none tracking-tighter">
              Built for Every <br />
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Stakeholder.
              </span>
            </h2>
            <p className="text-[#222222]/60 max-w-md mx-auto md:mx-0 text-lg font-medium leading-relaxed">
              SmartPark provides tailored solutions for individuals, businesses,
              and urban planners in the Anand Smart City network.
            </p>
          </div>

          <div className="hidden lg:block h-0.5 grow mx-12 bg-[#222222]/5"></div>

          <div className="flex justify-center">
            <div className="px-6 py-3 rounded-xl bg-white border-2 border-[#222222] text-[#222222] text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">
              Market Segments
            </div>
          </div>
        </div>

        {/* AUDIENCE GRID: Responsive 1/2/3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="group p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:shadow-[#222222]/5"
              >
                {/* Visual Depth: Background Icon Reveal */}
                <div className="absolute -bottom-6 -right-6 text-[#222222]/5 group-hover:text-[#FA8112]/5 transition-colors duration-700">
                  <Icon size={160} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  {/* Icon Box: Signature Beige to Orange transition */}
                  <div className="inline-flex p-4 rounded-2xl bg-[#F5E7C6] text-[#222222] mb-8 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] group-hover:-rotate-6 transition-all duration-500 shadow-sm">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-[#FA8112] mb-3">
                    {audience.tag}
                  </span>

                  <h3 className="text-2xl font-black text-[#222222] mb-4 tracking-tight flex items-center justify-between">
                    {audience.title}
                    <ChevronRight
                      size={20}
                      strokeWidth={3}
                      className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#FA8112]"
                    />
                  </h3>

                  <p className="text-[#222222]/50 text-base md:text-lg font-medium leading-relaxed">
                    {audience.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* SPECIAL INVITATION CARD: High Contrast Orange Block */}
          <div className="p-10 rounded-[2.5rem] bg-[#222222] border-2 border-[#222222] flex flex-col justify-center items-center text-center space-y-6 shadow-xl shadow-[#222222]/10">
            <h4 className="text-[#FAF3E1] font-black text-2xl tracking-tight">
              Interested in Partnering?
            </h4>
            <p className="text-[#FAF3E1]/60 text-base font-medium leading-relaxed">
              Join our growing network of smart parking providers in Gujarat.
            </p>
            <button className="px-8 py-3 rounded-xl bg-[#FA8112] text-[#FAF3E1] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#FAF3E1] hover:text-[#222222] transition-all duration-300">
              Contact Partner Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
