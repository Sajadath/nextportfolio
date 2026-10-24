"use client";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projectsData";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const filters = [
  "All",
  "Next JS",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Redux",
  "Supabase",
];

export default function Projects() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.techs.some((t) => t.name === active)),
    [active],
  );

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 sm:px-10">
      <SectionHeading
        index="//"
        eyebrow="All projects"
        title="Selected"
        accent="projects."
        description="From production websites to small experiments — a collection of things I've designed and built. Filter by technology to explore."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              active === filter
                ? "border-transparent text-black"
                : "border-black/10 text-neutral-600 hover:border-black/40 dark:border-white/10 dark:text-neutral-400 dark:hover:border-white/40"
            }`}
          >
            {active === filter && (
              <motion.span
                layoutId="project-filter"
                className="bg-mainGreen absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative">{filter}</span>
          </button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-8 pb-20 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              layout
              key={project.link}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={project}
                index={projects.indexOf(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
