import { ArrowRight, Map } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto max-w-6xl">
        {/* THE SIGNATURE CARD: 
            Using Charcoal (#222222) as the base to make the Orange (#FA8112) pop.
            Added a 'natural paper' texture for that humanized, non-digital look.
        */}
        <div className="relative overflow-hidden rounded-[3.5rem] bg-[#222222] p-10 md:p-20 text-center shadow-[0_40px_100px_-15px_rgba(34,34,34,0.3)]">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

          {/* Decorative Elements: Using Beige (#F5E7C6) for soft, organic depth */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#F5E7C6]/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#FA8112]/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Header: High Contrast with Serif Accent */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#FAF3E1] mb-8 tracking-tighter leading-[0.9]">
              Ready to Park <br className="hidden md:block" />
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Smarter?
              </span>
            </h2>

            <p className="text-[#FAF3E1]/70 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              Join thousands of drivers who have already eliminated the stress
              of finding a parking spot. Start your journey with SmartPark
              today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Primary Button: Vibrant Orange */}
              <button className="w-full sm:w-auto px-12 py-5 bg-[#FA8112] text-[#FAF3E1] font-black text-lg rounded-2xl hover:bg-[#FAF3E1] hover:text-[#222222] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-[#FA8112]/20">
                Register Now
                <ArrowRight
                  size={22}
                  strokeWidth={3}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* Secondary Button: Clean Outlined */}
              <button className="w-full sm:w-auto px-12 py-5 bg-transparent text-[#FAF3E1] font-black text-lg rounded-2xl border-2 border-[#FAF3E1]/20 hover:border-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-all duration-300 flex items-center justify-center gap-3">
                <Map size={22} strokeWidth={2.5} />
                Explore Parking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
