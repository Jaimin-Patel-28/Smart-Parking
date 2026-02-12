import {
  Clock,
  Smartphone,
  Wallet,
  ShieldCheck,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const WhyWhySmartPark = () => {
  const usps = [
    {
      title: "Real-time Availability",
      desc: "Instant updates on available slots across Anand to save your commuting time.",
      icon: Clock,
    },
    {
      title: "Digital Ticketing",
      desc: "Paperless booking experience with instant QR-based digital tickets on your phone.",
      icon: Smartphone,
    },
    {
      title: "Secure Smart Wallet",
      desc: "Fast, cashless transactions with our integrated MERN-based digital wallet.",
      icon: Wallet,
    },
    {
      title: "Verified Security",
      desc: "Advanced verification for users and vehicles to ensure a safe parking environment.",
      icon: ShieldCheck,
    },
    {
      title: "Admin Analytics",
      desc: "Comprehensive data insights for parking owners to optimize space utilization.",
      icon: BarChart3,
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAF3E1] relative overflow-hidden">
      {/* 1. BACKGROUND TEXTURE: Subtle paper grain for a humanized feel */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        {/* SECTION HEADER: Clean & Bold */}
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black text-[#222222] tracking-tighter leading-none">
            Why Choose{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              SmartPark?
            </span>
          </h2>
          <p className="text-[#222222]/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            We are redefining urban space management in Gujarat by combining
            automation with a user-centric digital experience.
          </p>
        </div>

        {/* USP GRID: Clean cards with high-contrast borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div
                key={index}
                className="group p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#222222]/5"
              >
                {/* ICON BOX: Using Beige background and Orange highlights */}
                <div className="w-16 h-16 rounded-2xl bg-[#F5E7C6] flex items-center justify-center mb-8 group-hover:bg-[#FA8112] transition-colors duration-500 shadow-sm">
                  <Icon className="w-8 h-8 text-[#222222] group-hover:text-[#FAF3E1] transition-colors duration-300 stroke-[1.5px]" />
                </div>

                <h3 className="text-2xl font-black text-[#222222] mb-4 tracking-tight flex items-center justify-between">
                  {usp.title}
                  <ChevronRight
                    size={20}
                    strokeWidth={3}
                    className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FA8112]"
                  />
                </h3>

                <p className="text-[#222222]/50 text-base md:text-lg font-medium leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            );
          })}

          {/* SIGNATURE "SMART CITY" CARD: High contrast Orange block */}
          <div className="p-10 rounded-[2.5rem] bg-[#FA8112] border-2 border-[#FA8112] flex flex-col justify-center shadow-xl shadow-[#FA8112]/20">
            <h4 className="text-[#FAF3E1] font-black text-3xl mb-3 tracking-tighter italic font-serif leading-none">
              Smart City Ready
            </h4>
            <p className="text-[#FAF3E1]/70 text-xs font-black uppercase tracking-[0.3em]">
              Anand &bull; Gujarat
            </p>
            {/* Subtle separator for depth */}
            <div className="h-1 w-12 bg-[#FAF3E1] rounded-full mt-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWhySmartPark;
