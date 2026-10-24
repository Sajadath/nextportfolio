"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { projects } from "@/data/projectsData";
import { skills } from "@/data/skillsData";
import {
  animate,
  AnimatePresence,
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiCode, FiLayers, FiZap } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

const paragraph =
  "I am a Front-End Developer with a strong passion for creating interactive, user-friendly, and visually appealing web applications. My focus is on crafting seamless user experiences by combining modern design principles with cutting-edge technologies. I enjoy solving complex problems, learning new tools, and continuously improving my skills to deliver high-quality solutions that make a difference.";

const highlighted = new Set([
  "interactive,",
  "user-friendly,",
  "visually",
  "appealing",
  "seamless",
  "cutting-edge",
  "high-quality",
]);

const services = [
  {
    Icon: FiCode,
    title: "Interactive Interfaces",
    text: "Component-driven React & Next.js apps with clean, typed, maintainable code.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    Icon: FiZap,
    title: "Motion & 3D",
    text: "Micro-interactions, page transitions and WebGL scenes that make products feel alive.",
    tags: ["Framer Motion", "Three.js", "CSS"],
  },
  {
    Icon: FiLayers,
    title: "Data & State",
    text: "Predictable state, fast data fetching and real backends wired up end to end.",
    tags: ["Redux", "React Query", "Supabase"],
  },
  {
    Icon: LuSparkles,
    title: "AI-Assisted Dev",
    text: "Shipping faster with Cursor, Copilot and LLMs — and building AI-powered features into the UI.",
    tags: ["Cursor", "Claude", "AI SDK"],
  },
];

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = highlighted.has(children);

  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span
        style={{ opacity }}
        className={accent ? "dark:text-mainGreen text-emerald-600" : ""}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = Math.round(v) + suffix),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function ScrollText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lens, setLens] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = paragraph.split(" ");

  return (
    <div
      className="relative md:cursor-none"
      onMouseEnter={(e) => {
        setMouse({ x: e.clientX, y: e.clientY });
        setLens(true);
      }}
      onMouseLeave={() => setLens(false)}
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
    >
      <AnimatePresence>
        {lens && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.3 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15, ease: "linear" }}
            style={{ left: mouse.x, top: mouse.y }}
            className="pointer-events-none fixed z-[2001] hidden h-[75px] w-[75px] translate-x-[-50%] translate-y-[-50%] rounded-full border border-white opacity-90 shadow-[0px_0px_25px_10px_#00000086,inset_0px_0px_10px_5px_#ffffffbc] backdrop-invert-100 md:block dark:border-black/20 dark:shadow-[0px_0px_20px_3px_#ffffffd3,inset_0px_0px_15px_5px_#0000005e]"
          />
        )}
      </AnimatePresence>
      <p
        ref={ref}
        className="flex flex-wrap text-2xl leading-snug font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {word}
          </Word>
        ))}
      </p>
    </div>
  );
}

export default function AboutSection() {
  const stats = [
    { value: projects.length, suffix: "+", label: "Self projects shipped" },
    { value: skills.length, suffix: "", label: "Technologies in my toolbox" },
    { value: 100, suffix: "%", label: "Attention to detail" },
  ];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 md:py-40"
    >
      <SectionHeading
        index="01"
        eyebrow="About me"
        title="Design-minded"
        accent="engineer."
      />

      <ScrollText />

      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="bg-white p-8 dark:bg-black"
          >
            <div className="text-gradient text-5xl font-bold sm:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm tracking-wide text-neutral-500">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col p-7">
                <div className="dark:text-mainGreen mb-6 grid size-12 place-items-center rounded-xl border border-black/10 text-emerald-600 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:border-white/10">
                  <service.Icon className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {service.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 px-3 py-1 font-mono text-[10px] tracking-wider text-neutral-600 uppercase dark:border-white/10 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
