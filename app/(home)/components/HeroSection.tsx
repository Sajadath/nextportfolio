"use client";

import Magnetic from "@/components/ui/Magnetic";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { useDragRotation } from "@/lib/hooks/useDragRotation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FiArrowDownRight, FiDownload } from "react-icons/fi";
import ModalOpener from "./ModalOpener";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const roles = ["interactive", "animated", "pixel-perfect", "lightning-fast"];
const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedLetters({
  text,
  play,
  delay = 0,
  className,
}: {
  text: string;
  play: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block [perspective:600px] ${className ?? ""}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: "60%", rotateX: -90 }}
          animate={play ? { opacity: 1, y: "0%", rotateX: 0 } : undefined}
          transition={{ duration: 0.8, delay: delay + i * 0.035, ease }}
          style={{ transformOrigin: "50% 100%" }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2400,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-gradient inline-block font-bold"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const ready = useAppSelector((state) => state.homePage.mountedTime) > 0;
  const { rotation, handlers } = useDragRotation();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <section
      ref={section}
      className="relative flex min-h-dvh items-center overflow-hidden pt-24"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="dark:bg-mainGreen/20 pointer-events-none absolute top-1/3 right-[10%] h-[420px] w-[420px] rounded-full bg-emerald-300/30 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1.6, delay: 0.2 }}
        style={{ scale: sceneScale, opacity: sceneOpacity }}
        className="absolute inset-0"
      >
        <HeroScene drag={rotation} />
      </motion.div>

      <div
        {...handlers}
        data-cursor="Drag"
        aria-hidden
        className="absolute inset-x-[10%] top-[10%] h-[38%] touch-pan-y md:top-[12%] md:right-[2%] md:bottom-[12%] md:left-1/2 md:h-auto"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative z-10 mx-auto mt-[38vh] w-full max-w-7xl px-6 sm:px-10 md:mt-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-neutral-700 uppercase backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
        >
          <span className="relative flex size-2">
            <span className="bg-mainGreen absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-mainGreen relative inline-flex size-2 rounded-full" />
          </span>
          Front-End Developer
        </motion.div>

        <h1 className="text-5xl leading-[0.95] font-bold tracking-tight text-black sm:text-7xl lg:text-8xl xl:text-[7.5rem] dark:text-white">
          <AnimatedLetters text="Hi, I'm Sajad" play={ready} delay={0.3} />
          <br />
          <AnimatedLetters
            text="Atharyan."
            play={ready}
            delay={0.75}
            className="text-outline text-neutral-400 dark:text-neutral-500"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 1.3, ease }}
          className="mt-8 max-w-lg text-lg text-neutral-600 sm:text-2xl dark:text-neutral-300"
        >
          I build <RotatingWord />
          <br />
          web experiences people remember.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 1.6, ease }}
          className="pointer-events-auto mt-10 flex w-fit flex-wrap items-center gap-4"
        >
          <Magnetic>
            <ModalOpener className="bg-mainGreen border-none px-7 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(0,255,136,0.45)] hover:bg-[hsl(261deg_80%_48%)] hover:text-white">
              Contact Me
            </ModalOpener>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => lenis?.scrollTo("#work", { offset: 0 })}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold tracking-wider text-black uppercase transition-colors hover:border-black dark:border-white/20 dark:text-white dark:hover:border-white"
            >
              View Work
              <FiArrowDownRight className="transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href="/SajadAtharyan-en.pdf"
              download
              className="hover:text-mainGreen flex items-center gap-2 px-2 py-3 text-sm font-semibold tracking-wider text-neutral-600 uppercase transition-colors dark:text-neutral-300"
            >
              <FiDownload /> Resume
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={() => lenis?.scrollTo("#about")}
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 uppercase sm:flex"
      >
        Scroll
        <span
          className="scrolldown"
          style={
            {
              "--color": "#00ff88",
              "--sizeX": "22px",
              "--sizeY": "36px",
            } as React.CSSProperties
          }
        />
      </motion.button>
    </section>
  );
}
