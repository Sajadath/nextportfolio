"use client";

import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { openMenu } from "@/lib/slices/menuSlice";
import { motion } from "motion/react";
import { useState } from "react";

function NavigationMenuButton() {
  const dispatch = useAppDispatch();

  const [beingHovered, setBeingHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setBeingHovered(true)}
      onMouseLeave={() => setBeingHovered(false)}
      onClick={() => dispatch(openMenu())}
      className="relative h-7 w-12 overflow-hidden"
    >
      <motion.button
        className={`absolute top-0 left-0 cursor-pointer p-1 text-sm transition-all duration-300 ${
          beingHovered ? "-translate-y-[50px]" : ""
        }`}
      >
        Menu
      </motion.button>
      <motion.button
        className={`absolute top-0 left-0 cursor-pointer p-1 text-sm transition-all duration-300 ${
          beingHovered ? "" : "translate-y-[50px]"
        }`}
      >
        Menu
      </motion.button>
    </motion.div>
  );
}

export default NavigationMenuButton;
