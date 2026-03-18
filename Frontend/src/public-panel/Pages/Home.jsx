import React from "react";

// Sub-component imports
import HeroSection from "../Components/home/HeroSection";
import StatsSection from "../Components/home/StatsSection";
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
    /* Main container ensures the background color is consistent throughout the scroll */
    <main className="bg-[#222222] min-h-screen selection:bg-[#FA8112] selection:text-[#222222]">
      {/* HERO BLOCK - Full height impact */}
      <article className="relative z-10">
        <HeroSection />
      </article>

      {/* METRICS BLOCK - Pulling up slightly for a layered effect */}
      <section className="relative ">
        <StatsSection />
      </section>

      {/* CONTENT FLOW - Using standard spacing and subtle dividers */}
      <div className="space-y-0 flex flex-col">
        <section className="py-20">
          <ProblemSolution />
        </section>

        <section className="py-20 bg-[#222222]">
          <HowItWorks />
        </section>

        <section className="py-20">
          <Features />
        </section>

        <section className="py-20">
          <WhyChoose />
        </section>

        {/* UseCases often looks best with a slightly different background tint */}
        <section className="py-20 bg-[#222222]">
          <UseCases />
        </section>

        <section className="py-20">
          <AppPreview />
        </section>

        <section className="py-20 pb-32">
          <Testimonials />
        </section>
      </div>

      {/* CONVERSION BLOCK - Anchored at bottom */}
      <footer className="relative bg-gradient-to-t from-[#FA8112]/10 to-transparent">
        <FinalCTA />
      </footer>

      {/* GLOBAL DECORATIVE GLOW (Bottom Left) */}
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FA8112]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </main>
  );
};

export default Home;
