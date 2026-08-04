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
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProblemSection />
        </ScrollReveal>
        <ScrollReveal>
          <SolutionSection />
        </ScrollReveal>
        <ScrollReveal>
          <WorkflowSection />
        </ScrollReveal>
        <ScrollReveal>
          <OutputsSection />
        </ScrollReveal>
        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal>
          <CaseStudiesSection />
        </ScrollReveal>
        <ScrollReveal>
          <TechnologySection />
        </ScrollReveal>
        <ScrollReveal>
          <CompanySection />
        </ScrollReveal>
        <ScrollReveal>
          <PilotSection onOpenSignup={() => setSignupOpen(true)} />
        </ScrollReveal>
        <ScrollReveal>
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
