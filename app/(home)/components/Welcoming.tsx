"use client";

import { useLenis } from "lenis/react";
import { animate, motion } from "motion/react";
import { useEffect, useRef } from "react";

const ease = [0.76, 0, 0.24, 1] as const;
const name = "Sajad Atharyan";

function Welcoming() {
  const counter = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.stop();
    return () => lenis.start();
  }, [lenis]);

  useEffect(() => {
    const node = counter.current;
    if (!node) return;
    const controls = animate(0, 100, {
      duration: 2.1,
      delay: 0.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) =>
        (node.textContent = String(Math.round(v)).padStart(3, "0")),
    });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      initial={{ translateY: "100%" }}
      animate={{ translateY: "0%" }}
      exit={{ translateY: "-100%" }}
      transition={{ duration: 0.9, ease }}
      className="fixed top-0 left-0 z-100 h-dvh w-screen overflow-hidden"
    >
      <motion.div
        initial={{ translateY: "100%" }}
        animate={{ translateY: "0%" }}
        exit={{ translateY: "-100%" }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 30,
          mass: 0.7,
        }}
        className="noise absolute inset-0 bg-[#00ff88]"
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-black sm:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between font-mono text-xs tracking-[0.3em] uppercase"
        >
          <span>Portfolio</span>
          <span>Front-End Developer</span>
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease }}
            className="h-16 w-1 origin-bottom bg-black sm:h-24"
          />
          <div>
            <h2
              aria-label={name}
              className="flex overflow-hidden text-4xl font-bold tracking-tight sm:text-7xl"
            >
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.8 + i * 0.035, duration: 0.7, ease }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-2 text-sm font-semibold sm:text-lg"
            >
              Welcome to My Portfolio
            </motion.p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 2.1, ease: [0.65, 0, 0.35, 1] }}
            className="mb-3 h-0.5 w-1/2 origin-left bg-black"
          />
          <span className="text-6xl leading-none font-bold tabular-nums sm:text-9xl">
            <span ref={counter}>000</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Welcoming;
