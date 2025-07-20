"use client";

import { motion } from "motion/react";

function ScrollForMore() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-3">
      <motion.p
        initial={{ opacity: 0, rotateX: 180, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 8 }}
        className="text-xs"
      >
        Scroll Down For More Info
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 8.6 }}
        className="scrolldown"
        style={{ "--color": "skyblue" } as React.CSSProperties}
      >
        <div className="chevrons">
          <div className="chevrondown"></div>
          <div className="chevrondown"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default ScrollForMore;
