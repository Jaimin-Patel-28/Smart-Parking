import React, { useEffect } from "react";
import AboutHero from "../components/about/AboutHero";
import MissionVision from "../components/about/MissionVision";
import WhySmartPark from "../components/about/WhySmartPark";
import HowItWorksAbout from "../components/about/HowItWorksAbout";
import Technology from "../components/about/Technology";
import TargetAudience from "../components/about/TargetAudience";
import Values from "../components/about/Values";
import AboutCTA from "../components/about/AboutCTA";

const About = () => {
  // Ensures user starts at the top of the page on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF3E1] font-sans text-[#222222] antialiased selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      {/* 1. Introduction & Branding: Simple, airy hero */}
      <AboutHero />

      {/* 2. Core Purpose (Mission & Vision): Using the warmer Beige background */}
      <section className="min-h-[calc(100vh-70px)] py-10 md:py-16 bg-[#F5E7C6]">
        <div className="container mx-auto px-6 md:px-12">
          <MissionVision />
        </div>
      </section>

      {/* 3. Competitive Advantage: Clean Cream section */}
      <section className="py-20 md:py-32">
        <WhySmartPark />
      </section>

      {/* 4. Process & Execution: Subtle border to define the section */}
      <section className="py-20 md:py-32 border-y border-[#222222]/5 bg-[#F5E7C6]/30">
        <div className="container mx-auto px-6">
          <HowItWorksAbout />
        </div>
      </section>

      {/* 5. MERN Stack Showcase: Vital for your internship viva! */}
      <section className="py-20 md:py-32">
        <Technology />
      </section>

      {/* 6. User Personas: Clean grid layout */}
      <section className="py-20 md:py-32 bg-[#F5E7C6]">
        <TargetAudience />
      </section>

      {/* 7. Corporate Values: Minimalist approach */}
      <section className="py-20 md:py-32 border-t border-[#222222]/5">
        <Values />
      </section>

      {/* 8. Final Call to Action: Bold Orange signature block */}
      <section className="pb-24">
        <AboutCTA />
      </section>
    </main>
  );
};

export default About;
