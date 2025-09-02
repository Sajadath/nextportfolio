"use client";

import { motion } from "motion/react";

function AlreadyInThePageLine() {
  return (
    <>
      {/* bottom left */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.5,
        }}
        style={{
          transformOrigin: "right center",
        }}
        className="group-hover:bg-mainGreen absolute top-full right-[70%] left-0 block h-0.5 rounded-3xl bg-white transition-colors duration-300"
      />
      <motion.span
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        style={{
          transformOrigin: "bottom center",
        }}
        className="group-hover:bg-mainGreen absolute top-1/2 bottom-0 left-0 block w-0.5 rounded-3xl bg-white transition-colors duration-300"
      />
      {/* top right */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.5,
        }}
        style={{
          transformOrigin: "left center",
        }}
        className="group-hover:bg-mainGreen absolute right-0 bottom-full left-[70%] block h-0.5 rounded-3xl bg-white transition-colors duration-300"
      />
      <motion.span
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        style={{
          transformOrigin: "top center",
        }}
        className="group-hover:bg-mainGreen absolute top-0 right-0 bottom-1/2 block w-0.5 rounded-3xl bg-white transition-colors duration-300"
      />
    </>
  );
}

export default AlreadyInThePageLine;
