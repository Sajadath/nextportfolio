"use client";

import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { AnimatePresence, motion, Variants } from "motion/react";

const COLUMNS = 6;
const ease = [0.76, 0, 0.24, 1] as const;

const pages: Record<string, { label: string; index: string }> = {
  "/": { label: "Home", index: "01" },
  "/skills": { label: "Skills", index: "02" },
  "/projects": { label: "Projects", index: "03" },
};

const column = (layer: number): Variants => ({
  initial: { y: "100%" },
  enter: (i: number) => ({
    y: "0%",
    transition: { duration: 0.6, delay: layer * 0.12 + i * 0.05, ease },
  }),
  exit: (i: number) => ({
    y: "-100%",
    transition: { duration: 0.6, delay: (1 - layer) * 0.1 + i * 0.05, ease },
  }),
});

const greenColumn = column(0);
const surfaceColumn = column(1);

const letter: Variants = {
  initial: { y: "110%", rotate: 8 },
  enter: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: 0.45 + i * 0.04,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i: number) => ({
    y: "-110%",
    transition: { duration: 0.35, delay: i * 0.02, ease },
  }),
};

const fade: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.55 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

function TransitionEffect() {
  const isInTransition = useAppSelector((state) => state.menu.isInTransition);
  const target = useAppSelector((state) => state.menu.transitionTarget);
  const page = pages[target] ?? { label: "Loading", index: "00" };

  return (
    <AnimatePresence>
      {isInTransition && (
        <motion.div
          key="page-transition"
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed inset-0 z-1000 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <div key={i} className="relative h-full flex-1">
                <motion.div
                  custom={i}
                  variants={greenColumn}
                  className="bg-mainGreen absolute inset-0 -mx-px"
                />
                <motion.div
                  custom={i}
                  variants={surfaceColumn}
                  className="absolute inset-0 -mx-px bg-white dark:bg-neutral-950"
                />
              </div>
            ))}
          </div>

          <div className="noise absolute inset-0 opacity-[0.05]" />

          <div className="relative flex h-full flex-col justify-between p-6 text-black sm:p-10 dark:text-white">
            <motion.div
              variants={fade}
              className="flex justify-between font-mono text-xs tracking-[0.3em] uppercase"
            >
              <span>Sajad Atharyan</span>
              <span className="dark:text-mainGreen text-emerald-600">
                {page.index} / 03
              </span>
            </motion.div>

            <div className="flex flex-col items-center">
              <motion.span
                variants={fade}
                className="mb-4 font-mono text-xs tracking-[0.4em] text-neutral-500 uppercase"
              >
                Navigating to
              </motion.span>
              <h2
                aria-label={page.label}
                className="flex overflow-hidden text-6xl font-bold tracking-tighter sm:text-8xl lg:text-[10rem]"
              >
                {page.label.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letter}
                    aria-hidden
                    className="inline-block origin-bottom-left"
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  custom={page.label.length}
                  variants={letter}
                  className="text-mainGreen inline-block"
                >
                  .
                </motion.span>
              </h2>
              <motion.div
                variants={fade}
                className="mt-8 h-px w-48 overflow-hidden bg-black/10 sm:w-72 dark:bg-white/10"
              >
                <motion.div
                  variants={{
                    initial: { scaleX: 0 },
                    enter: {
                      scaleX: 1,
                      transition: {
                        duration: 1.1,
                        delay: 0.4,
                        ease: "easeInOut",
                      },
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                  className="from-mainGreen to-mainCyan h-full origin-left bg-gradient-to-r"
                />
              </motion.div>
            </div>

            <motion.div
              variants={fade}
              className="flex justify-between font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase"
            >
              <span>Portfolio</span>
              <span>Front-End Developer</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TransitionEffect;
