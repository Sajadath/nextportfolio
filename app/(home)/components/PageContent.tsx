import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import SkillsShowcase from "./SkillsShowcase";
import TechMarquee from "./TechMarquee";
import WorkShowcase from "./WorkShowcase";

function PageContent() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <SkillsShowcase />
      <WorkShowcase />
      <ContactSection />
    </>
  );
}

export default PageContent;
