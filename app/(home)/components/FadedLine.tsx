"use client";

import { motion } from "motion/react";

function FadedLine({ startFrom }: { startFrom: "left" | "right" }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay: 3.3 }}
      style={{
        originX: startFrom === "left" ? 1 : 0,
        originY: 0.5,
      }}
      className={`h-[1px] w-full ${startFrom === "left" ? "mt-3 bg-gradient-to-r" : "mb-3 bg-gradient-to-l"} from-transparent to-black dark:to-white`}
    />
  );
}

export default FadedLine;
