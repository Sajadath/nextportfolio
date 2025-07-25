"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import NavigationMenu from "./NavigationMenu";
import Projects from "./Projects";
import Skills from "./skills";

function PageContent() {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(0);

  const homeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
    };

    const homeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === homeRef.current) {
            if (entry.isIntersecting) {
              setCheckedIndex(0);
            }
          }
        });
      },
      { ...observerOptions, threshold: 0.6 },
    );
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === skillsRef.current) {
            if (entry.isIntersecting) {
              setCheckedIndex(1);
            }
          }
        });
      },
      { ...observerOptions, threshold: 0.4 },
    );
    const projectsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === projectsRef.current) {
            if (entry.isIntersecting) {
              setCheckedIndex(2);
            }
          }
        });
      },
      { ...observerOptions, threshold: 0.35 },
    );

    if (homeRef.current) homeObserver.observe(homeRef.current);
    if (skillsRef.current) skillsObserver.observe(skillsRef.current);
    if (projectsRef.current) projectsObserver.observe(projectsRef.current);

    return () => {
      if (homeRef.current) homeObserver.unobserve(homeRef.current);
      if (skillsRef.current) skillsObserver.unobserve(skillsRef.current);
      if (projectsRef.current) projectsObserver.unobserve(projectsRef.current);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref === null) return;
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative max-w-full overflow-hidden bg-black">
      <div ref={homeRef} className="mx-auto h-dvh max-w-7xl">
        <Header />
        <NavigationMenu
          checkedIndex={checkedIndex}
          setCheckedIndex={setCheckedIndex}
          homeRef={homeRef}
          skillsRef={skillsRef}
          projectsRef={projectsRef}
          scrollToSection={scrollToSection}
        />
        <HeroSection />
      </div>
      <div className="mx-auto mt-5 max-w-7xl sm:mt-8">
        <Skills skillsRef={skillsRef} />
        <Projects projectsRef={projectsRef} />
        <Footer />
      </div>
    </div>
  );
}

export default PageContent;
