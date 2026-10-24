"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projectsData";
import { usePageTransition } from "@/lib/hooks/usePageTransition";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const featured = projects.slice(0, 6);

export default function WorkShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const navigate = usePageTransition();

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="work"
      ref={section}
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title="Things I've"
            accent="built."
          />
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max items-center gap-6 px-6 sm:gap-10 sm:px-10"
        >
          {featured.map((project, i) => (
            <ProjectCard
              key={project.link}
              project={project}
              index={i}
              className="w-[82vw] sm:w-[60vw] lg:w-[40vw]"
            />
          ))}

          <button
            onClick={() => navigate("/projects")}
            data-cursor="All"
            className="group hover:border-mainGreen flex aspect-[16/10] w-[70vw] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-black/20 transition-colors duration-500 sm:w-[40vw] lg:w-[26vw] dark:border-white/20"
          >
            <span className="group-hover:bg-mainGreen grid size-20 place-items-center rounded-full border border-black/20 text-black transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:text-black dark:border-white/20 dark:text-white">
              <FiArrowRight className="size-7 transition-transform duration-500 group-hover:-rotate-45" />
            </span>
            <span className="text-xl font-bold text-black dark:text-white">
              View all projects
            </span>
            <span className="font-mono text-xs tracking-widest text-neutral-500">
              {projects.length} IN TOTAL
            </span>
          </button>
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-6 sm:px-10">
          <div className="h-px w-full bg-black/10 dark:bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="from-mainGreen to-mainCyan h-px origin-left bg-gradient-to-r"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
