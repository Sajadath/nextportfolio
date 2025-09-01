"use client";

import { motion } from "motion/react";

function HiName() {
  return (
    <div className="relative py-4">
      <motion.h2
        initial={{ opacity: 1, y: 30, rotateX: 90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
        style={{ transformStyle: "preserve-3d" }}
        className="text-4xl font-bold text-black lg:text-7xl dark:text-white"
      >
        Hi, <br />
      </motion.h2>
      <motion.h2
        initial={{ opacity: 1, y: 30, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 1.5 }}
        style={{ transformStyle: "preserve-3d" }}
        className="text-5xl font-bold text-black underline underline-offset-8 dark:text-white"
      >
        I&apos;m Sajad
        <br />
      </motion.h2>
    </div>
  );
}

export default HiName;
