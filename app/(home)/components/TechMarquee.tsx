"use client";

import { skills } from "@/data/skillsData";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...skills].reverse() : skills;

  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((skill, i) => {
          const Icon = skill.Icon;
          return (
            <div
              key={i}
              className="group flex items-center gap-3 px-6 py-3 text-2xl font-bold tracking-tight whitespace-nowrap text-neutral-300 transition-colors duration-300 hover:text-black sm:text-4xl dark:text-neutral-700 dark:hover:text-white"
            >
              <Icon className="group-hover:text-mainGreen size-6 transition-all duration-300 group-hover:rotate-12 sm:size-8" />
              {skill.text}
              <span className="text-mainGreen ml-6 text-lg">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Technologies I use"
      style={{ "--marquee-duration": "90s" } as React.CSSProperties}
      className="relative border-y border-black/5 py-6 dark:border-white/5"
    >
      <Row />
      <div style={{ "--marquee-duration": "110s" } as React.CSSProperties}>
        <Row reverse />
      </div>
    </section>
  );
}
