import React, { useEffect } from "react";
// Sub-component imports
import AboutHero from "../Components/about/AboutHero";
import MissionVision from "../Components/about/MissionVision";
import WhySmartPark from "../Components/about/WhySmartPark";
import HowItWorksAbout from "../Components/about/HowItWorksAbout";
import Technology from "../Components/about/Technology";
import TargetAudience from "../Components/about/TargetAudience";
import Values from "../Components/about/Values";
import AboutCTA from "../Components/about/AboutCTA";

const About = () => {
  // Ensures user starts at the top of the page on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    /* Changed bg to #222222 to match Home.jsx for a seamless dark-mode experience */
    <main className="bg-[#222222] min-h-screen selection:bg-[#FA8112] selection:text-[#222222] overflow-x-hidden antialiased">
      {/* 1. HERO BLOCK - Full height impact */}
      <article className="relative z-10 ">
        <AboutHero />
      </article>

      {/* CONTENT FLOW */}
      <div className="relative bg-[#222222]">
        {/* 2. CORE PURPOSE - Layered over Hero bottom fade */}
        <section>
          <div className="w-full">
            <MissionVision />
          </div>
        </section>

        {/* 3. COMPETITIVE ADVANTAGE - Clean grid with subtle borders */}
        <section className="py-12 ">
          <div className="w-full">
            <WhySmartPark />
          </div>
        </section>

        {/* 4. PROCESS & EXECUTION - Muted background tint for contrast */}
        <section className="py-12 px-4 ">
          <div className="w-full">
            <HowItWorksAbout />
          </div>
        </section>

        {/* 5. MERN STACK SHOWCASE - High-impact tech focus */}
        <section className="py-12 px-4">
          <div className="w-full">
            <Technology />
          </div>
        </section>

        {/* 6. USER PERSONAS - Distinct background to focus on users */}
        <section className="py-12 px-4  ">
          <div className="w-full">
            <TargetAudience />
          </div>
        </section>

        {/* 7. CORPORATE VALUES - Minimalist icons and text */}
        <section className="py-12 px-4">
          <div className="w-full">
            <Values />
          </div>
        </section>
      </div>

      {/* 8. FINAL CALL TO ACTION - Signature Orange gradient */}
      <footer className="relative pb-24">
        <div className="w-full">
          <AboutCTA />
        </div>
      </footer>

      {/* GLOBAL DECORATIVE GLOWS (Matching Home Page) */}
      <div className="fixed top-[15%] left-[-10%] w-112.5 h-112.5 bg-[#FA8112]/3 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] right-[-5%] w-125 h-125 bg-[#FA8112]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </main>
  );
};

export default About;
