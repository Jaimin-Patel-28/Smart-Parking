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
      {/* - Added 'overflow-hidden' to prevent horizontal scroll issues on mobile.
        - Added 'flex flex-col' with 'gap' to maintain consistent vertical spacing.
        - The 'selection' utility makes the text highlight color match a professional theme.
      */}
      <main className="home flex flex-col gap-0 overflow-hidden selection:bg-emerald-100 selection:text-emerald-900">
        {/* Each section should ideally have an internal 'container' class for width capping */}
        <section className="transition-opacity duration-700 ease-in-out">
          <HeroSection />
        </section>

        <section className="transition-all duration-500">
          <StatsSection />
        </section>

        <section className="w-full">
          <ProblemSolution />
        </section>

        <section className="w-full">
          <HowItWorks />
        </section>

        <section className="w-full">
          <Features />
        </section>

        <section className="w-full">
          <WhyChoose />
        </section>

        <section className="w-full">
          <UseCases />
        </section>

        <section className="w-full">
          <AppPreview />
        </section>

        <section className="w-full">
          <Testimonials />
        </section>

        <section className="w-full">
          <FinalCTA />
        </section>
      </main>
    </>
  );
};

export default Home;
