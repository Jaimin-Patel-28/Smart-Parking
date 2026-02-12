import { Target, Eye, Zap, Leaf, Coins, BarChart3, Globe2 } from "lucide-react";

const MissionVision = () => {
  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* MISSION CARD */}
        <div className="group relative p-10 md:p-14 rounded-[3rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2">
          {/* Subtle Background Image Reveal */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
              alt="Mission"
              className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.05] grayscale group-hover:scale-110 transition-all duration-1000"
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#F5E7C6] text-[#222222] text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              <Zap size={14} className="text-[#FA8112]" />
              Our Mission
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#222222] mb-8 tracking-tighter leading-none">
              Digitizing the <br />
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Streets.
              </span>
            </h2>

            <p className="text-[#222222]/60 text-lg font-medium leading-relaxed mb-10">
              Our mission is to eliminate urban congestion in{" "}
              <strong className="text-[#222222]">Anand</strong> by replacing
              outdated manual logs with a high-speed{" "}
              <strong className="text-[#222222]">MERN-powered</strong>{" "}
              automation system that saves time for every commuter.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { text: "Eco-friendly Planning", icon: Leaf },
                { text: "Real-time Visibility", icon: Zap },
                { text: "Traffic Reduction", icon: Zap },
                { text: "Seamless Digital Entry", icon: Zap },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[#222222] font-bold text-sm"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                    <item.icon size={14} strokeWidth={3} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* VISION CARD */}
        <div className="group relative p-10 md:p-14 rounded-[3rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2">
          {/* Subtle Background Image Reveal */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800"
              alt="Vision"
              className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.05] grayscale group-hover:scale-110 transition-all duration-1000"
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#F5E7C6] text-[#222222] text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              <Globe2 size={14} className="text-[#FA8112]" />
              Our Vision
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-[#222222] mb-8 tracking-tighter leading-none">
              Smart City <br />
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Integration.
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                  <Coins size={22} />
                </div>
                <h4 className="text-[#222222] font-black text-sm uppercase tracking-tight">
                  Cashless Ecosystem
                </h4>
                <p className="text-[#222222]/50 text-sm font-medium leading-relaxed">
                  Full UPI and Smart Wallet integration for paperless
                  transactions.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                  <BarChart3 size={22} />
                </div>
                <h4 className="text-[#222222] font-black text-sm uppercase tracking-tight">
                  AI-Based Prediction
                </h4>
                <p className="text-[#222222]/50 text-sm font-medium leading-relaxed">
                  Future-ready algorithms to predict slot availability patterns.
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-[#F5E7C6]/50 border-2 border-dashed border-[#222222]/10">
              <p className="text-[#222222]/70 text-[15px] italic font-medium">
                "Scaling SmartPark to optimize urban space across every major
                hub in Gujarat."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
