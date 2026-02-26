import { Zap, Leaf, Coins, BarChart3, Globe2 } from "lucide-react";

const MissionVision = () => {
  return (
    <section className=" flex items-center pt-20 bg-[#F5E7C6]">
      <div className="max-w-screen mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MISSION CARD */}
          <div className="group relative p-6 md:p-8 rounded-2xl bg-white border border-[#222222]/10 transition-all duration-300 hover:-translate-y-1 shadow-sm">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5E7C6] text-[#222222] text-[10px] font-black uppercase tracking-widest mb-4">
                <Zap size={12} className="text-[#FA8112]" />
                Our Mission
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-[#222222] mb-4 leading-tight">
                Digitizing the <br />
                <span className="text-[#FA8112] italic font-serif font-medium">
                  Streets.
                </span>
              </h2>

              <p className="text-[#222222]/60 text-sm leading-relaxed mb-6">
                Our mission is to eliminate urban congestion in{" "}
                <strong className="text-[#222222]">Anand</strong> by replacing
                outdated manual logs with a high-speed{" "}
                <strong className="text-[#222222]">MERN-powered</strong>{" "}
                automation system that saves time for every commuter.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { text: "Eco-friendly Planning", icon: Leaf },
                  { text: "Real-time Visibility", icon: Zap },
                  { text: "Traffic Reduction", icon: Zap },
                  { text: "Seamless Digital Entry", icon: Zap },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[#222222] font-semibold text-xs"
                  >
                    <div className="w-5 h-5 rounded-md bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                      <item.icon size={12} strokeWidth={3} />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* VISION CARD */}
          <div className="group relative p-6 md:p-8 rounded-2xl bg-white border border-[#222222]/10 transition-all duration-300 hover:-translate-y-1 shadow-sm">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5E7C6] text-[#222222] text-[10px] font-black uppercase tracking-widest mb-4">
                <Globe2 size={12} className="text-[#FA8112]" />
                Our Vision
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-[#222222] mb-6 leading-tight">
                Smart City <br />
                <span className="text-[#FA8112] italic font-serif font-medium">
                  Integration.
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                    <Coins size={16} />
                  </div>
                  <h4 className="text-[#222222] font-black text-xs uppercase">
                    Cashless Ecosystem
                  </h4>
                  <p className="text-[#222222]/50 text-xs leading-relaxed">
                    Full UPI and Smart Wallet integration for paperless
                    transactions.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                    <BarChart3 size={16} />
                  </div>
                  <h4 className="text-[#222222] font-black text-xs uppercase">
                    AI-Based Prediction
                  </h4>
                  <p className="text-[#222222]/50 text-xs leading-relaxed">
                    Future-ready algorithms to predict slot availability
                    patterns.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F5E7C6]/50 border border-[#222222]/10">
                <p className="text-[#222222]/70 text-xs italic">
                  "Scaling SmartPark to optimize urban space across every major
                  hub in Gujarat."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
