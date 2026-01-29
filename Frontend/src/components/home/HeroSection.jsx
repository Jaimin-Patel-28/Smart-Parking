const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
        <div className="aspect-square h-96 rounded-full bg-cyan-400"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-cyan-400 uppercase bg-cyan-400/10 rounded-full border border-cyan-400/20">
            Real-time Parking Solutions
          </span>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Park{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Smarter.
            </span>{" "}
            <br />
            Save Time.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
            Effortlessly find, book, and manage your parking spaces in
            real-time. Navigate the city without the stress of searching for a
            spot.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-xl font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25">
              Get Started
            </button>

            <button className="px-8 py-4 rounded-xl font-bold text-white border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 transition-all duration-200 backdrop-blur-sm">
              Find Parking
            </button>
          </div>

          {/* Stats / Proof */}
          <div className="mt-16 flex items-center gap-8 border-t border-slate-800 pt-8">
            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-slate-500">Spots Available</p>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div>
              <p className="text-2xl font-bold text-white">10k+</p>
              <p className="text-sm text-slate-500">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
