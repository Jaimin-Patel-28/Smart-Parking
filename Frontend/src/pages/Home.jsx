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
    <main className="min-h-screen bg-[#FAF3E1] text-[#222222] antialiased selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      <div className="flex flex-col overflow-x-hidden">
        {/* HERO */}
        <section className="w-full">
          <HeroSection />
        </section>

        {/* STATS (compact card style) */}
        <section className="mx-auto my-6 w-full max-w-screen rounded-lg border border-[#222222]/10 bg-[#F5E7C6] py-8 px-4 md:py-10 md:px-8 transition-all duration-300">
          <StatsSection />
        </section>

        {/* CONTENT BLOCKS */}
        <div className="flex flex-col gap-14 md:gap-20">
          <section className="w-full px-4 md:px-8 mx-auto">
            <ProblemSolution />
          </section>

          {/* How It Works */}
          <section className="w-full bg-[#F5E7C6] py-14 md:py-20">
            <div className="mx-auto px-4 md:px-8">
              <HowItWorks />
            </div>
          </section>

          <section className="w-full px-4 md:px-8 mx-auto">
            <Features />
          </section>

          <section className="w-full px-0 md:px-0 mx-auto">
            <WhyChoose />
          </section>

          {/* Use Cases */}
          <section className="w-full border-y border-[#222222]/10 bg-[#F5E7C6] py-14 md:py-20">
            <div className=" mx-auto px-4 md:px-0">
              <UseCases />
            </div>
          </section>

          <section className="w-full px-4 md:px-8 mx-auto">
            <AppPreview />
          </section>

          <section className="w-full px-4 md:px-8 mx-auto">
            <Testimonials />
          </section>

          {/* FINAL CTA */}
          <section className="mx-auto mb-14 w-full rounded-xl  p-6 md:p-10  transition-all duration-300">
            <div className="text-[#FAF3E1]">
              <FinalCTA />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
