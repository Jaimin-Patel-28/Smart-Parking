import { MapPin, Navigation, Globe } from "lucide-react";

const ContactMap = () => {
  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT SIDE: Text Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Globe size={14} />
              Network Coverage
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Our Presence in <br />
              <span className="text-cyan-400">Smart Cities</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed">
              SmartPark is rapidly expanding across India. We are currently
              optimizing urban mobility in <strong>Anand</strong>, providing
              real-time slot availability to thousands of commuters.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <p className="text-white font-bold text-2xl">01</p>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter">
                  Active Cities
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <p className="text-white font-bold text-2xl">50+</p>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter">
                  Partnered Hubs
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Map Visual */}
          <div className="flex-1 w-full">
            <div className="relative group">
              {/* Animated Ring Decor */}
              <div className="absolute -inset-4 bg-cyan-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative rounded-4xl overflow-hidden border border-slate-700 shadow-2xl aspect-video md:aspect-square lg:aspect-4/3">
                {/* Stylized Placeholder Map Image */}
                <img
                  src="https://placehold.co/800x600/1e293b/22d3ee?text=SmartPark+Network+Map\nAnand,+Gujarat"
                  alt="City Map"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-cyan-400 p-4 rounded-full shadow-lg shadow-cyan-500/50 text-slate-900">
                      <MapPin size={32} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">Anand HQ</p>
                    <p className="text-slate-400 text-[10px] uppercase font-bold">
                      Gujarat, India
                    </p>
                  </div>
                  <button className="p-2 rounded-lg bg-cyan-400 text-slate-900">
                    <Navigation size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
