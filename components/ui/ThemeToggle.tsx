"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="invisible h-[40px] w-[84px]"></div>;

  return (
    <motion.div
      initial={{ y: -30 }}
      animate={{ y: 0 }}
      className="rotate relative flex items-center justify-center gap-1 overflow-hidden rounded-xl shadow-md shadow-[#0000001a] dark:shadow-[#1b1b1b]"
    >
      <button
        onClick={() => {
          if (theme === "light") setTheme("dark");
        }}
        className="relative h-full w-full cursor-pointer rounded-xl p-3"
      >
        <FaRegMoon
          className={`relative z-1 size-4 ${theme === "dark" ? "text-white dark:text-white" : "text-black dark:text-white"} `}
        />
        {theme === "dark" && (
          <motion.div
            layoutId="theme-toggle"
            className="absolute top-1/2 left-1/2 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400"
          />
        )}
      </button>
      <button
        onClick={() => {
          if (theme === "dark") setTheme("light");
        }}
        className="relative h-full w-full cursor-pointer rounded-xl p-3"
      >
        <FaSun
          className={`relative z-1 size-4 ${theme === "light" ? "text-white dark:text-white" : "text-black dark:text-white"} `}
        />
        {theme === "light" && (
          <motion.div
            layoutId="theme-toggle"
            className="absolute top-1/2 left-1/2 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400"
          />
        )}
      </button>
    </motion.div>
  );
}
