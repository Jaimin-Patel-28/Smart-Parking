const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 py-20 lg:py-32">
      {/* Background Image Layer with Smooth Zoom Animation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=2000"
          alt="Modern Parking Garage"
          className="w-full h-full object-cover opacity-40 animate-slow-zoom"
        />
        {/* Gradient Overlays for Readability and Depth */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Background Glow Effect - Animated */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-[120px] opacity-30 animate-pulse">
        <div className="aspect-square h-96 rounded-full bg-cyan-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge - Slide In Animation */}
          <div className="animate-fade-in-down">
            <span className="inline-block px-4 py-1.5 mb-8 text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 rounded-full border border-cyan-400/20 backdrop-blur-md">
              ✨ Real-time Parking Solutions
            </span>
          </div>

          {/* Main Heading - Responsive text sizes */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up">
            Park{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">
              Smarter.
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="opacity-90">Save Time.</span>
          </h1>

          {/* Subtext - Responsive width */}
          <p className="text-base md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
            Effortlessly find, book, and manage your parking spaces in
            real-time. Navigate the city without the stress of searching for a
            spot.
          </p>

          {/* Action Buttons - Stack on mobile, flex on desktop */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-in-up delay-300">
            <button className="group relative px-8 py-4 rounded-xl font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-xl shadow-cyan-500/20 active:scale-95 text-center">
              Get Started
              <span className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></span>
            </button>

            <button className="px-8 py-4 rounded-xl font-bold text-white border border-slate-700 bg-slate-800/30 hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md active:scale-95 text-center">
              Find Parking
            </button>
          </div>

          {/* Stats Section - Fully Responsive Grid */}
          <div className="flex flex-wrap items-center gap-6 md:gap-12 border-t border-slate-800/60 pt-10 animate-fade-in">
            <div className="group cursor-default">
              <p className="text-3xl md:text-4xl font-black text-white group-hover:text-cyan-400 transition-colors">
                500+
              </p>
              <p className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-medium">
                Spots Available
              </p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-slate-800/80"></div>

            <div className="group cursor-default">
              <p className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors">
                10k+
              </p>
              <p className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-medium">
                Happy Users
              </p>
            </div>

            <div className="hidden sm:block w-px h-12 bg-slate-800/80"></div>

            <div className="group cursor-default">
              <p className="text-3xl md:text-4xl font-black text-white group-hover:text-indigo-400 transition-colors">
                99%
              </p>
              <p className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-medium">
                Reliability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
