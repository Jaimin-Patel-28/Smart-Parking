import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Shield,
} from "lucide-react";

const ProblemSolution = () => {
  const points = [
    {
      problem: "Wasting 20+ minutes searching for a parking spot.",
      solution: "Instant real-time availability tracking.",
      icon: Clock,
      img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=400",
    },
    {
      problem: "Complex and confusing manual payment systems.",
      solution: "One-tap secure digital payments.",
      icon: CreditCard,
      img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=400",
    },
    {
      problem: "Uncertainty about vehicle safety in open areas.",
      solution: "Verified and secure parking zones.",
      icon: Shield,
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400",
    },
  ];

  return (
    <section className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container mx-auto max-w-screen-2xl">
        {/* Header: Editorial Notion Style */}
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black text-[#222222] mb-8 tracking-tighter leading-none">
            Why{" "}
            <span className="text-[#FA8112] font-serif italic font-medium tracking-normal">
              SmartPark?
            </span>
          </h2>
          <p className="text-[#222222]/60 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Traditional parking is broken. We're here to fix it with a modern,
            <span className="text-[#222222]"> hand-crafted approach</span> that
            saves you time and stress.
          </p>
        </div>

        <div className="grid gap-10 md:gap-16">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col md:flex-row items-stretch gap-0 rounded-[3rem] overflow-hidden border-2 border-[#222222]/5 bg-white hover:border-[#222222] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#222222]/5"
              >
                {/* PROBLEM SIDE: Clean Charcoal accents */}
                <div className="flex-1 p-10 lg:p-14 flex items-start gap-8 relative bg-white">
                  <div className="relative z-10 p-4 rounded-2xl bg-[#222222]/5 text-[#222222]/40 group-hover:bg-[#222222] group-hover:text-[#FAF3E1] transition-all duration-500">
                    <AlertCircle size={32} strokeWidth={2.5} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[11px] font-black text-[#222222]/30 uppercase tracking-[0.3em]">
                      The Friction
                    </span>
                    <p className="text-2xl text-[#222222] mt-4 font-bold tracking-tight leading-snug">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* CENTRAL CONNECTING ICON: The Bridge */}
                <div className="flex items-center justify-center relative w-full md:w-20 h-20 md:h-auto">
                  <div className="absolute h-0.5 md:h-full w-full md:w-0.5 bg-[#222222]/5"></div>
                  <div className="z-20 w-16 h-16 rounded-3xl bg-[#F5E7C6] border-2 border-[#222222] flex items-center justify-center group-hover:bg-[#FA8112] group-hover:border-[#FA8112] group-hover:rotate-15 transition-all duration-700 shadow-xl">
                    <Icon
                      size={28}
                      className="text-[#222222] group-hover:text-[#FAF3E1] transition-colors"
                    />
                  </div>
                </div>

                {/* SOLUTION SIDE: Vibrant Orange accents */}
                <div className="flex-1 p-10 lg:p-14 flex items-start gap-8 relative overflow-hidden bg-[#F5E7C6]/30 border-t md:border-t-0 md:border-l-2 border-[#222222]/5">
                  {/* Subtle Image Reveal */}
                  <img
                    src={item.img}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-1000 grayscale group-hover:scale-110"
                    alt="Solution"
                  />

                  <div className="relative z-10 p-4 rounded-2xl bg-[#FA8112] text-[#FAF3E1] shadow-lg shadow-[#FA8112]/20">
                    <CheckCircle2 size={32} strokeWidth={2.5} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[11px] font-black text-[#FA8112] uppercase tracking-[0.3em]">
                      The Fix
                    </span>
                    <p className="text-2xl text-[#222222] mt-4 font-black tracking-tight leading-snug">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
