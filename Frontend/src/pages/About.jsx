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
    <main className="bg-slate-950 min-h-screen">
      {/* 1. Introduction & Branding */}
      <AboutHero />

      {/* 2. Core Purpose (Mission & Vision) */}
      <section className="py-20 bg-linear-to-b from-slate-950 to-slate-900">
        <MissionVision />
      </section>

      {/* 3. Competitive Advantage */}
      <WhySmartPark />

      {/* 4. Process & Execution */}
      <section className="py-20 bg-slate-900/50">
        <HowItWorksAbout />
      </section>

      {/* 5. MERN Stack Showcase (Great for your Viva!) */}
      <Technology />

      {/* 6. User Personas */}
      <TargetAudience />

      {/* 7. Corporate Values */}
      <section className="py-20 border-t border-slate-900">
        <Values />
      </section>

      {/* 8. Final Call to Action */}
      <AboutCTA />
    </main>
  );
};

export default About;