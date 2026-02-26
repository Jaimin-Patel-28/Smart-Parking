import { MapPin, Navigation, Globe } from "lucide-react";

const ContactMap = () => {
  return (
    <section className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* 1. BACKGROUND TEXTURE: Subtle paper grain for humanized depth */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          {/* LEFT SIDE: Editorial Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#222222] text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">
              <Globe size={16} className="text-[#FA8112]" />
              Network Coverage
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-[#222222] leading-[0.9] tracking-tighter">
              Our Presence in <br />
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Smart Cities.
              </span>
            </h2>

            <p className="text-[#222222]/60 text-xl font-medium leading-relaxed">
              SmartPark is rapidly expanding across India. We are currently
              optimizing urban mobility in{" "}
              <strong className="text-[#222222]">Anand</strong>, providing
              real-time slot availability to thousands of commuters.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-4xl bg-white border-2 border-[#222222]/5 shadow-sm">
                <p className="text-[#FA8112] font-black text-4xl mb-1 tracking-tighter italic font-serif">
                  01
                </p>
                <p className="text-[#222222]/40 text-[10px] uppercase font-black tracking-widest">
                  Active Cities
                </p>
              </div>
              <div className="p-6 rounded-4xl bg-white border-2 border-[#222222]/5 shadow-sm">
                <p className="text-[#FA8112] font-black text-4xl mb-1 tracking-tighter italic font-serif">
                  50+
                </p>
                <p className="text-[#222222]/40 text-[10px] uppercase font-black tracking-widest">
                  Partnered Hubs
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Map Visual Container */}
          <div className="flex-1 w-full">
            <div className="relative group">
              {/* Simple Shadow Backdrop */}
              <div className="absolute -inset-4 bg-[#222222]/5 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative rounded-[3rem] overflow-hidden border-2 border-[#222222] shadow-2xl aspect-video md:aspect-square lg:aspect-4/3 bg-white">
                {/* Stylized Map Image: Minimalist & High Contrast */}
                <img
                  src="https://placehold.co/800x600/FAF3E1/222222?text=SmartPark+Network+Map\nAnand,+Gujarat"
                  alt="City Map"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
                />

                {/* Floating Map Pin Badge: Signature Orange */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-16 h-16 bg-[#FA8112] rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-[#FA8112] p-5 rounded-full shadow-xl shadow-[#FA8112]/30 text-[#FAF3E1]">
                      <MapPin size={40} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Bottom Label: Clean Paper Style */}
                <div className="absolute bottom-8 left-8 right-8 p-6 rounded-4xl bg-white/90 backdrop-blur-md border-2 border-[#222222]/5 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-[#222222] font-black text-lg tracking-tight leading-none mb-1">
                      Anand HQ
                    </p>
                    <p className="text-[#FA8112] text-[10px] uppercase font-black tracking-widest">
                      Gujarat, India
                    </p>
                  </div>
                  <button className="p-3 rounded-xl bg-[#222222] text-[#FAF3E1] hover:bg-[#FA8112] transition-colors shadow-lg">
                    <Navigation size={22} strokeWidth={2.5} />
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
