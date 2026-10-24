"use client";

import { projects } from "@/data/projectsData";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type Project = (typeof projects)[number];

export default function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 55%)`;

  return (
    <motion.div
      style={{ perspective: 1200 }}
      className={cn("w-full", className)}
    >
      <motion.div
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - rect.left) / rect.width);
          py.set((e.clientY - rect.top) / rect.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative"
      >
        <Link
          href={project.link}
          target="_blank"
          data-cursor="Visit"
          className="block overflow-hidden rounded-2xl border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.cover}
              alt={project.title.trim()}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <motion.div
              aria-hidden
              style={{ background: glare }}
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <span className="absolute top-4 left-5 font-mono text-xs tracking-widest text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="group-hover:bg-mainGreen absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/30 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:text-black">
              <FiArrowUpRight className="size-5" />
            </span>

            <div
              style={{ transform: "translateZ(40px)" }}
              className="absolute right-5 bottom-5 left-5"
            >
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
                {project.title.trim()}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techs.map(({ Icon, name }) => (
                  <span
                    key={name}
                    title={name}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/85 backdrop-blur-md"
                  >
                    <Icon className="text-mainGreen size-3" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
