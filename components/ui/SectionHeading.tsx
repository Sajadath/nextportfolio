"use client";

import { motion, Variants } from "motion/react";

const word: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  const words = title.split(" ");

  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase"
      >
        <span className="dark:text-mainGreen text-emerald-600">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="dark:bg-mainGreen h-px w-12 origin-left bg-emerald-600"
        />
        {eyebrow}
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-4xl leading-[1.05] font-bold tracking-tight text-black sm:text-6xl lg:text-7xl dark:text-white"
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="mr-[0.25em] inline-block overflow-hidden pb-1"
          >
            <motion.span custom={i} variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
        {accent && (
          <span className="inline-block overflow-hidden pb-1">
            <motion.span
              custom={words.length}
              variants={word}
              className="text-gradient inline-block"
            >
              {accent}
            </motion.span>
          </span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-sm text-neutral-600 sm:text-base dark:text-neutral-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
