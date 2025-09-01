"use client";

import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { AnimatePresence, motion } from "motion/react";

function TransitionEffect() {
  const isInTransition = useAppSelector((state) => state.menu.isInTransition);
  console.log(isInTransition);

  return (
    <AnimatePresence mode="wait">
      {isInTransition && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-1000 flex flex-col overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.3 } }}
            exit={{ x: "-100%", transition: { duration: 0.3 } }}
            className="bg-mainGreen h-1/3 w-full"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.6 } }}
            exit={{ x: "-100%", transition: { duration: 0.6 } }}
            className="bg-mainGreen h-1/3 w-full"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.9 } }}
            exit={{ x: "-100%", transition: { duration: 0.9 } }}
            className="bg-mainGreen h-1/3 w-full"
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default TransitionEffect;
