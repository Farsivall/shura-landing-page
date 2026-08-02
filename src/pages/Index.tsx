import Navbar from "@/components/Navbar";
import GradientBlobs from "@/components/GradientBlobs";
import BackgroundCards from "@/components/BackgroundCards";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import { WhyNowSection, ProblemSection, CostSection, ToolsFailSection } from "@/components/ProblemSections";
import { IntroducingSection, LearningAdviserSection, HowItWorksSection, FeaturesSection } from "@/components/ProductSections";
import { WhoSection, VisionSection, CTASection, Footer } from "@/components/BottomSections";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Fixed layers stay outside filter transitions */}
      <GradientBlobs />
      <BackgroundCards />
      <Navbar />
      <div className="relative z-10">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyNowSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProblemSection />
        </ScrollReveal>
        <ScrollReveal>
          <CostSection />
        </ScrollReveal>
        <ScrollReveal>
          <IntroducingSection />
        </ScrollReveal>
        <ScrollReveal>
          <LearningAdviserSection />
        </ScrollReveal>
        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal>
          <StatsSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhoSection />
        </ScrollReveal>
        <ScrollReveal>
          <ToolsFailSection />
        </ScrollReveal>
        <ScrollReveal>
          <VisionSection />
        </ScrollReveal>
        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;
