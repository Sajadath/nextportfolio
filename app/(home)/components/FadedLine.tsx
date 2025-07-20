"use client";

import { motion } from "motion/react";

function FadedLine() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, delay: 3.3 }}
      className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"
    />
  );
}

export default FadedLine;
