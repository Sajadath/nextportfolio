"use client";

import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { openMenu, setLinks } from "@/lib/slices/menuSlice";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

function ViewMoreButton() {
  const dispatch = useAppDispatch();
  const [beingHovered, setBeingHovered] = useState(false);
  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/skills", label: "Skills" },
      { href: "/projects", label: "Projects" },
    ],
    [],
  );
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: 6.6 }}
      onMouseEnter={() => setBeingHovered(true)}
      onMouseLeave={() => setBeingHovered(false)}
      onClick={() => {
        dispatch(setLinks(links));
        dispatch(openMenu());
      }}
      className="relative h-10 w-18 cursor-pointer overflow-hidden rounded-3xl border-2 border-gray-300/50 p-3 text-black dark:text-white"
    >
      <motion.button
        className={`absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer p-1 text-sm transition-all duration-300 ${
          beingHovered ? "-translate-y-[50px]" : ""
        }`}
      >
        More
      </motion.button>
      <motion.button
        className={`absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer p-1 text-sm transition-all duration-300 ${
          beingHovered ? "" : "translate-y-[50px]"
        }`}
      >
        More
      </motion.button>
    </motion.div>
  );
}

export default ViewMoreButton;
