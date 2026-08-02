import Navbar from "@/components/Navbar";
import GradientBlobs from "@/components/GradientBlobs";
import BackgroundCards from "@/components/BackgroundCards";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import { WhyNowSection, ProblemSection, CostSection, ToolsFailSection } from "@/components/ProblemSections";
import { IntroducingSection, LearningAdviserSection, HowItWorksSection, FeaturesSection } from "@/components/ProductSections";
import { WhoSection, VisionSection, Footer } from "@/components/BottomSections";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <GradientBlobs />
      <BackgroundCards />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <ScrollReveal className="scroll-section">
          <WhyNowSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <ProblemSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <CostSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <IntroducingSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <LearningAdviserSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <StatsSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <WhoSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <ToolsFailSection />
        </ScrollReveal>
        <ScrollReveal className="scroll-section">
          <VisionSection />
        </ScrollReveal>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
