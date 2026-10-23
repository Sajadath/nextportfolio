"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

function TypedText({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-fit gap-1 text-4xl font-bold lg:text-7xl">
      <h2 className="writingAnimation relative text-black dark:text-white">
        {children}
      </h2>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="blinkAnimation pointer-events-none select-none"
      >
        |
      </motion.span>
    </div>
  );
}

export default TypedText;
