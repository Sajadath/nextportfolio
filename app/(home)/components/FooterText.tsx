"use client";

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { FiArrowUp } from "react-icons/fi";

function FooterText({
  handwritingClassName,
}: {
  handwritingClassName: string;
}) {
  const lenis = useLenis();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <p
        className={`text-3xl text-black dark:text-white ${handwritingClassName}`}
      >
        Made by SajadAth Powered By Next.Js
      </p>
      <p className="font-mono text-xs tracking-widest text-neutral-500">
        © {new Date().getFullYear()} SAJAD ATHARYAN
      </p>
      <button
        onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
        className="group hover:text-mainGreen flex cursor-pointer items-center gap-2 font-mono text-xs tracking-widest text-neutral-500 uppercase transition-colors"
      >
        Back to top
        <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
    </motion.div>
  );
}

export default FooterText;
