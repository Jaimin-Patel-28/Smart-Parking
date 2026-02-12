import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import ProblemSolution from "../components/home/ProblemSolution";
import HowItWorks from "../components/home/HowItWorks";
import Features from "../components/home/Features";
import WhyChoose from "../components/home/WhyChoose";
import UseCases from "../components/home/UseCases";
import AppPreview from "../components/home/AppPreview";
import Testimonials from "../components/home/Testimonials";
import FinalCTA from "../components/home/FinalCTA";

const Home = () => {
  return (
    <>
      {/* HUMANIZED WRAPPER:
        - selection:bg-[#FA8112]: Matches your primary orange for text selection.
        - bg-[#FAF3E1]: The master "Cream" background for the entire page.
        - antialiased: Essential for that crisp, premium font rendering.
      */}
      <main className="min-h-screen bg-[#FAF3E1] font-sans text-[#222222] antialiased selection:bg-[#FA8112] selection:text-[#FAF3E1]">
        <div className="relative flex flex-col overflow-x-hidden">
          {/* 1. HERO: Uses the main Cream background to keep it airy */}
          <section className="w-full">
            <HeroSection />
          </section>

          {/* 2. STATS: Enclosed in a "Beige" card-like container with subtle borders */}
          <section className="mx-auto my-8 w-[92%] max-w-screen-2xl rounded-2xl border border-[#222222]/5 bg-[#F5E7C6] py-12 md:my-16 md:py-20 lg:rounded-4xl">
            <StatsSection />
          </section>

          {/* CONTENT BLOCKS: Fluid spacing using clamp-style padding */}
          <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
            {/* White sections are replaced with Cream (#FAF3E1) */}
            <section className="w-full">
              <ProblemSolution />
            </section>

            {/* Alternating section with Beige background and a hand-drawn feel */}
            <section className="w-full bg-[#F5E7C6] py-20 md:py-32">
              <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
                <HowItWorks />
              </div>
            </section>

            <section className="w-full">
              <Features />
            </section>

            <section className="w-full">
              <WhyChoose />
            </section>

            {/* UseCases: Soft border to define the section boundary instead of generic gray */}
            <section className="w-full border-y border-[#222222]/5 bg-[#F5E7C6]/30 py-20">
              <UseCases />
            </section>

            <section className="w-full">
              <AppPreview />
            </section>

            <section className="w-full">
              <Testimonials />
            </section>

            {/* FINAL CTA: High contrast section using the Primary Orange */}
            <section className="relative mx-auto mb-20 w-[92%] max-w-7xl overflow-hidden rounded-4xl  p-8 md:p-16 lg:p-24 shadow-2xl shadow-[#FA8112]/20">
              {/* Subtle texture overlay for a human touch */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
              <div className="relative z-10 text-[#FAF3E1]">
                <FinalCTA />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
