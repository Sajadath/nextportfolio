"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import NavigationMenu from "./OldNavigationMenu";
import Projects from "./Projects";
import Skills from "./Skills";
import Fading from "./Fading";

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

    const home = homeRef.current;
    const skills = skillsRef.current;
    const projects = projectsRef.current;

    return () => {
      if (home) homeObserver.unobserve(home);
      if (skills) skillsObserver.unobserve(skills);
      if (projects) projectsObserver.unobserve(projects);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref === null) return;
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-black">
      <div
        ref={homeRef}
        className="sticky top-0 z-1 mx-auto h-dvh max-w-7xl bg-white dark:bg-black"
      >
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

      <div className="relative top-0 z-2 bg-white pt-5 dark:bg-black">
        <Fading />
        <div className="mx-auto mt-5 max-w-7xl sm:mt-8">
          <Skills skillsRef={skillsRef} />
          <Projects projectsRef={projectsRef} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PageContent;
