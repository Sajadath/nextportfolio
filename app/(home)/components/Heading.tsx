"use client";
import { motion } from "motion/react";
import React from "react";

export default function Heading({
  children,
  cyan,
}: {
  children: React.ReactNode;
  cyan?: boolean;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "linear", delay: 0 }}
      className="max-w-full overflow-x-hidden"
    >
      <div
        className={`${cyan ? "styledHeadingCyan" : "styledHeading"} mx-auto w-fit select-none`}
      >
        {children}
      </div>
    </motion.h2>
  );
}
