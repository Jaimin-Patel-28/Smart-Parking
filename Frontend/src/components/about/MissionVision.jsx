import { Target, Eye, Zap, Leaf, Coins, BarChart3, Globe2 } from "lucide-react";

const MissionVision = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MISSION CARD */}
        <div className="group relative p-8 md:p-12 rounded-4xl bg-slate-900 border border-slate-800 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Target size={120} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Zap size={12} />
              Our Mission
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Digitizing the <span className="text-cyan-400">Streets.</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Our mission is to eliminate urban congestion in{" "}
              <strong>Anand</strong> by replacing outdated manual logs with a
              high-speed <strong>MERN-powered</strong>
              automation system that saves time and reduces stress for every
              commuter.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                <div className="w-5 h-5 rounded-md bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                  <Leaf size={12} strokeWidth={3} />
                </div>
                Eco-friendly Urban Planning
              </li>
              {[
                "Real-time Slot Visibility",
                "Reduction in Traffic Flow",
                "Seamless Digital Entry",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-300 font-medium text-sm"
                >
                  <div className="w-5 h-5 rounded-md bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Zap size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* VISION CARD */}
        <div className="group relative p-8 md:p-12 rounded-4xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-800 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Eye size={120} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Globe2 size={12} />
              Our Vision
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Smart City <span className="text-blue-400">Integration.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-blue-400">
                  <Coins size={20} />
                </div>
                <h4 className="text-white font-bold text-sm">
                  Cashless Ecosystem
                </h4>
                <p className="text-slate-500 text-xs">
                  Full UPI and Smart Wallet integration for paperless
                  transactions.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-blue-400">
                  <BarChart3 size={20} />
                </div>
                <h4 className="text-white font-bold text-sm">
                  AI-Based Prediction
                </h4>
                <p className="text-slate-500 text-xs">
                  Future-ready algorithms to predict slot availability patterns.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
              <p className="text-slate-400 text-sm italic">
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
