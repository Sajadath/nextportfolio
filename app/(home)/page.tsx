"use client";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/skills";
import NavigationMenu from "./components/NavigationMenu";
import { useRef } from "react";

export default function Page() {
  const homeRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref === null) return;
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="relative min-h-dvh bg-black">
        <div className="mx-auto h-dvh max-w-7xl">
          <Header homeRef={homeRef} />
          <NavigationMenu
            homeRef={homeRef}
            skillsRef={skillsRef}
            projectsRef={projectsRef}
            scrollToSection={scrollToSection}
          />
          <HeroSection />
        </div>
        <div className="mx-auto mt-0 max-w-7xl sm:mt-8">
          <Skills skillsRef={skillsRef} />
          <Projects projectsRef={projectsRef} />
          <Footer />
        </div>
      </div>
    </>
  );
}
