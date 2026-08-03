import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import PilotEnquiryModal from "@/components/PilotEnquiryModal";
import {
  ProblemSection,
  SolutionSection,
  WorkflowSection,
  OutputsSection,
  HowItWorksSection,
  CaseStudiesSection,
  TechnologySection,
  CompanySection,
  PilotSection,
  FAQSection,
  Footer,
} from "@/components/landing/LandingSections";

const Index = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    if (hash === "#signup" || hash === "#cta") {
      setSignupOpen(true);
    }
  }, [hash]);

  const handleSignupOpenChange = (open: boolean) => {
    setSignupOpen(open);
    if (!open && (hash === "#signup" || hash === "#cta")) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="landing-shell min-h-screen">
      <main className="landing-canvas page-enter">
        <Navbar />
        <ScrollReveal>
          <HeroSection onOpenSignup={() => setSignupOpen(true)} />
        </ScrollReveal>
        <ScrollReveal delay={40}>
          <ProblemSection />
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <SolutionSection />
        </ScrollReveal>
        <ScrollReveal delay={40}>
          <WorkflowSection />
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <OutputsSection />
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal delay={40}>
          <CaseStudiesSection />
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <TechnologySection />
        </ScrollReveal>
        <ScrollReveal delay={40}>
          <CompanySection />
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <PilotSection onOpenSignup={() => setSignupOpen(true)} />
        </ScrollReveal>
        <ScrollReveal delay={40}>
          <FAQSection />
        </ScrollReveal>
        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </main>

      <PilotEnquiryModal open={signupOpen} onOpenChange={handleSignupOpenChange} />
    </div>
  );
};

export default Index;
