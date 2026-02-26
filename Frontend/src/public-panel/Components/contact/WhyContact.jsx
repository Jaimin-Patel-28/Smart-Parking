import {
  ShieldCheck,
  Zap,
  Headphones,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const WhyContact = () => {
  const points = [
    {
      title: "Quick Response Support",
      desc: "Our automated system in Anand ensures most queries are resolved within 2 hours.",
      icon: Zap,
    },
    {
      title: "Secure Data Handling",
      desc: "Your booking and payment details are protected with industry-standard encryption.",
      icon: ShieldCheck,
    },
    {
      title: "Professional Assistance",
      desc: "Direct access to technical experts for partnership or API integration queries.",
      icon: Headphones,
    },
    {
      title: "Dedicated Solutions",
      desc: "Customized parking management for local businesses and residential hubs.",
      icon: MapPin,
    },
  ];

  return (
    <section className="space-y-10">
      {/* SECTION HEADER: Clean & Authoritative */}
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-[#222222] tracking-tighter leading-none">
          Why Contact <br />
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            SmartPark?
          </span>
        </h2>
        <p className="text-[#222222]/60 text-lg font-medium leading-relaxed max-w-md">
          We are committed to building a smarter, more efficient urban
          infrastructure starting right here in Gujarat.
        </p>
      </div>

      {/* POINTS LIST: Simplified Tactile Cards */}
      <div className="space-y-4">
        {points.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={index}
              className="group flex items-start gap-5 p-5 rounded-4xl bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon Container with Beige-to-Orange transition */}
              <div className="mt-1 p-3 rounded-2xl bg-[#F5E7C6] text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500 shadow-inner">
                <Icon size={22} strokeWidth={2.5} />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[#222222] font-black text-base tracking-tight flex items-center gap-2">
                  {point.title}
                  <CheckCircle2
                    size={14}
                    strokeWidth={3}
                    className="text-[#FA8112] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </h4>
                <p className="text-[#222222]/50 text-sm font-medium leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* TRUST BADGE: Clean Signature Style */}
      <div className="pt-6 flex items-center gap-4">
        <div className="h-0.5 grow bg-[#222222]/5"></div>
        <span className="text-[10px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          Certified Smart Solution
        </span>
      </div>
    </section>
  );
};

export default WhyContact;
