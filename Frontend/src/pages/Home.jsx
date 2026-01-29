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
    <main className="home">
      <HeroSection />
      <StatsSection />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <WhyChoose />
      <UseCases />
      <AppPreview />
      <Testimonials />
      <FinalCTA />
      </main>
    </>
  );
};

export default Home;
