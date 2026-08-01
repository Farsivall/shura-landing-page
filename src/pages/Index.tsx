import Navbar from "@/components/Navbar";
import GradientBlobs from "@/components/GradientBlobs";
import BackgroundCards from "@/components/BackgroundCards";
import HeroSection from "@/components/HeroSection";
import { WhyNowSection, ProblemSection, CostSection, ToolsFailSection } from "@/components/ProblemSections";
import { IntroducingSection, HowItWorksSection, FeaturesSection } from "@/components/ProductSections";
import { WhoSection, VisionSection, CTASection, Footer } from "@/components/BottomSections";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <GradientBlobs />
      <BackgroundCards />
      <div className="relative z-10">
        <Navbar />
        {/* What is Shura? */}
        <HeroSection />
        <CTASection />
        {/* Why is this decision so difficult? */}
        <WhyNowSection />
        <ProblemSection />
        <CostSection />
        {/* How does Shura reduce uncertainty? */}
        <IntroducingSection />
        {/* How does it work? */}
        <HowItWorksSection />
        {/* What will I receive? */}
        <FeaturesSection />
        <StatsSection />
        {/* Who benefits? */}
        <WhoSection />
        {/* Why not ChatGPT / consultants / spreadsheets? */}
        <ToolsFailSection />
        <VisionSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
